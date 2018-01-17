import React from "react";
import PropTypes from "prop-types";
import SelectField from "material-ui/SelectField";

export const FormSelect = ({
  id,
  placeholder,
  input,
  label,
  type,
  children,
  className,
  meta: { touched, error, warning }
}) => (
  <SelectField
    {...input}
    type={type}
    className={className}
    hintText={label}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    floatingLabelText={label}
    errorText={touched && error}
  />
);
