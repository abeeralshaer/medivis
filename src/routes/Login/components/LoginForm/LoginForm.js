import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import { RECOVER_PATH, LOGIN_FORM_NAME, SIGNUP_PATH } from "constants";
import { required, validateEmail } from "utils/form";
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl
} from "react-bootstrap";
import classes from "./LoginForm.scss";
import { FormInput } from "../../../../components/FormInput";
const btnCustom = {
  width: "45%",
  marginRight: 15
};
export const LoginForm = ({ pristine, submitting, handleSubmit }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        className={classes.formField}
        name="email"
        type="text"
        placeholder="Email"
        component={FormInput}
        validate={value => (value ? undefined : "Required")}
      />
      <Field
        className={classes.formField}
        name="password"
        type="password"
        placeholder="Password"
        component={FormInput}
        validate={value => (value ? undefined : "Required")}
      />
    </FormGroup>
    <div className={classes.inlineContainer}>
      <Button style={btnCustom} bsStyle="primary" type="submit" disabled>
        Student
      </Button>
      <Button
        style={btnCustom}
        bsStyle="primary"
        type="submit"
        disabled={pristine || submitting}
      >
        {submitting ? "Loading" : "Professor"}
      </Button>
    </div>
    <div className={classes.options}>
      {/*
          <div className={classes.remember}>
          <Checkbox
            name="remember"
            value="remember"
            label="Remember"
            labelStyle={{ fontSize: ".8rem" }}
          />
        </div>
        */}
      <Link className={classes.secondaryLink} to={SIGNUP_PATH}>
        Don't have an account?
      </Link>
      <Link className={classes.secondaryLink} to={RECOVER_PATH}>
        Forgot Password?
      </Link>
    </div>
  </form>
);

LoginForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
};

export default reduxForm({
  form: LOGIN_FORM_NAME
})(LoginForm);
