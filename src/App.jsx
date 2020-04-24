import React from 'react';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './Themes/App.css';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

export default class App extends React.Component {
  render() {
    return (
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
    );
  }
}
