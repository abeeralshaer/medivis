import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, isEmpty } from "react-redux-firebase";
import Collapsible from "react-collapsible";
import _ from "lodash";
import { Grid, Row, Col, Table, ProgressBar } from "react-bootstrap";
import { spinnerWhileLoading } from "utils/components";
import { values } from "utils/objectToArray";
import { setGrades } from "utils/grades";
import classes from "./CohortContainer.scss";

class Cohort extends Component {
  state = {
    isOpened: false
  };

  transformToCorrectData = (cohort = {}) => {
    cohort.students = Array.from(values(cohort.students));
    cohort.students.map(student => {
      student.quizzes = Array.from(values(student.quizzes));
      student.quizzes.map(
        quiz =>
          quiz ? (quiz.questions = Array.from(values(quiz.questions))) : quiz
      );
      return student;
    });
    return cohort;
  };

  renderTableRow = student => {
    let quizzes = student.quizzes;
    const questionsAmount = student.quizzes
      .map(quiz => quiz.questions.length)
      .reduce((a, b) => a + b, 0);

    const correctQuestionsAmount = student.quizzes
      .map(quiz => quiz.questions.filter(question => question.isCorrect).length)
      .reduce((a, b) => a + b, 0);

    quizzes = student.quizzes.concat(Array(3).fill(null)); // if no quizzes show N/A

    const quizCell = quizzes.slice(0, 3).map(
      quiz =>
        !!quiz ? (
          <td>
            {quiz.questions.filter(question => question.isCorrect).length} /{" "}
            {quiz.questions.length}
          </td>
        ) : (
          <td>N/A</td>
        )
    );
    const percentage =
      questionsAmount > 0 ? correctQuestionsAmount / questionsAmount * 100 : 0;
    const row = (
      <tr>
        <td>{student.name}</td>
        {quizCell}
        <td className={classes.inlineTD}>
          <ProgressBar
            bsClass={classes.progressbar}
            className={classes.progress}
            now={percentage}
          />
          <div className={classes.circularProgress}>{percentage}%</div>
        </td>
        <td>2018-01-08</td>
        <td>{setGrades(percentage)}</td>
      </tr>
    );
    return row;
  };
  render() {
    const { cohort, avatarUrl, updateAccount, profile } = this.props;
    if (isEmpty(cohort)) {
      return <div>Cohort not found</div>;
    }

    const students = this.transformToCorrectData(cohort).students;
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
                    <p className={classes.professorName}>
                      Professor {profile.username[0].toUpperCase()}
                      {profile.username.slice(1)}
                    </p>
                    <div className={classes.inline}>
                      <p>Curriculum</p>
                      <p>{cohort.name}</p>
                    </div>
                    <div className={classes.inline}>
                      <p>{profile.email}</p>
                      <p>{profile.username}</p>
                    </div>
                    <div className={classes.inline}>
                      <p>Students</p>
                      <p>{students.length}</p>
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
              <div className={classes.header}>My Announcements</div>
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
                {students.length ? (
                  students.map(st => this.renderTableRow(st))
                ) : (
                  <tr>
                    <td colSpan={7}>No students participated</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Cohort.propTypes = {
  cohort: PropTypes.object,
  params: PropTypes.object.isRequired
};

const enhance = compose(
  firebaseConnect(({ params: { cohortname } }) => [
    { path: `cohorts/${cohortname}` }
  ]),
  connect(({ firebase: { data, profile } }, { params: { cohortname } }) => ({
    profile,
    avatarUrl: profile.avatarUrl,
    cohort: data.cohorts && data.cohorts[cohortname]
  })),
  spinnerWhileLoading(["cohort"])
);

export default enhance(Cohort);
