import React from 'react';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';
import classes from './styles/StudentCohorts.styles.scss';

const StudentCohorts = ({ studentCohorts, onLeaveCohort, profile }) => (
  <div>
    <div className={classes.header}>{profile.firstName}'s Cohorts</div>
    <div className={classes.card}>
      {studentCohorts && (
        <div>
          {map(studentCohorts, (item, key) => (
            <div key={key} className={classes.container}>
              <div className={classes.button}>{item.cohortId.name}</div>
              <button
                onClick={() => onLeaveCohort(key)}
                className={classes.leave}
              >
                Leave
              </button>
            </div>
          ))}
        </div>
      )}
      {!studentCohorts && (
        <h2 className="text-center">Choose some cohort's from left side!</h2>
      )}
    </div>
  </div>
);

StudentCohorts.propTypes = {
  studentCohorts: PropTypes.shape({
    cohortId: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  }),
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired
  }).isRequired,
  onLeaveCohort: PropTypes.func.isRequired
};

export default StudentCohorts;
