import React from "react";
import PropTypes from "prop-types";
import Navbar from "containers/Navbar";
import classes from "./CoreLayout.scss";
import "styles/core.scss";

export const CoreLayout = ({ children }) => (
  <div className={classes.container}>
    <Navbar />
    <div className={classes.children}>{children}</div>
    <div className={classes.social}>
      <a target="_blank" href="http://www.twitter.com">
        <i className="fa fa-twitter" />
      </a>
      <a target="_blank" href="http://www.youtube.com">
        <i className="fa fa-youtube-play" />
      </a>
      <a target="_blank" href="http://www.instagram.com">
        <i className="fa fa-instagram" />
      </a>
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default CoreLayout;
