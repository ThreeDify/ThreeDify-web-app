import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LOGIN_URL = process.env.API_URL + '/api/login/';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: props.username || '',
      password: props.password || '',
      disableBtn: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.disableBtn();
    
    let data;
    try {
      data = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': this.state.username,
          'password': this.state.password
        })
      });  
    } catch (e) {
      this.props.onLoginFailed && this.props.onLoginFailed(data);
    }
    
    this.enableBtn();
    
    if (data.ok) {
      this.props.onLoginSuccess && this.props.onLoginSuccess(data);
    } else {
      this.props.onLoginFailed && this.props.onLoginFailed(data);
    }
  }

  disableBtn() {
    this.setState({
      disableBtn: true
    });
  }

  enableBtn() {
    this.setState({
      disableBtn: false
    });
  }

  render() {
    const { username, password, disableBtn } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* TODO: Extract this into a Component */}
          <div>
            <label>Username</label>
            <input type='text' value={username} onChange={this.handleUsernameChange} />
          </div>
          <div>
            <label>password</label>
            <input type='password' value={password} onChange={this.handlePasswordChange} />
          </div>

          <button type='submit' disabled={disableBtn}>Login</button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  'username': PropTypes.string,
  'password': PropTypes.string,
  'onLoginSuccess': PropTypes.func,
  'onLoginFailed': PropTypes.func,
};

export default LoginForm;
