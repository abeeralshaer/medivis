import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Field, reduxForm, Form } from 'redux-form';
import {
  RECOVER_PATH,
  SIGNUP_FORM_NAME,
  LOGIN_PATH,
  SIGNUP_PATH
} from 'constants';
import { required, validateEmail } from 'utils/form';
import { Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import classes from './SignupForm.scss';
import { FormInput } from '../../../../components/FormInput';

export const SignupCommonData = ({ pristine, submitting, handleSubmit }) => (
  <div>
    <div className="text-center">
      <h1 className={classes.title}>AnatomyX</h1>
      <h2 className={classes.secondary}>Sign Up</h2>
    </div>
    <Form className={classes.container} onSubmit={handleSubmit}>
      <FormGroup>
        <div className={classes.inline}>
          <Field
            className={classes.formField}
            name="fname"
            type="text"
            label="First name"
            component={FormInput}
            validate={value => (value ? undefined : 'Required')}
          />
          <Field
            className={classes.formField}
            name="lname"
            type="text"
            label="Last name"
            component={FormInput}
            validate={value => (value ? undefined : 'Required')}
          />
        </div>
        <Field
          className={classes.formField}
          name="eaddress"
          type="text"
          label="Enter email address"
          component={FormInput}
          validate={value => (value ? undefined : 'Required')}
        />
      </FormGroup>
      <div className={classes.actionContainer}>
        <RaisedButton
          primary={true}
          label="Get started"
          type="submit"
          disabled={pristine || submitting}
        />
      </div>
      <div className="text-center">
        <Link to={LOGIN_PATH}>Already registered? Click here</Link>
      </div>
    </Form>
  </div>
);

SignupCommonData.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
};

export default reduxForm({
  form: SIGNUP_FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SignupCommonData);
