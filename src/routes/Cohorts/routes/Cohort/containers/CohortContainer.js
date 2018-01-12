import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  firebaseConnect,
  isEmpty,
  populate,
  withFirebase
} from "react-redux-firebase";
import Collapsible from "react-collapsible";
import { map, get } from "lodash";
import { Bar } from "react-chartjs-2";
import { Grid, Row, Col, Table, ProgressBar } from "react-bootstrap";
import { spinnerWhileLoading } from "utils/components";
import { values } from "utils/objectToArray";
import { setGrades } from "utils/grades";
import classes from "./CohortContainer.scss";

const quizPopulate = [
  {
    child: "quizId",
    root: "instructor-quizzes",
    keyProp: "id"
  }
];

const studentAnswerPopulate = [
  {
    child: "questionId",
    root: "quiz-questions"
  },
  {
    child: "answerId",
    root: "quiz-answers",
    childParam: "expectedAnswer"
  }
];

class Cohort extends Component {
  state = {
    isOpened: false,
    isSelected: true,
    selectedStudent: null,
    isQuestionsOpened: null,
    labels: [],
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "white",
              fontSize: 12
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "white",
              fontSize: 12
            }
          }
        ]
      },
      legend: {
        display: true,
        labels: {
          fillStyle: "#fff",
          fontColor: "rgb(255, 99, 132)"
        }
      },
      maintainAspectRatio: false
    }
  };

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.unWatchEvent("value", "student-answers");
    firebase.unWatchEvent("value", "student-quizzes");
  }

  onStudentSelect = selectedStudent => {
    const { firebase } = this.props;
    if (selectedStudent) {
      this.setState({
        selectedStudent,
        isQuestionsOpened: false
      });
      firebase.watchEvent("value", "student-quizzes", "student-quizzes", {
        isQuery: true,
        queryId: `student-quizzes#orderByChild=studentId&equalTo=${selectedStudent}`,
        queryParams: ["orderByChild=studentId", `equalTo=${selectedStudent}`],
        populates: quizPopulate
      });
    } else {
      this.setState({
        selectedStudent,
        isQuestionsOpened: false
      });
      firebase.unWatchEvent("value", "student-answers");
      firebase.unWatchEvent("value", "student-quizzes");
    }
  };

  onQuestionsLoad = (quizId, studentId) => {
    const { isQuestionsOpened } = this.state;
    const { firebase } = this.props;
    if (isQuestionsOpened === quizId) {
      firebase.unWatchEvent("value", "student-answers");
      this.setState({
        isQuestionsOpened: null
      });
    } else {
      this.setState({
        isQuestionsOpened: quizId
      });
      this.props.firebase.watchEvent(
        "value",
        "student-answers",
        "student-answers",
        {
          isQuery: true,
          queryId: `student-answers#orderByChild=quizId-studentId&equalTo=${quizId}-${studentId}`,
          queryParams: [
            "orderByChild=quizId-studentId",
            `equalTo=${quizId}-${studentId}`
          ],
          populates: studentAnswerPopulate
        }
      );
    }
  };

  renderQuestionsRow = (item, index) => (
    <tr key={index}>
      <td>{item.questionId.text}</td>
      <td>{item.answerId}</td>
      <td>{item.submittedAnswer}</td>
      <td>
        {item.answerId === item.submittedAnswer ? (
          <i style={{ color: "#27ae60" }} className="fa fa-check" />
        ) : (
          <i style={{ color: "#c0392b" }} className="fa fa-close" />
        )}
      </td>
    </tr>
  );

  renderTableRow = quiz => {
    const { isQuestionsOpened } = this.state;

    const row = (
      <tr key={quiz.quizId.id}>
        <td>{quiz.quizId.name}</td>
        <td style={{ color: quiz.completed ? "#27ae60" : "#c0392b" }}>
          {quiz.completed ? "Completed" : "Incomplete"}
        </td>
        <td>{quiz.score}</td>
        <td
          className={classes.onQuestionsLoad}
          onClick={() => this.onQuestionsLoad(quiz.quizId.id, quiz.studentId)}
        >
          Details{" "}
          {isQuestionsOpened ? (
            <i className="fa fa-caret-down" />
          ) : (
            <i className="fa fa-caret-right" />
          )}
        </td>
      </tr>
    );
    return row;
  };

  render() {
    const {
      cohort = {},
      studentQuizzes,
      studentCohorts,
      studentAnswers,
      firebase
    } = this.props;

    const {
      isSelected,
      selectedStudent,
      isQuestionsOpened,
      options
    } = this.state;

    const chartData = {
      labels: Array.from(values(studentQuizzes)).map(quiz => quiz.quizId.name),
      datasets: [
        {
          label: "Class progress",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: Array.from(values(studentQuizzes)).map(quiz => quiz.score)
        }
      ]
    };

    return (
      <Grid className={classes.container}>
        <Row>
          <Col xs={12} sm={12} md={3}>
            <div className={classes.cardWrapper}>
              <div className={classes.header}>Students</div>
              <div className={classes.card}>
                <Row>
                  {map(studentCohorts, (item, key) => (
                    <div
                      key={key}
                      className={classes.studentName}
                      onClick={() =>
                        this.onStudentSelect(
                          selectedStudent === item.studentId.id
                            ? null
                            : item.studentId.id
                        )
                      }
                    >
                      {selectedStudent === item.studentId.id && (
                        <i className="fa fa-circle" />
                      )}
                      <span>{item.studentId.name}</span>
                    </div>
                  ))}
                </Row>
              </div>
            </div>
          </Col>
          {!selectedStudent && (
            <Col xs={12} sm={12} md={9}>
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
                        This is the collapsible content. It can be any element
                        or React component you like.
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
                        This is the collapsible content. It can be any element
                        or React component you like.
                      </p>
                      <p>
                        It can even be another Collapsible component. Check out
                        the next section!
                      </p>
                    </Collapsible>
                  </div>
                </div>
              </div>

              <div className={classes.cardWrapper}>
                <div className={classes.header}>Class Progress</div>
                <div className={classes.chartContainer}>
                  <Bar
                    data={chartData}
                    width={100}
                    height={250}
                    options={options}
                  />
                </div>
              </div>
            </Col>
          )}
          {selectedStudent && (
            <Col xs={12} sm={12} md={8}>
              <Table
                responsive
                condensed
                bordered
                className={classes.tableOverlay}
              >
                <thead className={classes.thead}>
                  <tr>
                    <th>Quiz</th>
                    <th>State</th>
                    <th>Score</th>
                    <th>Questions</th>
                  </tr>
                </thead>
                <tbody>
                  {map(studentQuizzes, (student, key) =>
                    this.renderTableRow(student)
                  )}
                  {!studentQuizzes && (
                    <tr>
                      <td colSpan={4}>No data for current student</td>
                    </tr>
                  )}
                  {isQuestionsOpened && (
                    <tr className={classes.innerThead}>
                      <th>Question</th>
                      <th>Answer</th>
                      <th>Submitted</th>
                      <th>Got it right?</th>
                    </tr>
                  )}
                  {isQuestionsOpened &&
                    map(studentAnswers, (answer, key) =>
                      this.renderQuestionsRow(answer, key)
                    )}
                </tbody>
              </Table>
            </Col>
          )}
        </Row>
      </Grid>
    );
  }
}

Cohort.propTypes = {
  cohort: PropTypes.object,
  params: PropTypes.object.isRequired
};
const populates = [
  { child: "studentId", root: "users", keyProp: "id" },
  { child: "cohortId", root: "institution-cohorts" }
];

const enhance = compose(
  withFirebase,
  firebaseConnect(({ params: { cohortname } }) => [
    {
      path: `student-cohorts`,
      queryParams: ["orderByChild=cohortId", `equalTo=${cohortname}`],
      populates
    }
  ]),
  connect(
    ({ firebase, firebase: { data, profile } }, { params: { cohortname } }) => {
      return {
        profile,
        avatarUrl: profile.avatarUrl,
        studentCohorts: populate(firebase, "student-cohorts", populates),
        studentQuizzes: populate(firebase, "student-quizzes", quizPopulate),
        studentAnswers: populate(
          firebase,
          "student-answers",
          studentAnswerPopulate
        )
      };
    }
  ),
  spinnerWhileLoading(["studentCohorts"])
);

export default enhance(Cohort);
