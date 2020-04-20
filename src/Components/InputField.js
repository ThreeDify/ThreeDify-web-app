import React from 'react';

import '../Themes/InputField.css';

export default class InputField extends React.Component{
  render(){
    let placeholder = 'Full name';
    let type ='text';
    return (
      <div>
        <input placeholder={placeholder} type={type} />
      </div>
    );
  } 
}