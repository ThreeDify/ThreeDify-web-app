import PropTypes from 'prop-types';
import React, { Component } from 'react';

import '../Themes/inputfield.css';
import Icon from './Icon';

class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidePassword: true,
      password: '',
      changeIcon: true,
    };

    this.togglePasswordVisiblity = this.togglePasswordVisiblity.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  togglePasswordVisiblity() {
    this.setState({
      hidePassword: !this.state.hidePassword,
      changeIcon: !this.state.changeIcon,
    });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  render() {
    return (
      <div>
        <i className='icon-left'>
          <Icon size='xs' name={this.props.leftIconName} />
        </i>
        <i className='icon-right' onClick={this.togglePasswordVisiblity}>
          <Icon size='xs' name={this.state.changeIcon ? 'eye-slash' : 'eye'} />
        </i>
        <input
          className='inputfield'
          onChange={this.handlePasswordChange}
          placeholder={this.props.placeholder}
          type={this.state.hidePassword ? 'password' : 'text'}
        />
      </div>
    );
  }
}

InputField.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  leftIconName: PropTypes.string,
  placeholder: PropTypes.string,
  password: PropTypes.string,
};

export default InputField;
