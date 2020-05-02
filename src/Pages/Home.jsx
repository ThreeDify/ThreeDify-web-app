import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginForm from '../Forms/LoginForm';
import { login } from '../Store/Actions/auth';
import { DASHBOARD_URL } from '../Constants/appUrls';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: '',
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
  }

  onLoginSuccess(token) {
    this.props.login(token);
    this.props.history.push(DASHBOARD_URL);
  }

  onLoginFailed(error) {
    console.log(error);
    this.setState({
      loginError: error.message,
    });
  }

  render() {
    return (
      <div>
        <h1>ThreeDify</h1>
        <LoginForm
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailed={this.onLoginFailed}
          onLoginError={this.onLoginFailed}
        ></LoginForm>
        {this.state.loginError && <div>{this.state.loginError}</div>}
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object,
  login: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token) => dispatch(login(token)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Home));
