import React from 'react';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';
import classes from './styles/UniversityCohorts.styles.scss';

const UniversityCohorts = ({ allCohorts, onJoinCohort }) => (
  <div>
    <div className={classes.header}>All Cohorts at University</div>
    <div className={classes.card}>
      {map(allCohorts, (cohort, key) => (
        <div key={key} className={classes.container}>
          <div className={classes.button}>
            {cohort.name} - {cohort.instructorId.name}
          </div>
          {cohort.isJoined ? (
            <div className={classes.joined}>Joined</div>
          ) : (
            <button onClick={() => onJoinCohort(key)} className={classes.add}>
              Add
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

UniversityCohorts.propTypes = {
  onJoinCohort: PropTypes.func.isRequired,
  allCohorts: PropTypes.shape({})
};

export default UniversityCohorts;
