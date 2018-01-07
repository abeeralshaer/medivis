import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirebase } from "react-redux-firebase";
import { spinnerWhileLoading } from "utils/components";
import { UserIsAuthenticated } from "utils/router";
import defaultUserImageUrl from "static/User.png";
import classes from "./AccountPage.scss";
import { Grid, Row, Col, Table, ProgressBar } from "react-bootstrap";

export class AccountPage extends React.Component {
  state = {
    isOpened: false
  };
  render() {
    const { avatarUrl, updateAccount, profile } = this.props;
    return (
      <Grid className={classes.container}>
        <Row>
          <Col xs={12} sm={12} md={4} mdOffset={4}>
            <h1>Hello {profile.username}</h1>
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
