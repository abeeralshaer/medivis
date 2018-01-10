import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirebase } from "react-redux-firebase";
import { required, validateEmail } from "utils/form";
import { spinnerWhileLoading } from "utils/components";
import { UserIsAuthenticated } from "utils/router";
import classes from "./CohortList.scss";
import {
  Grid,
  Row,
  Col,
  Table,
  ProgressBar,
  Modal,
  Button,
  FormGroup
} from "react-bootstrap";
import { firebaseConnect, populate } from "react-redux-firebase";
import { map, get } from "lodash";
import { COHORT_LIST } from "constants";
import { FormInput } from "../../../components/FormInput";

export class CohortList extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    isNew: false
  };

  handleSubmit(form) {
    console.log(form);
  }

  render() {
    if (this.props.children) {
      return cloneElement(this.props.children, this.props);
    }

    const { cohorts } = this.props;
    const { isNew } = this.state;

    return (
      <Grid className={classes.container}>
        <Row>
          <Col
            xs={12}
            sm={4}
            md={4}
            smOffset={4}
            mdOffset={4}
            className={classes.cardWrapper}
          >
            {!isNew && (
              <div>
                {cohorts &&
                  cohorts.length && (
                    <div>
                      <h1 className="text-center">
                        <i className="fa fa-close" />
                        Select Cohort
                      </h1>
                      <div>
                        {map(cohorts, (cohort, key) => (
                          <Link className={classes.button}>{cohort.name}</Link>
                        ))}
                      </div>
                    </div>
                  )}
                <div
                  className={classes.addCohort}
                  onClick={() => this.setState({ isNew: true })}
                >
                  <i className="fa fa-plus" />
                  Add Cohort
                </div>
              </div>
            )}
            {isNew && (
              <div className={classes.cardWrapper}>
                <div className={classes.card}>
                  <span
                    onClick={() => this.setState({ isNew: false })}
                    className={classes.closeNew}
                  >
                    <i className="fa fa-close" />
                  </span>
                  <form
                    className={classes.container}
                    onSubmit={this.handleSubmit}
                  >
                    <FormGroup>
                      <Field
                        className={classes.formField}
                        name="institution"
                        type="text"
                        placeholder="Institution name"
                        component={FormInput}
                        validate={value => (value ? undefined : "Required")}
                      />
                      <Field
                        className={classes.formField}
                        name="instructor"
                        type="text"
                        placeholder="Instructor's email"
                        component={FormInput}
                        validate={value => (value ? undefined : "Required")}
                      />
                      <Field
                        className={classes.formField}
                        name="section"
                        type="text"
                        placeholder="Class section"
                        component={FormInput}
                        validate={value => (value ? undefined : "Required")}
                      />
                    </FormGroup>
                    <div className={classes.actionContainer}>
                      <Button bsStyle="primary" type="submit" disabled>
                        Add Cohort
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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
  spinnerWhileLoading(["cohorts"]),
  reduxForm({
    form: "COHORT_LIST"
  })
)(CohortList);
