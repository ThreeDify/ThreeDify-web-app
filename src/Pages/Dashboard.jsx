import React from 'react';
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

export default withRouter(Dashboard);
