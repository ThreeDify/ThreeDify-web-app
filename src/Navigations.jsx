import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

import NavLink from './Components/NavLink';
import {
  HOME_URL,
  DASHBOARD_URL,
  CALIBRATION_URL,
  RECONSTRUCTION_URL,
} from './Constants/appUrls';

class Navigations extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <React.Fragment>
          <NavLink url={HOME_URL}>Explore</NavLink>
          <NavLink url={DASHBOARD_URL}>Dashboard</NavLink>
          <NavLink url={CALIBRATION_URL}>Calibration</NavLink>
          <NavLink url={RECONSTRUCTION_URL}>Re-construction</NavLink>
        </React.Fragment>
      );
    }
    return '';
  }
}

Navigations.propTypes = {
  isLoggedIn: PropType.bool,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(Navigations);
