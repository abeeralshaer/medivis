import React from "react";
import classes from "./AnatomicBar.scss";
import { Link } from "react-router";
import { LIST_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH } from "constants";

export default ({ isAuth, logout }) => (
  <div className={classes.container}>
    {!isAuth && (
      <Link to="/">
        <div className={classes.logout}>
          <div className={classes.link} />
        </div>
      </Link>
    )}
    {isAuth && (
      <div onClick={() => logout()} className={classes.onLogout}>
        <div className={classes.logout}>
          <div className={classes.link} />
          <span>Log out</span>
        </div>
      </div>
    )}
    <Link>
      <div className={classes.inline}>
        <div className={classes.logo} />
        <h1 className={classes.logoText}>Medivis</h1>
      </div>
    </Link>
  </div>
);
