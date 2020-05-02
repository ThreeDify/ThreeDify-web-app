import React from 'react';
import PropTypes from 'prop-types';

import '../Themes/CustomButton.css';

const DEFAULT_BTN_TYPE = 'button';

class CustomButton extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClickHandle}
        className='button'
        type={this.props.type || DEFAULT_BTN_TYPE}
        disabled={this.props.isDisabled}
      >
        {this.props.children}
      </button>
    );
  }
}

CustomButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClickHandle: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default CustomButton;
