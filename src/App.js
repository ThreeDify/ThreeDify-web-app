import React from 'react';

import Clock from './Components/Clock.js';
import InputField from './Components/InputField.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, World</h1>
        <Clock />
        <InputField/>
      </div>
    );
  }
}
