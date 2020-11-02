import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from '../Components/Icon';
import { fetchAuthenticatedUser } from '../Store/Actions/user';

export default function withAuthenticatedUser(WrappedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);
    }

    fetchAuthenticatedUser() {
      if (!this.props.user && this.props.isLoggedIn) {
        this.props.fetchUser();
      }
    }

    componentDidMount() {
      this.fetchAuthenticatedUser();
    }

    componentDidUpdate() {
      this.fetchAuthenticatedUser();
    }

    render() {
      if (this.props.user) {
        return <WrappedComponent {...this.props}></WrappedComponent>;
      } else {
        return <Icon name='spinner' size='lg' spin={true}></Icon>;
      }
    }
  }

  Authenticate.propTypes = {
    user: PropTypes.object,
    fetchUser: PropTypes.func,
    isLoggedIn: PropTypes.bool,
  };

  const mapStateToProps = (state) => {
    return {
      user: state.user.me,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchUser: () => {
        dispatch(fetchAuthenticatedUser());
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
