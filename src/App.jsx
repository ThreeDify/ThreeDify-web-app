import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './Themes/App.css';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.store = createStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard></Dashboard>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
