import React from 'react';

import './Themes/App.css';

import Clock from './Components/Clock.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>ThreeDify</h1>
        <Clock />
      </div>
    );
  }
}
