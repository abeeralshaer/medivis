import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import { required, validateEmail } from 'utils/form';
import {
  Grid,
  Row,
  Col,
  Table,
  ProgressBar,
  Modal,
  Button,
  FormGroup
} from 'react-bootstrap';
import { COHORT_LIST } from 'constants';
import { FormInput } from '../../../components/FormInput';
import classes from './styles/AddCohortForm.styles.scss';

const AddCohortForm = ({ onCloseForm, handleSubmit, pristine, submitting }) => (
  <div className={classes.cardWrapper}>
    <div className={classes.card}>
      <span onClick={() => onCloseForm()} className={classes.closeNew}>
        <i className="fa fa-close" />
      </span>
      <Form className={classes.container} onSubmit={handleSubmit}>
        <FormGroup>
          <Field
            className={classes.formField}
            name="name"
            type="text"
            label="Cohort's name"
            component={FormInput}
            validate={value => (value ? undefined : 'Required')}
          />
          <Field
            className={classes.formField}
            name="description"
            type="text"
            label="Description"
            component={FormInput}
            validate={value => (value ? undefined : 'Required')}
          />
        </FormGroup>
        <div className={classes.actionContainer}>
          <Button
            bsStyle="primary"
            type="submit"
            disabled={pristine || submitting}
          >
            Add Cohort
          </Button>
        </div>
      </Form>
    </div>
  </div>
);

AddCohortForm.propTypes = {
  onCloseForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'ADD_COHORT'
})(AddCohortForm);
