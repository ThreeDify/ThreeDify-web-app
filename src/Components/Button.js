import React from 'react';
import '../Themes/Button.css'; 
export default class Button extends React.Component{
  render() {
    return(
      <button className="Button">{this.props.name} </button>
    );
  }         
}
