import React from 'react';

import Clock from '../Components/Clock';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>ThreeDify</h1>
        <Clock />
      </div>
    );
  }
}
