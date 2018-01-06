import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirebase } from "react-redux-firebase";
import { spinnerWhileLoading } from "utils/components";
import { UserIsAuthenticated } from "utils/router";
import AccountForm from "../AccountForm";
import defaultUserImageUrl from "static/User.png";
import classes from "./AccountPage.scss";
import { Grid, Row, Col, Table, ProgressBar } from "react-bootstrap";
import Collapsible from "react-collapsible";

export class AccountPage extends React.Component {
  state = {
    isOpened: false
  };
  render() {
    const { avatarUrl, updateAccount, profile } = this.props;
    return (
      <Grid className={classes.container}>
        <Row>
          <Col xs={12} sm={12} md={4}>
            <div className={classes.cardWrapper}>
              <div className={classes.header}>Class Info</div>
              <div className={classes.card}>
                <Row>
                  <Col xs={6} sm={5} md={5}>
                    <div
                      className={classes.avatar}
                      style={{
                        background: `url(${
                          avatarUrl
                            ? avatarUrl
                            : "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
                        })`
                      }}
                    />
                  </Col>
                  <Col xs={6} sm={7} md={7}>
                    <p className={classes.professorName}>Professor X</p>
                    <div className={classes.inline}>
                      <p>{profile.email}</p>
                      <p>{profile.username}</p>
                    </div>
                    <div className={classes.inline}>
                      <p>{profile.email}</p>
                      <p>{profile.username}</p>
                    </div>
                    <div className={classes.inline}>
                      <p>{profile.email}</p>
                      <p>{profile.username}</p>
                    </div>
                    <button className={classes.buttonDashboard}>
                      Invite Students
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8}>
            <div className={classes.cardWrapper}>
              <div className={classes.header}>My can't understand</div>
              <div className={classes.scrollable}>
                <div className={classes.card} style={{ padding: "10px 0" }}>
                  <Collapsible
                    classParentString={classes.Collapsible}
                    triggerOpenedClassName={classes.CollapsibleOpen}
                    transitionTime={50}
                    onOpen={() => this.setState({ isOpened: true })}
                    onClose={() => this.setState({ isOpened: false })}
                    trigger={
                      <p className={classes.inline}>
                        <span>
                          {this.state.isOpened ? (
                            <i className="fa fa-caret-down" />
                          ) : (
                            <i className="fa fa-caret-right " />
                          )}{" "}
                        </span>
                        <span className={classes.inlineBetween}>
                          <span className={classes.anounceTitle}>
                            Announcement #1 (Most recent){" "}
                          </span>
                          <span>12/25/2017</span>
                          <span>6:37PM</span>
                        </span>
                      </p>
                    }
                  >
                    <p>
                      This is the collapsible content. It can be any element or
                      React component you like.
                    </p>
                    <p>
                      It can even be another Collapsible component. Check out
                      the next section!
                    </p>
                  </Collapsible>
                  <Collapsible
                    classParentString={classes.Collapsible}
                    triggerOpenedClassName={classes.CollapsibleOpen}
                    transitionTime={50}
                    onOpen={() => this.setState({ isOpened: true })}
                    onClose={() => this.setState({ isOpened: false })}
                    trigger={
                      <p className={classes.inline}>
                        <span>
                          {this.state.isOpened ? (
                            <i className="fa fa-caret-down" />
                          ) : (
                            <i className="fa fa-caret-right " />
                          )}{" "}
                        </span>
                        <span className={classes.inlineBetween}>
                          <span className={classes.anounceTitle}>
                            Announcement #1 (Most recent){" "}
                          </span>
                          <span>12/25/2017</span>
                          <span>6:37PM</span>
                        </span>
                      </p>
                    }
                  >
                    <p>
                      This is the collapsible content. It can be any element or
                      React component you like.
                    </p>
                    <p>
                      It can even be another Collapsible component. Check out
                      the next section!
                    </p>
                  </Collapsible>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table
              responsive
              condensed
              bordered
              className={classes.tableOverlay}
            >
              <thead className={classes.thead}>
                <tr>
                  <th>Name</th>
                  <th>Quiz #1</th>
                  <th>Quiz #2</th>
                  <th>Quiz #3</th>
                  <th width="25%">Progress</th>
                  <th>Last seen</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td className={classes.inlineTD}>
                    <ProgressBar
                      bsClass={classes.progressbar}
                      className={classes.progress}
                      now={50}
                    />
                    <div className={classes.circularProgress}>60%</div>
                  </td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AccountPage.propTypes = {
  avatarUrl: PropTypes.string,
  profile: PropTypes.object,
  updateAccount: PropTypes.func
};

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase, // adds props.firebase
  connect(({ firebase: { profile } }) => ({
    profile,
    avatarUrl: profile.avatarUrl
  })),
  spinnerWhileLoading(["profile"]),
  withHandlers({
    updateAccount: ({ firebase }) => newAccount =>
      firebase.updateProfile(newAccount)
  })
)(AccountPage);

// <Grid className={classes.container}>
//   <Row>
//     <Col xs={12} sm={12} md={4}>
//       <div className={classes.cardWrapper}>
//         <div className={classes.header}>My Profile</div>
//         <div className={classes.card}>
//           <Row>
//             <Col xs={6} sm={5} md={5}>
//               <div
//                 className={classes.avatar}
//                 style={{
//                   background: `url(${
//                     avatarUrl
//                       ? avatarUrl
//                       : "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
//                   })`
//                 }}
//               />
//             </Col>
//             <Col xs={6} sm={7} md={7}>
//               <div>
//                 <p>{profile.email}</p>
//                 <p>{profile.username}</p>
//               </div>
//             </Col>
//           </Row>
//         </div>
//       </div>
//       <div className={classes.cardWrapper}>
//         <div className={classes.header}>My can't understand</div>
//         <div className={classes.scrollable}>
//           <div className={classes.card}>
//             <Collapsible
//               classParentString={classes.Collapsible}
//               triggerOpenedClassName={classes.CollapsibleOpen}
//               transitionTime={50}
//               onOpen={() => this.setState({ isOpened: true })}
//               onClose={() => this.setState({ isOpened: false })}
//               trigger={
//                 <span>
//                   {this.state.isOpened ? (
//                     <i className="fa fa-chevron-down" />
//                   ) : (
//                     <i className="fa fa-chevron-right" />
//                   )}{" "}
//                   Open me text
//                 </span>
//               }
//             >
//               <p>
//                 This is the collapsible content. It can be any element or React
//                 component you like.
//               </p>
//               <p>
//                 It can even be another Collapsible component. Check out the next
//                 section!
//               </p>
//             </Collapsible>
//             <Collapsible
//               classParentString={classes.Collapsible}
//               transitionTime={50}
//               onOpen={() => this.setState({ isOpened: true })}
//               onClose={() => this.setState({ isOpened: false })}
//               trigger={
//                 <span>
//                   {this.state.isOpened ? (
//                     <i className="fa fa-chevron-down" />
//                   ) : (
//                     <i className="fa fa-chevron-right" />
//                   )}{" "}
//                   Open me text
//                 </span>
//               }
//             >
//               <p>
//                 This is the collapsible content. It can be any element or React
//                 component you like.
//               </p>
//               <p>
//                 It can even be another Collapsible component. Check out the next
//                 section!
//               </p>
//             </Collapsible>
//             <Collapsible
//               classParentString={classes.Collapsible}
//               transitionTime={50}
//               onOpen={() => this.setState({ isOpened: true })}
//               onClose={() => this.setState({ isOpened: false })}
//               trigger={
//                 <span>
//                   {this.state.isOpened ? (
//                     <i className="fa fa-chevron-down" />
//                   ) : (
//                     <i className="fa fa-chevron-right" />
//                   )}{" "}
//                   Open me text
//                 </span>
//               }
//             >
//               <p>
//                 This is the collapsible content. It can be any element or React
//                 component you like.
//               </p>
//               <p>
//                 It can even be another Collapsible component. Check out the next
//                 section!
//               </p>
//             </Collapsible>
//             <Collapsible
//               classParentString={classes.Collapsible}
//               transitionTime={50}
//               onOpen={() => this.setState({ isOpened: true })}
//               onClose={() => this.setState({ isOpened: false })}
//               trigger={
//                 <span>
//                   {this.state.isOpened ? (
//                     <i className="fa fa-chevron-down" />
//                   ) : (
//                     <i className="fa fa-chevron-right" />
//                   )}{" "}
//                   Open me text
//                 </span>
//               }
//             >
//               <p>
//                 This is the collapsible content. It can be any element or React
//                 component you like.
//               </p>
//               <p>
//                 It can even be another Collapsible component. Check out the next
//                 section!
//               </p>
//             </Collapsible>
//           </div>
//         </div>
//       </div>
//     </Col>
//     <Col xs={12} sm={12} md={8}>
//       <div className={classes.card}>
//         <Collapsible transitionTime={200} trigger="Start here">
//           <p>
//             This is the collapsible content. It can be any element or React
//             component you like.
//           </p>
//           <p>
//             It can even be another Collapsible component. Check out the next
//             section!
//           </p>
//         </Collapsible>
//       </div>
//     </Col>
//   </Row>
// </Grid>;
