import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  Table,
  ProgressBar,
  Modal,
  Button
} from 'react-bootstrap';
import { firebaseConnect, populate } from 'react-redux-firebase';
import { get, map } from 'lodash';
import { spinnerWhileLoading } from 'utils/components';
import { UserEmailVerified } from 'utils/router';
import UniversityCohorts from './components/UniversityCohorts';
import StudentCohorts from './components/StudentCohorts';
import classes from './styles/StudentList.styles.scss';

@UserEmailVerified
class StudentList extends Component {
  static propTypes = {
    allCohorts: PropTypes.shape({}),
    studentCohorts: PropTypes.shape({
      cohortId: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    firebase: PropTypes.shape({
      auth: PropTypes.func,
      push: PropTypes.func,
      remove: PropTypes.func
    })
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.allCohorts) {
      this.studentCohortStatus(nextProps.allCohorts, nextProps.studentCohorts);
    }
  }

  onJoinCohort = cohortId => {
    const { firebase } = this.props;
    const request = {
      studentId: firebase.auth().currentUser.uid,
      cohortId
    };
    firebase.push('student-cohorts', request);
  };

  onLeaveCohort = id => {
    const { firebase } = this.props;
    firebase.remove(`student-cohorts/${id}`);
  };

  studentCohortStatus = (allCohorts, studentCohorts) => {
    const cohorts = map(allCohorts, (cohort, key) => {
      cohort.id = key;
      return cohort;
    });

    const sCohorts = map(studentCohorts, (cohort, key) => cohort);

    cohorts.map(cohort => {
      cohort.isJoined = !!sCohorts.find(
        student => student.cohortId.id === cohort.id
      );
      return cohort;
    });
  };

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={5}>
            <UniversityCohorts
              onJoinCohort={this.onJoinCohort}
              allCohorts={this.props.allCohorts}
            />
          </Col>
          <Col xs={12} md={5} mdOffset={2}>
            <StudentCohorts
              profile={this.props.profile}
              onLeaveCohort={this.onLeaveCohort}
              studentCohorts={this.props.studentCohorts}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const populates = [
  { child: 'institutionId', root: 'institutions', keyProp: 'id' },
  { child: 'instructorId', root: 'users', keyProp: 'id' },
  { child: 'cohortId', root: 'institution-cohorts', keyProp: 'id' },
  { child: 'studentId', root: 'users', keyProp: 'id' }
];

export default compose(
  firebaseConnect(props => [
    {
      path: '/institution-cohorts',
      populates
    },
    {
      path: '/student-cohorts',
      queryParams: ['orderByChild=studentId', `equalTo=${props.authData.uid}`],
      populates
    }
  ]),
  connect(({ firebase }) => ({
    allCohorts: populate(firebase, 'institution-cohorts', populates),
    studentCohorts: populate(firebase, 'student-cohorts', populates),
    profile: firebase.profile
  })),
  spinnerWhileLoading(['allCohorts', 'studentCohorts'])
)(StudentList);
