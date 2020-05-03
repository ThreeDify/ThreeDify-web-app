import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from '../Forms/LoginForm';
import { login } from '../Store/Actions/auth';
import { DASHBOARD_URL } from '../Constants/appUrls';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: '',
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
  }

  onLoginSuccess(success) {
    this.props.login(success.data);
  }

  onLoginFailed(error) {
    this.setState({
      loginError: error.message,
    });
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to={DASHBOARD_URL}></Redirect>;
    }
    return (
      <div className='container my-4'>
        {this.state.loginError && (
          <div
            className='alert alert-danger alert-dismissible fade show'
            role='alert'
          >
            {this.state.loginError}
            <button
              type='button'
              className='close'
              data-dismiss='alert'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        )}
        <div className='row justify-content-center'>
          <div className='col-md-8 bg-white border border-primary shadow-sm'>
            <LoginForm
              onLoginSuccess={this.onLoginSuccess}
              onLoginFailed={this.onLoginFailed}
              onLoginError={this.onLoginFailed}
            ></LoginForm>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token) => dispatch(login(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
