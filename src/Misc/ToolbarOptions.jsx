import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestAuth, requestSignup } from '../Store/Actions/auth';

class ToolbarOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <ul className='navbar-nav align-items-center'>
          <li className='nav-item ml-2'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={this.props.requestSignup}
            >
              Signup
            </button>
          </li>
          <li className='nav-item ml-2'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={this.props.requestAuth}
            >
              Login
            </button>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

ToolbarOptions.propTypes = {
  requestAuth: PropTypes.func,
  requestSignup: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestAuth: () => dispatch(requestAuth()),
    requestSignup: () => dispatch(requestSignup()),
  };
};

export default connect(null, mapDispatchToProps)(ToolbarOptions);
