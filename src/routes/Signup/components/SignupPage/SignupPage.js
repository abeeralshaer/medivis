import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import GoogleButton from 'react-google-button';
import { withFirebase, firebaseConnect } from 'react-redux-firebase';
import { withHandlers, pure, compose } from 'recompose';
import { withNotifications } from 'modules/notification';
import { UserIsNotAuthenticated } from 'utils/router';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userTypes } from 'constants';
import SignupCommonData from '../SignupForm/SignupCommonData';
import SignupForm from '../SignupForm';

import classes from './SignupPage.scss';

class SignupPage extends Component {
  state = {
    page: 1
  };
  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handleSubmit = async ({
    pin,
    fname,
    lname,
    password,
    eaddress,
    status,
    institution
  }) => {
    const { firebase } = this.props;
    const request = {
      firstName: fname,
      lastName: lname,
      email: eaddress,
      type: status
    };

    if (status) {
      request.pin = pin;
    } else {
      request.isApproved = true;
    }

    await firebase.createUser(
      {
        email: request.email,
        password
      },
      request
    );

    firebase.auth().onAuthStateChanged(user => {
      user.sendEmailVerification();
    });

    const user = await firebase.auth().currentUser;
    if (!status) {
      firebase.push('institution-instructors', {
        instructorId: user.uid,
        institutionId: institution
      });
    } else {
      firebase.push('institution-students', {
        studentId: user.uid,
        institutionId: institution
      });
    }
  };

  render() {
    const { emailSignup, onSubmitFail, institutions } = this.props;
    const { page } = this.state;
    return (
      <div className={classes.alignCenter}>
        <Grid className={classes.container}>
          <Row>
            <Col xs={10} sm={6} md={4} mdOffset={4}>
              {page === 1 && (
                <SignupCommonData
                  onSubmitFail={onSubmitFail}
                  onSubmit={this.nextPage}
                />
              )}
              {page === 2 && (
                <SignupForm
                  institutions={institutions}
                  onSubmit={this.handleSubmit}
                  onSubmitFail={onSubmitFail}
                />
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

SignupPage.propTypes = {
  firebase: PropTypes.shape({
    // eslint-disable-line
    login: PropTypes.func.isRequired
  }),
  emailLogin: PropTypes.func,
  onSubmitFail: PropTypes.func,
  googleLogin: PropTypes.func
};

export default compose(
  UserIsNotAuthenticated, // redirect to projects page if already authenticated
  withNotifications, // add props.showError
  withFirebase, // add props.firebase
  firebaseConnect(props => [
    {
      path: '/institutions'
    }
  ]),
  connect(state => ({
    institutions: state.firebase.data['institutions']
  })),
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error')
  }),
  pure
)(SignupPage);
