import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NavLink from './Components/NavLink';
import { logout } from './Store/Actions/auth';
import { PROFILE_URL, SIGNUP_URL, LOGIN_URL } from './Constants/appUrls';

class Toolbar extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <ul className='navbar-nav align-items-center'>
          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle text-capitalize text-primary'
              href='#'
              id='userSettings'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              {this.props.user && this.props.user.username}
            </a>
            <div
              className='dropdown-menu dropdown-menu-right'
              aria-labelledby='userSettings'
            >
              <a className='dropdown-item' href='#' onClick={this.props.logout}>
                Logout
              </a>
            </div>
          </li>
          <NavLink url={PROFILE_URL}>
            <div className='user-profile-icon border border-primary p-2 rounded-circle text-center font-weight-bold'>
              {this.props.user && this.props.user.username[0].toUpperCase()}
            </div>
          </NavLink>
        </ul>
      );
    } else {
      return (
        <ul className='navbar-nav align-items-center'>
          <li className='nav-item ml-2'>
            <Link to={SIGNUP_URL} className='btn btn-primary'>
              Signup
            </Link>
          </li>
          <li className='nav-item ml-2'>
            <Link to={LOGIN_URL} className='btn btn-primary'>
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }
}

Toolbar.propTypes = {
  logout: PropType.func,
  user: PropType.object,
  isLoggedIn: PropType.bool,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
