import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

class InputField extends React.Component {
  getIconButton(icon, onClickHandle) {
    if (onClickHandle) {
      return (
        <button
          type='button'
          onClick={onClickHandle}
          className='btn btn-outline-secondary'
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
      <div className='from-group mb-3'>
        <div className='input-group'>
          {this.props.leftIconName && (
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                {this.getIcon(this.props.leftIconName)}
              </span>
            </div>
          )}
          <input
            className='form-control'
            type={this.props.type}
            name={this.props.name}
            onChange={this.props.onChange}
            defaultValue={this.props.value}
            placeholder={this.props.placeholder}
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
        </div>
      </div>
    );
  }
}

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  leftIconName: PropTypes.string,
  rightIconName: PropTypes.string,
  onRightIconClick: PropTypes.func,
};

export default InputField;
