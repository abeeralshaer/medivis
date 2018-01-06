import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";
import { SIGNUP_FORM_NAME, LOGIN_PATH } from "constants";
import { required, validateEmail } from "utils/form";
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl
} from "react-bootstrap";
import classes from "./SignupForm.scss";
import { Link } from "react-router";
import { FormInput } from "../../../../components/FormInput";

const SignupForm = ({ pristine, submitting, handleSubmit }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        className={classes.formField}
        name="username"
        type="text"
        placeholder="Username"
        component={FormInput}
        validate={value => (value ? undefined : "Required")}
      />
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
      <div className={classes.submit}>
        <Button
          className={classes.submitBtn}
          type="submit"
          disabled={pristine || submitting}
        >
          {submitting ? "Loading" : "Signup"}
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
        <Link className={classes.secondaryLink} to={LOGIN_PATH}>
          Already have an account?
        </Link>
      </div>
    </div>
  </form>
);

SignupForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
};

export default reduxForm({
  form: SIGNUP_FORM_NAME
})(SignupForm);
