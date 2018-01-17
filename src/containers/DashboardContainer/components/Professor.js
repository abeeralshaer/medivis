import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import { Grid, Row, Col } from 'react-bootstrap';
import { spinnerWhileLoading } from 'utils/components';
import { UserIsAuthenticated } from 'utils/router';
import classes from './styles/Professor.styles.scss';

export class Professor extends React.Component {
  state = {
    isLearning: false,
    isInstructor: false
  };
  render() {
    const { profile: { isApproved } } = this.props;
    const { isInstructor, isLearning } = this.state;
    return (
      <Grid fluid className={classes.container}>
        {isApproved && (
          <Row className={classes.fullHeight}>
            <Col xs={12} sm={6} md={6} className={classes.instuctorDashboard}>
              {!isInstructor && (
                <div
                  className={classes.alignCenter}
                  onClick={() => this.setState({ isInstructor: true })}
                >
                  <h2 className={classes.instuctorDashboardTitle}>
                    Instructor Dashboard
                  </h2>
                  <i className="fa fa-plus" />
                </div>
              )}
              {isInstructor && (
                <div className={classes.alignCenter}>
                  <h2 className={classes.instuctorDashboardTitle}>
                    Instructor Dashboard
                  </h2>
                  <p className={classes.enterAction}>
                    <i
                      className="fa fa-times"
                      onClick={() => this.setState({ isInstructor: false })}
                    />
                    <Link to="/cohorts">Enter</Link>
                  </p>
                </div>
              )}
            </Col>
            <Col xs={12} sm={6} md={6} className={classes.learningData}>
              <Link className={classes.alignCenter}>
                {!isLearning && (
                  <div
                    className={classes.alignCenter}
                    onClick={() => this.setState({ isLearning: true })}
                  >
                    <h2 className={classes.instuctorDashboardTitle}>
                      Learning Data
                    </h2>
                    <i className="fa fa-plus" />
                  </div>
                )}
                {isLearning && (
                  <div className={classes.alignCenter}>
                    <h2 className={classes.instuctorDashboardTitle}>
                      Learning Data
                    </h2>
                    <p className={classes.enterAction}>
                      <i
                        className="fa fa-times"
                        onClick={() => this.setState({ isLearning: false })}
                      />
                      <Link to="/cohorts">Enter</Link>
                    </p>
                  </div>
                )}
              </Link>
            </Col>
          </Row>
        )}
        {!isApproved && (
          <Row className={classes.fullHeight}>
            <Col>
              <h2 className="text-center">
                Thank you for signing up. Your application is under review
              </h2>
            </Col>
          </Row>
        )}
      </Grid>
    );
  }
}

Professor.propTypes = {
  profile: PropTypes.object
};

export default Professor;
