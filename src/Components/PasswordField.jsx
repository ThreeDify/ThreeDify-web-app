import React from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';

const DEFAULT_SHOW_ICON = 'eye';
const DEFAULT_HIDE_ICON = 'eye-slash';

class PasswordField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordIcon: props.showPasswordIcon || DEFAULT_SHOW_ICON,
      hidePasswordIcon: props.hidePasswordIcon || DEFAULT_HIDE_ICON,
      isVisible: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility(e) {
    this.setState((state) => {
      return { isVisible: !state.isVisible };
    });

    this.props.onRightIconClick && this.props.onRightIconClick(e);
  }

  render() {
    return (
      <InputField
        type={this.state.isVisible ? 'text' : 'password'}
        rightIconName={
          this.state.isVisible
            ? this.state.showPasswordIcon
            : this.state.hidePasswordIcon
        }
        onRightIconClick={this.toggleVisibility}
        {...this.props}
      />
    );
  }
}

PasswordField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  leftIconName: PropTypes.string,
  onRightIconClick: PropTypes.func,
  showPasswordIcon: PropTypes.string,
  hidePasswordIcon: PropTypes.string,
};

export default PasswordField;
