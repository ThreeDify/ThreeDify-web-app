import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchUser } from '../Utils/user';
import { user } from '../Store/Actions/user';
import { HOME_URL } from '../Constants/appUrls';

export function authenticate(WrappedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authenticated: false,
      };

      if (!this.props.user && this.props.isLoggedIn) {
        fetchUser(this.props.userToken).then((response) => {
          this.props.fetchUser(response.data);
          this.setState({
            authenticated: true,
          });
        });
      } else {
        this.state.authenticated = true;
      }
    }

    render() {
      if (!this.props.isLoggedIn) {
        return <Redirect push to={HOME_URL}></Redirect>;
      } else if (this.state.authenticated) {
        return <WrappedComponent {...this.props}></WrappedComponent>;
      } else {
        return <h1>Authenticating</h1>;
      }
    }
  }

  Authenticate.propTypes = {
    user: PropTypes.object,
    fetchUser: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    userToken: PropTypes.object,
  };

  const mapStateToProps = (state) => {
    return {
      user: state.user,
      userToken: state.auth.userToken,
      isLoggedIn: state.auth.isLoggedIn,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchUser: (loggedInUser) => {
        dispatch(user(loggedInUser));
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
