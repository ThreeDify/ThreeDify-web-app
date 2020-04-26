import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './Themes/App.css';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

import { reducer } from './Store/Reducers/index';
import { HOME_URL, DASHBOARD_URL } from './Constants/appUrls';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <Switch>
            <Route path={DASHBOARD_URL}>
              <Dashboard></Dashboard>
            </Route>
            <Route path={HOME_URL}>
              <Home></Home>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
