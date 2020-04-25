import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoginForm from '../Forms/LoginForm';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginError: ''
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
  }

  onLoginSuccess(user) {
    console.log(user);
    this.props.history.push('/dashboard');
  }

  onLoginFailed(error) {
    console.log(error);
    this.setState({
      loginError: error.message
    });
  }

  render() {
    return (
      <div>
        <h1>ThreeDify</h1>
        <LoginForm onLoginSuccess={this.onLoginSuccess} onLoginFailed={this.onLoginFailed}></LoginForm>
        {this.state.loginError && <div>{this.state.loginError}</div>}
      </div>
    );
  }
}

Home.propTypes = {
  'history': PropTypes.object
};

export default withRouter(Home);
