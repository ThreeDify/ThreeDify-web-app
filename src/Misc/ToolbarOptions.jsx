import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { SIGNUP_URL } from '../Constants/appUrls';
import { requestAuth } from '../Store/Actions/auth';

class ToolbarOptions extends React.Component {
  constructor(props) {
    super(props);
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestAuth: () => dispatch(requestAuth()),
  };
};

export default connect(null, mapDispatchToProps)(ToolbarOptions);
