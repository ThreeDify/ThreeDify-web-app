import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>ThreeDify</h1>
        <h3>Dashboard</h3>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Dashboard);
