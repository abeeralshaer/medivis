import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirebase } from "react-redux-firebase";
import { spinnerWhileLoading } from "utils/components";
import { UserIsAuthenticated } from "utils/router";
import classes from "./CohortList.scss";
import { Grid, Row, Col, Table, ProgressBar } from "react-bootstrap";
import { firebaseConnect, populate } from "react-redux-firebase";
import { map, get } from "lodash";
import { COHORT_LIST } from "constants";

export class CohortList extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  render() {
    if (this.props.children) {
      return cloneElement(this.props.children, this.props);
    }

    const { cohorts } = this.props;
    return (
      <Grid className={classes.container}>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={4}
            mdOffset={4}
            className={classes.cardWrapper}
          >
            <Table
              responsive
              condensed
              bordered
              className={classes.tableOverlay}
            >
              <thead className={classes.thead}>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {map(cohorts, (cohort, key) => (
                  <tr
                    className={classes.cohortRow}
                    key={key}
                    onClick={() =>
                      this.context.router.push(`${COHORT_LIST}/${key}`)
                    }
                  >
                    <td>{cohort.name}</td>
                    <td>{cohort.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

CohortList.propTypes = {
  cohorts: PropTypes.object
};

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase, // adds props.firebase
  firebaseConnect(props => [
    {
      path: "/cohorts",
      queryParams: [
        "orderByChild=instructorId",
        `equalTo=${props.authData.uid}`
      ]
    }
  ]),
  connect(state => ({
    cohorts: state.firebase.data.cohorts
  })),
  spinnerWhileLoading(["cohorts"])
)(CohortList);
