import React from 'react';
import classes from './SideBar.scss';
import defaultUserImage from 'static/user-example.png';
import Logo from 'static/logo.png';

const SideBarContent = () => (
  <div className={classes.container}>
    <div className={classes.userTools}>
      <div className={classes.tool}>
        <div className={classes.logo}>
          <img src={Logo} />
        </div>
        <div className={classes.text}>Medivis</div>
      </div>
      <div className={classes.lisContainer}>
        <ul>
          <li>
            <div className={classes.tool}>
            <div className={classes.userImageContainer}>
              <div className={classes.userImage}>
                <img src={defaultUserImage} />
              </div>
              </div>
              <div className={classes.text}>Barak</div>
            </div>
          </li>
          <li>
            <div className={classes.tool}>
              <div className={classes.alerts} />
              <div className={classes.text}>Alerts</div>
            </div>
          </li>
          <li>
            <div className={classes.tool}>
              <div className={classes.message} />
              <div className={classes.text}>Messages</div>
            </div>
          </li>
          <li>
            <div className={classes.tool}>
              <div className={classes.forums} />
              <div className={classes.text}>Forums</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className={classes.lisContainer}>
      <ul>
        <li>
          <div className={classes.tool}>
            <div className={classes.settings} />
            <div className={classes.text}>Settings</div>
          </div>
        </li>
        <li>
          <div className={classes.tool}>
            <div className={classes.help} />
            <div className={classes.text}>Help</div>
          </div>
        </li>
        <li>
          <div className={classes.tool}>
            <div className={classes.logout} />
            <div className={classes.text}>Logout</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
);


export default SideBarContent
