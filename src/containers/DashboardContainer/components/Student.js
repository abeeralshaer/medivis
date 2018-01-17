import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

import classes from './styles/Student.styles.scss';

const Student = ({ profile, emailVerified }) => (
  <Grid>
    <Row>
      <Col xs={10} sm={8} smOffset={2} md={6} mdOffset={3}>
        <div className={classes.profileContainer}>
          <div className={classes.profileAvatar} />
          <div className={classes.flexColumn}>
            <div className={classes.profileMeta}>
              <h3>
                {profile.firstName} {profile.lastName}
              </h3>
              <h4>
                Pin: <b style={{ marginLeft: 15 }}>{profile.pin}</b>
              </h4>
            </div>
            {!emailVerified && (
              <p className={classes.verify}>
                Please verify email at <b>{profile.email}</b>
              </p>
            )}
            {emailVerified && (
              <Link to="/cohorts" className={classes.button}>
                {profile.firstName}'s Cohorts
              </Link>
            )}
          </div>
        </div>
      </Col>
    </Row>
  </Grid>
);

Student.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    pin: PropTypes.string.isRequired
  })
};

export default Student;
