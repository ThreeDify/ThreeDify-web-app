import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Footer from './Misc/Footer';
import Toolbar from './Misc/Toolbar';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import LoginModal from './Modals/LoginModal';
import Navigations from './Misc/Navigations';
import { BRAND_URL } from './Constants/misc';
import SignupModal from './Modals/SignupModal';
import { HOME_URL, DASHBOARD_URL, EXPLORE_URL } from './Constants/appUrls';
import Explore from './Pages/Explore';

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
              <Route path={HOME_URL}>
                <Home></Home>
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
