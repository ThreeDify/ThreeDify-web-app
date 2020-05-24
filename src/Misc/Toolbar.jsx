import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarOptions from './ToolbarOptions';
import AuthenticatedToolbarOptions from './AuthenticatedToolbarOptions';

class Toolbar extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return <AuthenticatedToolbarOptions></AuthenticatedToolbarOptions>;
    } else {
      return <ToolbarOptions></ToolbarOptions>;
    }
  }
}

Toolbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Toolbar);
