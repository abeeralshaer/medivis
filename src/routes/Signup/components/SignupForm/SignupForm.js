import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { Field, reduxForm, Form } from "redux-form";
import { map, get } from "lodash";
import {
  RECOVER_PATH,
  SIGNUP_FORM_NAME,
  LOGIN_PATH,
  SIGNUP_PATH
} from "constants";
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
import { FormInput } from "../../../../components/FormInput";
import { FormSelect } from "../../../../components/FormSelect";
import MenuItem from "material-ui/MenuItem";
const btnCustom = {
  marginLeft: 10
};

export const SignupForm = ({
  pristine,
  submitting,
  handleSubmit,
  institutions
}) => (
  <Form className={classes.container} onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        className={classes.formField}
        name="email"
        type="text"
        label="Enter email"
        component={FormInput}
        validate={value => (value ? undefined : "Required")}
      />
      <Field
        className={classes.formField}
        name="name"
        type="text"
        label="Enter your name"
        component={FormInput}
        validate={value => (value ? undefined : "Required")}
      />
      <Field
        name="institution"
        className={classes.selectField}
        component={FormSelect}
        label="Choose institution"
      >
        {map(institutions, (item, key) => (
          <MenuItem key={key} value={key} primaryText={item.name} />
        ))}
      </Field>
      <Field
        className={classes.formField}
        name="password"
        type="password"
        label="Enter password"
        component={FormInput}
        validate={value => (value ? undefined : "Required")}
      />
    </FormGroup>
    <div className={classes.actionContainer}>
      <Button bsStyle="primary" type="submit" disabled={pristine || submitting}>
        Sign up
      </Button>
    </div>
    <div className="text-center">
      <Link to={LOGIN_PATH}>Don't have an account? Click here</Link>
    </div>
  </Form>
);

SignupForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
};

export default reduxForm({
  form: SIGNUP_FORM_NAME
})(SignupForm);
