import React from 'react';
import PropTypes from 'prop-types';

import NavLink from '../Components/NavLink';
import { PROFILE_URL } from '../Constants/appUrls';
import { authenticate } from '../Middlewares/authenticate';

class AuthenticatedToolbarOptions extends React.Component {
  render() {
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
            {this.props.user && this.props.user.first_name}
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
            {this.props.user && this.props.user.first_name[0].toUpperCase()}
          </div>
        </NavLink>
      </ul>
    );
  }
}

AuthenticatedToolbarOptions.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
};

export default authenticate(AuthenticatedToolbarOptions);
