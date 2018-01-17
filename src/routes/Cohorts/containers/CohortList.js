import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { UserIsAuthenticated } from 'utils/router';
import { userTypes } from 'constants';

import CohortList from '../../../containers/CohortListContainer';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase, // adds props.firebase
  connect(state => ({
    isStudent: state.firebase.profile.type === userTypes.STUDENT
  }))
)(CohortList);
