import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Toolbar from './Toolbar';
import Login from './Pages/Login';
import Navigations from './Navigations';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import { BRAND_URL } from './Constants/misc';
import { HOME_URL, DASHBOARD_URL, LOGIN_URL } from './Constants/appUrls';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar
          brand={<img src={BRAND_URL} height='30'></img>}
          navigation={<Navigations></Navigations>}
          toolbar={<Toolbar></Toolbar>}
        ></Navbar>

        <Switch>
          <Route path={DASHBOARD_URL}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={LOGIN_URL}>
            <Login></Login>
          </Route>
          <Route path={HOME_URL}>
            <Home></Home>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
