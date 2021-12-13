import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Components/Modal';
import LoginForm from '../Forms/LoginForm';
import { login, cancelAuth, closeLoginModal } from '../Store/Actions/auth';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: '',
    };

    this.onClose = this.onClose.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
  }

  onClose() {
    this.props.closeModal();
  }

  onCancel() {
    this.props.cancelAuth();
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
    return (
      <Modal
        show={this.props.isAuthRequested}
        onClose={this.onClose}
        onCancel={this.onCancel}
        parent='#root'
      >
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-12'>
              <button
                type='button'
                className='close-modal'
                onClick={this.onCancel}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <LoginForm
                onLoginSuccess={this.onLoginSuccess}
                onLoginFailed={this.onLoginFailed}
                onLoginError={this.onLoginFailed}
                onLoginCancelled={this.onCancel}
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
  cancelAuth: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuthRequested: state.auth.isAuthRequested,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeLoginModal()),
    cancelAuth: () => dispatch(cancelAuth()),
    login: (token) => dispatch(login(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
