import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm, Form, formValueSelector } from 'redux-form';
import { map, get } from 'lodash';
import {
  RECOVER_PATH,
  SIGNUP_FORM_NAME,
  LOGIN_PATH,
  SIGNUP_PATH
} from 'constants';
import { required, validateEmail, password, pin } from 'utils/form';
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import classes from './SignupForm.scss';
import { FormInput } from '../../../../components/FormInput';
import { FormSelect } from '../../../../components/FormSelect';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
const btnCustom = {
  marginLeft: 10
};
const styles = {
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex'
  },
  label: {
    color: '#fff'
  },
  iconStyle: {
    fill: '#1dc3eb'
  },
  radioButton: {
    color: '#fff',
    marginBottom: 16
  }
};

const renderRadioGroup = ({ input, defaultSelected, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    defaultSelected={defaultSelected}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

let SignupForm = ({
  pristine,
  submitting,
  invalid,
  handleSubmit,
  institutions,
  isStudent
}) => (
  <div>
    <h2>Complete your account</h2>
    <Form className={classes.container} onSubmit={handleSubmit}>
      <FormGroup>
        <Field
          className={classes.formField}
          name="password"
          type="password"
          label="Create password"
          component={FormInput}
          validate={value => required(value)}
        />
        <div className={classes.subheader}>Who am I?</div>
        <div className={classes.radioButtonGroup}>
          <Field
            name="status"
            defaultSelected={1}
            style={styles.inline}
            component={renderRadioGroup}
            validate={value => required(value != null ? 1 : undefined)}
          >
            <RadioButton
              value={1}
              label="Student"
              iconStyle={styles.iconStyle}
              labelStyle={styles.label}
              style={styles.radioButton}
            />
            <RadioButton
              value={0}
              label="Instructor"
              iconStyle={styles.iconStyle}
              labelStyle={styles.label}
              style={styles.radioButton}
            />
          </Field>
        </div>
        {!!isStudent && (
          <Field
            className={classes.formField}
            name="pin"
            type="password"
            label="Enter your pin (eg. 4004)"
            component={FormInput}
            validate={value => pin(value)}
          />
        )}
        {isStudent === 0 && (
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
        )}
      </FormGroup>
      <div className={classes.actionContainer}>
        <RaisedButton
          type="submit"
          label="Sign up"
          primary
          disabled={pristine || submitting || invalid}
        />
      </div>
    </Form>
  </div>
);

SignupForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
};

SignupForm = reduxForm({
  form: SIGNUP_FORM_NAME
})(SignupForm);

const selector = formValueSelector(SIGNUP_FORM_NAME);

SignupForm = connect(state => {
  const isStudent = selector(state, 'status');
  return {
    isStudent
  };
})(SignupForm);

export default SignupForm;
