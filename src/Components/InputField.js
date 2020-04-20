import React from 'react';

import '../Themes/InputField.css';

export default class InputField extends React.Component{
  render(props){
    return (
      <input placeholder={props.placeholder} type={props.type} />
    );
  } 
}
