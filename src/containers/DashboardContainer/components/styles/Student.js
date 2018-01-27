import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import ReactSideBar from 'react-sidebar'
import SideBarContent from 'components/SideBar'
import Calendar from 'components/Calender'
import data from './data'

import classes from './styles/Student.styles.scss'



    export const Student = ({ profile, emailVerified }) => (
      <ReactSideBar
        sidebarClassName={classes.rootsidebar}
        dragToggleDistance={50}
        touch
        docked
        sidebar={<SideBarContent />}
      >
        <Grid style={{ width: '88%' }}>
          <Row className={classes.tableContainer}>
            <Col md={12}>
              <div style={{ padding: 10, display: 'flex', flexDirection: 'row' }}>
                <div className={classes.sidebar} />
                <div>Overview</div>
              </div>
              <Table>
                <thead md={6}>
                  <tr>
                    <th>Tasks</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Question</th>
                  </tr>
                </thead>
                <tbody style={{ background: '#30333C', padding: 5 }}>
                  {data.map(elem => (
                    <tr>
                      <td>
                        {elem.name}
                      </td>
                      <td>
                        {elem.progress}
                      </td>
                      <td>
                        {elem.score}
                      </td>
                      <td style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                          {elem.questions}
                        </div>
                        <div className={classes.arrowDown} />
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </Table>
          {  // <div className={classes.profileContainer}>
            //   <div className={classes.profileAvatar} />
            //   <div className={classes.flexColumn}>
            //     <div className={classes.profileMeta}>
            //       <h3>
            //         {profile.firstName} {profile.lastName}
            //       </h3>
            //       <h4>
            //         Pin: <b style={{ marginLeft: 15 }}>{profile.pin}</b>
            //       </h4>
            //     </div>
            //     {!emailVerified && (
            //       <p className={classes.verify}>
            //         Please verify email at <b>{profile.email}</b>
            //       </p>
            //     )}
            //     {emailVerified && (
            //       <Link to="/cohorts" className={classes.button}>
            //         {profile.firstName} s Cohorts
            //       </Link>
            //     )}
            //   </div>
            // </div>
          }
            </Col>
          </Row>
          <Row style={{ background: '#303338', margin: 10, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Col md={6}>
            <div className={classes.calendarHeader}>Calendar</div>
            <div className={classes.addButtonContainer}>
            <div style={{ background: 'orange', alignItems: 'center', marginTop: 25, marginRight: 20, position: 'absolute', justifyContent: 'center', display: 'flex', height: 40, width: 40, borderRadius: 50, boxShadow: 3 }}>
              <div className={classes.addButton}/>
            </div>
            </div>
              <Calendar/>
            <div className={classes.calendarFooter}>
              <div className={classes.orangeCircle}/>
              <div className={classes.circleInfo}>Some Info written here</div>
              <div className={classes.blueCircle}/>
              <div className={classes.circleInfo}>Some Info written here</div>
            </div>
            </Col>
            <Col md={6}>
              <div className={classes.subContainer}>
              </div>
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
         pin: PropTypes.string.isRequired
       })
     }
export default Student
