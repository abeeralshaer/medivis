import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import GoogleButton from "react-google-button";
import { withFirebase, firebaseConnect } from "react-redux-firebase";
import { withHandlers, pure, compose } from "recompose";
import { withNotifications } from "modules/notification";
import { UserIsNotAuthenticated } from "utils/router";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { userTypes } from "constants";
import LoginForm from "../SignupForm";

import classes from "./SignupPage.scss";

export const SignupPage = ({ emailSignup, onSubmitFail, institutions }) => (
  <div className={classes.alignCenter}>
    <Grid className={classes.container}>
      <Row>
        <div className="text-center">
          <h1 className={classes.title}>AnatomyX</h1>
          <h2 className={classes.secondary}>Log Into Instructor Account</h2>
        </div>
      </Row>
      <Row>
        <Col xs={10} sm={6} md={4} mdOffset={4}>
          <LoginForm
            institutions={institutions}
            onSubmit={emailSignup}
            onSubmitFail={onSubmitFail}
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

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
      path: "/institutions"
    }
  ]),
  connect(state => ({
    institutions: state.firebase.data["institutions"]
  })),
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? "Form Invalid" : err.message || "Error"),
    emailSignup: ({ firebase, showError }) => creds =>
      firebase
        .createUser(creds, {
          name: creds.name,
          email: creds.email,
          isApproved: true,
          type: userTypes.INSTRUCTOR
        })
        .then(async () => {
          const user = await firebase.auth().currentUser;
          firebase.push("institution-instructors", {
            instructorId: user.uid,
            institutionId: creds.institution
          });
        })
        .catch(err => showError(err.message))
  }),
  pure
)(SignupPage);
