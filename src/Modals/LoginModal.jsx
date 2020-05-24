import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Components/Modal';
import LoginForm from '../Forms/LoginForm';
import { login, cancelAuth } from '../Store/Actions/auth';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: '',
    };

    this.onClose = this.onClose.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
  }

  onClose() {
    this.props.closeModal();
  }

  onLoginSuccess(success) {
    this.props.login(success.data);
    this.props.closeModal();
  }

  onLoginFailed(error) {
    this.setState({
      loginError: error.message,
    });
  }

  render() {
    return (
      <Modal
        show={this.props.isAuthRequested}
        onClose={this.onClose}
        parent='#root'
      >
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-12'>
              <button
                type='button'
                className='close-modal'
                onClick={this.props.closeModal}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <LoginForm
                onLoginSuccess={this.onLoginSuccess}
                onLoginFailed={this.onLoginFailed}
                onLoginError={this.onLoginFailed}
              ></LoginForm>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  login: PropTypes.func,
  isAuthRequested: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  closeModal: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuthRequested: state.auth.isAuthRequested,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(cancelAuth()),
    login: (token) => dispatch(login(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
