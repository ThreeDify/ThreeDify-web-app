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
      btnDisabled: false,
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

  async handleSubmit(e) {
    e.preventDefault();

    this.disableBtn();

    login(this.state.username, this.state.password)
      .then((response) => {
        this.enableBtn();
        if (response.status === STATUS_OK) {
          this.loginSuccess(response);
        }
      })
      .catch((e) => {
        this.enableBtn();

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
  }

  loginError(e) {
    this.props.onLoginError &&
      this.props.onLoginError({
        message: LOGIN_ERROR,
        error: e,
      });
  }

  disableBtn() {
    this.setState({
      btnDisabled: true,
    });
  }

  enableBtn() {
    this.setState({
      btnDisabled: false,
    });
  }

  render() {
    const { username, password, btnDisabled } = this.state;

    return (
      <div className='p-5'>
        <h3 className='pb-2 text-center'>Login</h3>
        <form className='pt-2' onSubmit={this.handleSubmit}>
          <InputField
            placeholder='Username'
            name='username'
            type='text'
            value={username}
            leftIconName='user'
            onChange={this.handleUsernameChange}
            required
          ></InputField>

          <PasswordField
            placeholder='Password'
            value={password}
            onChange={this.handlePasswordChange}
            leftIconName='key'
            required
          ></PasswordField>

          <button
            type='submit'
            disabled={btnDisabled}
            className='btn btn-primary'
          >
            Login
          </button>
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
