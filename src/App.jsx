import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './Themes/App.css';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { logout } from './Store/Actions/auth';
import { HOME_URL, DASHBOARD_URL } from './Constants/appUrls';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={HOME_URL}>Home</Link>
            </li>
            {this.props.isLoggedIn && (
              <React.Fragment>
                <li>
                  <Link to={DASHBOARD_URL}>Dashboard</Link>
                </li>
                <li>
                  <Link to={HOME_URL} onClick={this.props.logout}>
                    LogOut
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
        <Switch>
          <Route path={DASHBOARD_URL}>
            <Dashboard></Dashboard>
          </Route>
          <Route path={HOME_URL}>
            <Home></Home>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropType.bool,
  logout: PropType.func,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
