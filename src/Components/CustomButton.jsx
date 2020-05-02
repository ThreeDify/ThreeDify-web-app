import React from 'react';
import '../Themes/CustomButton.css'; 
export default class Button extends React.Component{
  render() {
    return(
      <button onClick="" className="button" type={this.props.type}>{this.props.name}</button>
    );
  }         
}
