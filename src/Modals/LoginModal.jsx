import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Components/Modal';
import LoginForm from '../Forms/LoginForm';
import { login } from '../Store/Actions/auth';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: '',
      forceClose: false,
    };

    this.onClose = this.onClose.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
  }

  closeModal() {
    this.setState({
      forceClose: true,
    });
  }

  onClose() {
    this.props.onClose();

    this.setState({
      forceClose: false,
    });
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
        show={this.props.showModal && !this.state.forceClose}
        onClose={this.onClose}
        parent='#root'
      >
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-12'>
              <button
                type='button'
                className='close-modal'
                onClick={this.closeModal}
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
  showModal: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
