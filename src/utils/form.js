export const required = value => (value ? undefined : 'Required');

export const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const password = value =>
  value && !/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/.test(value)
    ? 'Minimum eight characters, at least one letter and one number'
    : undefined;

export const pin = value =>
  value && !/^[0-9]{4}$/.test(value)
    ? 'Pin should contain 4 digits'
    : undefined;
