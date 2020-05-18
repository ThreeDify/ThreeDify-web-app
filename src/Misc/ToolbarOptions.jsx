import React from 'react';
import { Link } from 'react-router-dom';

import LoginModal from '../Modals/LoginModal';
import { SIGNUP_URL } from '../Constants/appUrls';

class ToolbarOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoginModal: false,
    };

    this.openLoginModal = this.openLoginModal.bind(this);
    this.onLoginModalClosed = this.onLoginModalClosed.bind(this);
  }

  openLoginModal() {
    this.setState({
      showLoginModal: true,
    });
  }

  onLoginModalClosed() {
    this.setState({
      showLoginModal: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <ul className='navbar-nav align-items-center'>
          <li className='nav-item ml-2'>
            <Link to={SIGNUP_URL} className='btn btn-primary'>
              Signup
            </Link>
          </li>
          <li className='nav-item ml-2'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={this.openLoginModal}
            >
              Login
            </button>
          </li>
        </ul>
        <LoginModal
          showModal={this.state.showLoginModal}
          onClose={this.onLoginModalClosed}
        ></LoginModal>
      </React.Fragment>
    );
  }
}

export default ToolbarOptions;
