import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Footer from './Misc/Footer';
import Toolbar from './Misc/Toolbar';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Navigations from './Misc/Navigations';
import { BRAND_URL } from './Constants/misc';
import { HOME_URL, DASHBOARD_URL, LOGIN_URL } from './Constants/appUrls';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='page-container'>
          <header>
            <Navbar
              brand={<img src={BRAND_URL} height='30'></img>}
              navigation={<Navigations></Navigations>}
              toolbar={<Toolbar></Toolbar>}
            ></Navbar>
          </header>

          <main className='py-5'>
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
          </main>

          <Footer></Footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
