import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from './Icon';
import { HOME_URL } from '../Constants/appUrls';

class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg sticky-top bg-white px-5 py-3 shadow-sm border-primary border-bottom'>
        <Link to={HOME_URL} className='navbar-brand'>
          {this.props.brand}
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <Icon name='bars'></Icon>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mx-auto'>{this.props.navigation}</ul>
          {this.props.toolbar}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  brand: PropTypes.node,
  navigation: PropTypes.node,
  toolbar: PropTypes.node,
};

export default Navbar;
