import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfessorList from './ProfessorList';
import StudentList from './StudentList';

const CohortList = props => {
  return props.isStudent ? (
    <StudentList {...props} />
  ) : (
    <ProfessorList {...props} />
  );
};

export default CohortList;
