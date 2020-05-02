import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class NavLink extends React.Component {
  render() {
    const isActive = this.props.history.location.pathname === this.props.url;
    const clsName = `nav-item ${isActive ? 'active' : ''}`;
    return (
      <li className={clsName}>
        <Link to={this.props.url} className='nav-link'>
          {this.props.children}
          {isActive && <span className='sr-only'>(current)</span>}
        </Link>
      </li>
    );
  }
}

NavLink.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node,
  history: PropTypes.object,
};

export default withRouter(NavLink);
