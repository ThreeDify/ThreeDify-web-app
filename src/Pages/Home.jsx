import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from '../Store/Actions/auth';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container my-4'>
        <div className='row justify-content-center'>
          {this.props.isLoggedIn && (
            <div className='col-12'>
              <p>Welcome {this.props.user && this.props.user.username}</p>
            </div>
          )}
          <div className='col-12'>
            <h3>Explore</h3>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token) => dispatch(login(token)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
