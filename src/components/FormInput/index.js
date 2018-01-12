import React from "react";
import PropTypes from "prop-types";
import { TextField } from "redux-form-material-ui";

import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

export const FormInput = ({
  id,
  placeholder,
  input,
  label,
  type,
  className,
  meta: { touched, error, warning }
}) => (
  <TextField
    {...input}
    type={type}
    className={className}
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
  />
);
