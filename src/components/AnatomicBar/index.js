import React from "react";
import classes from "./AnatomicBar.scss";
import { Link } from "react-router";
import { LIST_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH } from "constants";

export default ({
  isAuth,
  logout,
  router,
  isProfessorRoute,
  isCohortRoute,
  profile
}) => (
  <div className={classes.container}>
    {!isAuth && (
      <Link to="/">
        <div className={classes.logout}>
          <div className={classes.link} />
        </div>
      </Link>
    )}
    {isAuth && (
      <div className={classes.onLogout}>
        <div className={classes.logout}>
          <div onClick={() => router.goBack()} className={classes.link} />
          <span onClick={() => logout()}>Log out</span>
        </div>
      </div>
    )}
    {isAuth && (
      <h2 className={classes.usernameTitle}>
        {isProfessorRoute && (
          <span>
            Welcome, {profile.name[0].toUpperCase()}
            {profile.name.slice(1)}
          </span>
        )}
        {isCohortRoute && (
          <span>
            {profile.name[0].toUpperCase()}
            {profile.name.slice(1)}'s Cohorts
          </span>
        )}
      </h2>
    )}
    <Link>
      <div className={classes.inline}>
        <div className={classes.logo} />
        <h1 className={classes.logoText}>Medivis</h1>
      </div>
    </Link>
  </div>
);
