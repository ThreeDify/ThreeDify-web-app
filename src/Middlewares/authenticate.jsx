import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUser } from '../Utils/user';
import { setUser } from '../Store/Actions/user';
import { logout, requestAuth } from '../Store/Actions/auth';

export function authenticate(WrappedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authenticated: false,
      };
    }

    componentDidMount() {
      if (!this.props.isLoggedIn) {
        this.props.requestAuth();
      } else {
        if (!this.props.user) {
          fetchUser(this.props.userToken).then((response) => {
            this.props.setUser(response.data);
            this.setState({
              authenticated: true,
            });
          });
        } else {
          this.setState({
            authenticated: true,
          });
        }
      }
    }

    render() {
      if (!this.props.isLoggedIn) {
        return <h1>Please login to continue.</h1>;
      } else if (this.state.authenticated) {
        return <WrappedComponent {...this.props}></WrappedComponent>;
      } else {
        return <h1>Authenticating...</h1>;
      }
    }
  }

  Authenticate.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func,
    requestAuth: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    userToken: PropTypes.object,
    isAuthRequested: PropTypes.bool,
  };

  const mapStateToProps = (state) => {
    return {
      user: state.user,
      userToken: state.auth.userToken,
      isLoggedIn: state.auth.isLoggedIn,
      isAuthRequested: state.auth.isAuthRequested,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (loggedInUser) => {
        dispatch(setUser(loggedInUser));
      },
      logout: () => dispatch(logout()),
      requestAuth: () => dispatch(requestAuth()),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
