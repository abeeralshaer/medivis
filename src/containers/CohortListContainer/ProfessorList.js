import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import {
  Grid,
  Row,
  Col,
  Table,
  ProgressBar,
  Modal,
  Button
} from 'react-bootstrap';
import { map, get } from 'lodash';
import { spinnerWhileLoading } from 'utils/components';
import { UserIsApproved } from 'utils/router';
import { values } from 'utils/objectToArray';
import { COHORT_LIST } from 'constants';
import AddCohortForm from './components/AddCohortForm';
import classes from './styles/ProfessorList.styles.scss';

@UserIsApproved
export class ProfessorList extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    isNew: false
  };

  handleSubmit(form) {
    const { description, name } = form;
    const { firebase, institution } = this.props;
    let institutionId = null;

    for (let key in institution) {
      if (key) {
        for (let nextKey in institution[key]) {
          institutionId = institution[key]['institutionId'];
        }
      }
    }
    const body = {
      institutionId,
      instructorId: firebase.auth().currentUser.uid,
      description,
      name
    };
    firebase
      .push('institution-cohorts', body)
      .then(() => this.setState({ isNew: false }));
  }

  render() {
    if (this.props.children) {
      return cloneElement(this.props.children, this.props);
    }

    const { cohorts, pristine, submitting } = this.props;
    const { isNew } = this.state;
    return (
      <Grid className={classes.container}>
        <Row>
          <Col
            xs={12}
            sm={4}
            md={4}
            smOffset={4}
            mdOffset={4}
            className={classes.cardWrapper}
          >
            {!isNew && (
              <div>
                {cohorts && (
                  <div>
                    <h1 className="text-center">
                      <i className="fa fa-close" />
                      Select Cohort
                    </h1>
                    <div>
                      {map(cohorts, (cohort, key) => (
                        <Link
                          key={key}
                          to={`${COHORT_LIST}/${key}`}
                          className={classes.button}
                        >
                          {cohort.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div
                  className={classes.addCohort}
                  onClick={() => this.setState({ isNew: true })}
                >
                  <i className="fa fa-plus" />
                  Add Cohort
                </div>
              </div>
            )}
            {isNew && (
              <AddCohortForm
                onSubmit={data => this.handleSubmit(data)}
                onCloseForm={() => this.setState({ isNew: false })}
              />
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

ProfessorList.propTypes = {
  cohorts: PropTypes.object
};

export default compose(
  firebaseConnect(props => [
    {
      path: '/institution-cohorts',
      queryParams: [
        'orderByChild=instructorId',
        `equalTo=${props.authData.uid}`
      ]
    },
    {
      path: '/institution-instructors',
      queryParams: [
        'orderByChild=instructorId',
        `equalTo=${props.authData.uid}`
      ]
    }
  ]),
  connect(state => ({
    cohorts: state.firebase.data['institution-cohorts'],
    institution: state.firebase.data['institution-instructors']
  })),
  spinnerWhileLoading(['cohorts'])
)(ProfessorList);
