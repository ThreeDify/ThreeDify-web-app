import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Components/Modal';
import SignupForm from '../Forms/SignupForm';
import { BRAND_URL } from '../Constants/misc';
import { cancelSignup } from '../Store/Actions/auth';

class SignupModal extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        show={this.props.isSignupRequested}
        onClose={this.onClose}
        parent='#root'
        size='xl'
      >
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-lg-5 d-none d-lg-block text-center align-self-center'>
              <img src={BRAND_URL} className='img-fluid' alt='ThreeDify Logo' />
            </div>
            <div className='col-lg-7'>
              <button
                type='button'
                className='close-modal'
                onClick={this.props.closeModal}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
              <SignupForm></SignupForm>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  isSignupRequested: PropTypes.bool,
  closeModal: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isSignupRequested: state.auth.isSignupRequested,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(cancelSignup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
