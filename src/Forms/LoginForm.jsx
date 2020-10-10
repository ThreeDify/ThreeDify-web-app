import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  LOGIN_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from '../Constants/messages';
import { login } from '../Utils/auth';
import InputField from '../Components/InputField';
import { STATUS_OK } from '../Constants/httpStatus';
import PasswordField from '../Components/PasswordField';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.username || '',
      password: props.password || '',
      disabled: false,
      loginError: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.disable();

    login(this.state.username, this.state.password)
      .then((response) => {
        this.enable();
        if (response.status === STATUS_OK) {
          this.loginSuccess(response);
        }
      })
      .catch((e) => {
        this.enable();

        if (e.response && e.response.data) {
          this.loginFailed(e.response);
        } else {
          this.loginError(e);
        }
      });
  }

  loginSuccess(response) {
    this.props.onLoginSuccess &&
      this.props.onLoginSuccess({
        data: response.data,
        status: response.status,
        message: LOGIN_SUCCESS,
      });
  }

  loginFailed(response) {
    this.props.onLoginFailed &&
      this.props.onLoginFailed({
        data: response.data,
        status: response.status,
        message: LOGIN_FAILED,
      });

    this.setState({
      loginError: LOGIN_FAILED,
    });
  }

  loginError(e) {
    this.props.onLoginError &&
      this.props.onLoginError({
        message: LOGIN_ERROR,
        error: e,
      });

    this.setState({
      loginError: LOGIN_ERROR,
    });
  }

  disable() {
    this.setState({
      disabled: true,
    });
  }

  enable() {
    this.setState({
      disabled: false,
    });
  }

  render() {
    const { username, password, disabled } = this.state;

    return (
      <div className='p-5'>
        <div className='pb-2 text-center'>
          <h2 className='font-weight-bold'>Welcome Back!</h2>
          <p>Sigin to access your 3D models.</p>
        </div>

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

        <form className='pt-2' onSubmit={this.handleSubmit}>
          <InputField
            placeholder='Username'
            name='username'
            type='text'
            value={username}
            leftIconName='user'
            onChange={this.handleUsernameChange}
            disabled={disabled}
            required
          ></InputField>

          <PasswordField
            placeholder='Password'
            value={password}
            onChange={this.handlePasswordChange}
            leftIconName='key'
            disabled={disabled}
            required
          ></PasswordField>

          <div className='text-center'>
            <button
              type='submit'
              disabled={disabled}
              className='btn btn-primary font-weight-bold'
            >
              Login
            </button>
          </div>

          <hr className='w-75 mx-auto'></hr>

          <div className='text-center'>
            <a href='#'>Forgot Password?</a>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  onLoginSuccess: PropTypes.func,
  onLoginFailed: PropTypes.func,
  onLoginError: PropTypes.func,
};

export default LoginForm;
