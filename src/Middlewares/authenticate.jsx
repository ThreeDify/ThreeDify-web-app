import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from '../Components/Icon';
import { logout, requestAuth } from '../Store/Actions/auth';

export default function authenticate(WrappedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authenticated: false,
      };
    }

    checkAuthentication() {
      if (!this.props.isLoggedIn) {
        this.props.requestAuth();
      } else if (!this.state.authenticated) {
        this.setState({
          authenticated: true,
        });
      }
    }

    componentDidMount() {
      this.checkAuthentication();
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    render() {
      if (!this.props.isLoggedIn) {
        return <h1>Please login to continue.</h1>;
      } else if (this.state.authenticated) {
        return <WrappedComponent {...this.props}></WrappedComponent>;
      } else {
        return <Icon name='spinner' size='lg' spin={true}></Icon>;
      }
    }
  }

  Authenticate.propTypes = {
    logout: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    requestAuth: PropTypes.func,
    isAuthRequested: PropTypes.bool,
  };

  const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      isAuthRequested: state.auth.isAuthRequested,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout()),
      requestAuth: () => dispatch(requestAuth()),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
