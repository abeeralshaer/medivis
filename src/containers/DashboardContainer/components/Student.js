import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactSideBar from 'react-sidebar';
import SideBarContent from 'components/SideBar';
import Calendar from 'components/Calender';
import QuizesTable from './QuizesTable';

import classes from './styles/Student.styles.scss';

export const Student = ({ profile, emailVerified }) => (
  <ReactSideBar
    sidebarClassName={classes.rootsidebar}
    dragToggleDistance={50}
    touch
    docked
    sidebar={<SideBarContent />}
  >
    <Grid style={{ width: '88%' }}>
      <QuizesTable />
      <Row className={classes.calendarContainer}>
        <Col md={6}>
          <div className={classes.calendarHeader}>Calendar</div>
          <div className={classes.addButtonContainer}>
            <div style={{ background: 'orange', alignItems: 'center', marginTop: 25, marginRight: 20, position: 'absolute', justifyContent: 'center', display: 'flex', height: 40, width: 40, borderRadius: 50, boxShadow: 3 }}>
              <div className={classes.addButton} />
            </div>
          </div>
          <Calendar />
          <div className={classes.calendarFooter}>
            <div className={classes.orangeCircle} />
            <div className={classes.circleInfo}>Some Info written here</div>
            <div className={classes.blueCircle} />
            <div className={classes.circleInfo}>Some Info written here</div>
          </div>
        </Col>
        <Col md={6}>
          <div className={classes.subContainer} />
        </Col>
      </Row>
    </Grid>
  </ReactSideBar>
)

Student.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    pin: PropTypes.string.isRequired,
  }),
};

export default Student;
