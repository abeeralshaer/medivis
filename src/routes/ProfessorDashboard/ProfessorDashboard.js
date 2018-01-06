import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirebase } from "react-redux-firebase";
import { spinnerWhileLoading } from "utils/components";
import { UserIsAuthenticated } from "utils/router";
import classes from "./ProfessorDashboard.scss";
import { Grid, Row, Col } from "react-bootstrap";
import Collapsible from "react-collapsible";

export class ProfessorDashboard extends React.Component {
  state = {
    isOpened: false
  };
  render() {
    const { avatarUrl, profile } = this.props;
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
            <div className={classes.card}>
              <h2 className={classes.usernameTitle}>
                Welcome, {profile.username[0].toUpperCase()}
                {profile.username.slice(1)}
              </h2>
              <button disabled className={classes.button}>
                My Learning Data
              </button>
              <Link to="/cohorts">
                <div className={classes.button}>Instructor Dashboard</div>
              </Link>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ProfessorDashboard.propTypes = {
  avatarUrl: PropTypes.string,
  profile: PropTypes.object
};

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase, // adds props.firebase
  connect(({ firebase: { profile } }) => ({
    profile,
    avatarUrl: profile.avatarUrl
  })),
  spinnerWhileLoading(["profile"])
)(ProfessorDashboard);
