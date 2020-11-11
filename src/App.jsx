import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Footer from './Misc/Footer';
import Toolbar from './Misc/Toolbar';
import Explore from './Pages/Explore';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Reconstruction from './Pages/Reconstruction';
import Profile from './Pages/Profile';
import LoginModal from './Modals/LoginModal';
import Navigations from './Misc/Navigations';
import { BRAND_URL } from './Constants/misc';
import SignupModal from './Modals/SignupModal';
import {
  HOME_URL,
  DASHBOARD_URL,
  RECONSTRUCTION_URL,
  EXPLORE_URL,
  PROFILE_URL,
} from './Constants/appUrls';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='page-container'>
          <header>
            <Navbar
              brand={
                <img src={BRAND_URL} height='30' alt='ThreeDify Logo'></img>
              }
              navigation={<Navigations></Navigations>}
              toolbar={<Toolbar></Toolbar>}
            ></Navbar>
          </header>

          <main className='py-5'>
            <Switch>
              <Route exact path={EXPLORE_URL}>
                <Explore></Explore>
              </Route>
              <Route exact path={DASHBOARD_URL}>
                <Dashboard></Dashboard>
              </Route>

              <Route exact path={HOME_URL}>
                <Home></Home>
              </Route>

              <Route exact path={PROFILE_URL}>
                <Profile></Profile>
              </Route>

              <Route strict exact path={RECONSTRUCTION_URL}>
                <Reconstruction></Reconstruction>
              </Route>
            </Switch>
          </main>

          <LoginModal></LoginModal>
          <SignupModal></SignupModal>

          <Footer></Footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
