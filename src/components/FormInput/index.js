import React from "react";
import PropTypes from "prop-types";
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
  <FormGroup
    validationState={touched && error ? "error" : warning ? "warning" : null}
    controlId={input.name}
  >
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl
      className={className}
      type={type}
      placeholder={placeholder}
      {...input}
    />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
);
