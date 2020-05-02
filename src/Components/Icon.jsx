import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends Component {
  render() {
    return <FontAwesomeIcon icon={this.props.name} size={this.props.size} />;
  }
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
};

export default Icon;
