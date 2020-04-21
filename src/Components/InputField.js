import React from 'react';

import '../Themes/InputField.css';

export default class InputField extends React.Component{
  render(){
    return (
      <input placeholder={this.props.placeholder} type={this.props.type} />
    );
  } 
}
