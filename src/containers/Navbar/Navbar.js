import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import {
  LIST_PATH,
  ACCOUNT_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  COHORT_LIST,
  DASHBOARD,
  COHORT_DETAILS,
  INSTRUCTOR_SIGNUP_PATH,
  userTypes
} from 'constants';
import defaultUserImage from 'static/User.png';
import classes from './Navbar.scss';
import AnatomicBar from '../../components/AnatomicBar/index';

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
};

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: {
    marginRight: '.5rem',
    width: '30px',
    height: '64px',
    padding: '0'
  }
};

@firebaseConnect()
@connect(({ firebase: { auth, profile }, location }) => ({
  auth,
  profile,
  location
}))
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    profile: PropTypes.object,
    auth: PropTypes.object,
    firebase: PropTypes.object.isRequired
  };
  state = {
    isAnatomic: false
  };
  handleLogout = () => {
    const { firebase: { logout }, profile } = this.props;
    logout();
    this.context.router.push('/');
  };

  componentWillUpdate(props, state) {
    const { location } = props;
    const { router: { location: { pathname } } } = this.context;
    this.isAnatomicPath(location.pathname ? location.pathname : pathname);
  }

  isAnatomicPath = path =>
    [ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH, COHORT_LIST, DASHBOARD].map(str =>
      str.includes(path)
    );

  render() {
    const { profile, auth, location } = this.props;
    const { router: { location: { pathname } } } = this.context;
    const path = location.pathname ? location.pathname : pathname;
    const dataLoaded = isLoaded(auth, profile);
    const authExists = isLoaded(auth) && !isEmpty(auth);

    const iconButton = (
      <IconButton style={avatarStyles.button} disableTouchRipple>
        <div className={classes.avatar}>
          <div className="hidden-mobile">
            <Avatar
              src={
                profile && profile.avatarUrl
                  ? profile.avatarUrl
                  : defaultUserImage
              }
            />
          </div>
          <div className={classes['avatar-text']}>
            <span className={`${classes['avatar-text-name']} hidden-mobile`}>
              {profile && profile.displayName ? profile.displayName : 'User'}
            </span>
            <DownArrow color="white" />
          </div>
        </div>
      </IconButton>
    );

    const rightMenu =
      dataLoaded && authExists ? (
        <IconMenu
          iconButtonElement={iconButton}
          targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          animated={false}
        >
          <MenuItem
            primaryText="Account"
            onTouchTap={() => this.context.router.push(ACCOUNT_PATH)}
          />
          <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout} />
        </IconMenu>
      ) : (
        <div className={classes.menu}>
          <Link to={SIGNUP_PATH}>
            <FlatButton label="Sign Up" style={buttonStyle} />
          </Link>
          <Link to={LOGIN_PATH}>
            <FlatButton label="Login" style={buttonStyle} />
          </Link>
        </div>
      );
    return this.isAnatomicPath(
      location.pathname ? location.pathname : pathname
    ) ? (
      <AnatomicBar
        profile={profile}
        isProfessorRoute={path === '/'}
        isCohortRoute={path.includes(COHORT_LIST)}
        router={this.context.router}
        logout={this.handleLogout}
        isAuth={dataLoaded && authExists}
      />
    ) : (
      <AppBar
        title={
          <Link to="/" className={classes.brand}>
            MEDIVIS
          </Link>
        }
        showMenuIconButton={false}
        iconElementRight={rightMenu}
        iconStyleRight={authExists ? avatarStyles.wrapper : {}}
        className={classes.appBar}
      />
    );
  }
}
