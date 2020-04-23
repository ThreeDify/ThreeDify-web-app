import React from 'react';

import '../Themes/InputField.css';
import Icon from './Icon';

export default class InputField extends React.Component{
  render(){
    return (
      <div>
        <i className="icon-left"><Icon name={this.props.iconName} /></i>
        <input className="inputfield" placeholder={this.props.placeholder} type={this.props.type} />
      </div>
    );
  } 
}
