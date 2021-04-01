import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

export class InputField extends React.Component {
  getIconButton(icon, onClickHandle) {
    if (onClickHandle) {
      return (
        <button
          type='button'
          onClick={onClickHandle}
          className='btn btn-outline-secondary'
          disabled={this.props.disabled}
        >
          {this.getIcon(icon)}
        </button>
      );
    }
    return <span className='input-group-text'>{this.getIcon(icon)}</span>;
  }

  getIcon(iconName) {
    return (
      <i>
        <Icon size='xs' name={iconName} />
      </i>
    );
  }

  render() {
    return (
      <div className='form-group mb-3'>
        <div className={`input-group ${this.props.disabled ? 'disabled' : ''}`}>
          {this.props.leftIconName && (
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                {this.getIcon(this.props.leftIconName)}
              </span>
            </div>
          )}
          <input
            className={`form-control ${this.props.error && 'is-invalid'} ${
              this.props.error && !this.props.rightIconName && 'rounded-right'
            }`}
            type={this.props.type}
            name={this.props.name}
            onChange={this.props.onChange}
            value={this.props.value}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            required={this.props.required}
          />
          {this.props.rightIconName && (
            <div className='input-group-append'>
              {this.getIconButton(
                this.props.rightIconName,
                this.props.onRightIconClick
              )}
            </div>
          )}
          {this.props.error && (
            <div className='invalid-feedback'>{this.props.error}</div>
          )}
        </div>
      </div>
    );
  }
}

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  leftIconName: PropTypes.string,
  rightIconName: PropTypes.string,
  onRightIconClick: PropTypes.func,
};

export default InputField;
