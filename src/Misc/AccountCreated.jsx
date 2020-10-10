import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from '../Components/Icon';
import { cancelSignup, requestAuth } from '../Store/Actions/auth';

export class AccountCreated extends React.Component {
  constructor(props) {
    super(props);

    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick() {
    this.props.closeModal();
    this.props.requestAuth();
  }

  render() {
    return (
      <div className='py-5 p-md-5'>
        <div className='d-flex flex-column justify-content-center align-items-center align-content-center text-center py-5'>
          <div className='user-profile-icon user-profile-icon-bg border border-primary p-2 rounded-circle font-weight-bold mb-4'>
            {this.props.first_name[0].toUpperCase()}
          </div>
          <h2 className='text-primary font-weight-bold'>
            Welcome {this.props.first_name}!
          </h2>
          <p className='text-success'>
            Your account has been created successfully.
          </p>
          <button
            type='button'
            className='btn btn-primary font-weight-bold'
            onClick={this.handleBtnClick}
          >
            Login to continue <Icon name='arrow-right' size='sm'></Icon>
          </button>
        </div>
      </div>
    );
  }
}

AccountCreated.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  closeModal: PropTypes.func,
  requestAuth: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestAuth: () => dispatch(requestAuth()),
    closeModal: () => dispatch(cancelSignup()),
  };
};

export default connect(null, mapDispatchToProps)(AccountCreated);
