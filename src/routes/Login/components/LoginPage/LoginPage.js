import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import GoogleButton from "react-google-button";
import { withFirebase } from "react-redux-firebase";
import { withHandlers, pure, compose } from "recompose";
import { withNotifications } from "modules/notification";
import { UserIsNotAuthenticated } from "utils/router";
import { Grid, Row, Col } from "react-bootstrap";
import LoginForm from "../LoginForm";

import classes from "./LoginPage.scss";

export const LoginPage = ({ emailLogin, googleLogin, onSubmitFail }) => (
  <div className={classes.alignCenter}>
    <Grid className={classes.container}>
      <Row>
        <div className="text-center">
          <h1 className={classes.title}>AnatomyX</h1>
          <h2 className={classes.secondary}>Log Into My Account</h2>
        </div>
      </Row>
      <Row>
        <Col
          xs={10}
          sm={6}
          md={3}
          mdOffset={4}
          style={{ float: "none", margin: "0 auto" }}
        >
          <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
        </Col>
      </Row>
      {/* <div className={classes.or}>or</div>
<div className={classes.providers}>
  <GoogleButton onClick={googleLogin} />
</div> 
<div className={classes.signup}>
  <span className={classes.signupLabel}>Need an account?</span>
  <Link className={classes.signupLink} to={SIGNUP_PATH}>
    Sign Up
  </Link>
</div>*/}
    </Grid>
  </div>
);

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    // eslint-disable-line
    login: PropTypes.func.isRequired
  }),
  emailLogin: PropTypes.func,
  onSubmitFail: PropTypes.func,
  googleLogin: PropTypes.func
};

export default compose(
  UserIsNotAuthenticated, // redirect to projects page if already authenticated
  withNotifications, // add props.showError
  withFirebase, // add props.firebase
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? "Form Invalid" : err.message || "Error"),
    googleLogin: ({ firebase, showError }) => event =>
      firebase
        .login({ provider: "google", type: "popup" })
        .catch(err => showError(err.message)),
    emailLogin: ({ firebase, showError }) => creds =>
      firebase.login(creds).catch(err => showError(err.message))
  }),
  pure
)(LoginPage);
