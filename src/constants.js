export const LIST_PATH = '/projects';
export const DETAIL_PATH = ':projectname';
export const ACCOUNT_PATH = '/account';
export const DASHBOARD = '/dashboard';
export const COHORT_LIST = '/cohorts';
export const COHORT_DETAILS = ':cohortname';
export const LOGIN_PATH = '/login';
export const SIGNUP_PATH = '/signup';
export const INSTRUCTOR_SIGNUP_PATH = '/instructor';

export const ACCOUNT_FORM_NAME = 'account';
export const LOGIN_FORM_NAME = 'login';
export const SIGNUP_FORM_NAME = 'signup';
export const NEW_PROJECT_FORM_NAME = 'newProject';
export const RECOVER_CODE_FORM_NAME = 'recoverCode';
export const RECOVER_EMAIL_FORM_NAME = 'recoverEmail';
export const NEW_TODO_FORM_NAME = 'newTodo';

export const formNames = {
  account: ACCOUNT_FORM_NAME,
  signup: SIGNUP_FORM_NAME,
  login: LOGIN_FORM_NAME,
  recoverCode: RECOVER_CODE_FORM_NAME,
  recoverEmail: RECOVER_EMAIL_FORM_NAME,
  newTodo: NEW_TODO_FORM_NAME
};

export const paths = {
  cohorts: COHORT_LIST,
  cohort: COHORT_DETAILS,
  list: LIST_PATH,
  account: ACCOUNT_PATH,
  dashboard: DASHBOARD,
  detail: DETAIL_PATH,
  login: LOGIN_PATH,
  signup: SIGNUP_PATH,
  instructor: INSTRUCTOR_SIGNUP_PATH
};

export const userTypes = {
  INSTRUCTOR: 0,
  STUDENT: 1,
  ADMIN: 2
};

export default { ...paths, ...formNames, userTypes };
