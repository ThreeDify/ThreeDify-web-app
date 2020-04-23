import React from 'react';

import '../Themes/InputField.css';
import Icon from './Icon';

export default class InputField extends React.Component{
  render(){
    return (
      <div>
        <i><Icon name={this.props.iconName} /></i>
        <input placeholder={this.props.placeholder} type={this.props.type} />
      </div>
    );
  } 
}
