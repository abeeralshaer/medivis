import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { spinnerWhileLoading } from 'utils/components';
import { UserIsAuthenticated } from 'utils/router';
import { userTypes } from 'constants';
import Student from './components/Student';
import { Professor } from './components/Professor';

const DashboardContainer = ({ isStudent, profile, firebase }) => (
  <div style={{ height: '100%' }}>
    {isStudent ? (
      <Student
        emailVerified={firebase.auth().currentUser.emailVerified}
        profile={profile}
      />
    ) : (
      <Professor profile={profile} />
    )}
  </div>
);

export default compose(
  UserIsAuthenticated,
  withFirebase,
  connect(({ firebase: { profile } }) => ({
    isStudent: profile.type === userTypes.STUDENT,
    profile
  })),
  spinnerWhileLoading(['profile'])
)(DashboardContainer);
