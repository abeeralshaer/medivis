import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactSideBar from 'react-sidebar';
import * as d3 from 'd3';
import SideBarContent from 'components/SideBar';
import Calendar from 'components/Calender';
import Chart from './Chart';

import classes from './styles/Student.styles.scss';

class Student extends Component {
  state = {
    sidebarOpen: false
  };

  static propTypes = {
    profile: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      pin: PropTypes.string.isRequired
    })
  };

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    const { profile, emailVerified } = this.props;
    return (
      <ReactSideBar
        sidebarClassName={classes.rootsidebar}
        dragToggleDistance={50}
        touch
        docked
        sidebar={<SideBarContent />}
        // open={this.state.sidebarOpen}
        // onSetOpen={this.onSetSidebarOpen}
      >
        <Grid style={{ width: '88%' }}>
          <Row>
            <Col md={12}>
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
                      {profile.firstName} s Cohorts
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ background: '#303338', marginTop: 10 }}>
            <Col md={8}>
              <div className={classes.subContainer}>
                <div className={classes.flexColumn}>
                  <Calendar style={{ width: '100%' }} />
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className={classes.subContainer}>
                <div className={classes.flexColumn}>
                  <div className={classes.profileMeta}>
                    <Chart />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </ReactSideBar>
    );
  }
}

export default Student;
