import React from 'react';

import '../Themes/InputField.css';

const InputField = (props) => {
  return (
    <input placeholder={props.placeholder} type={props.type} />
  )
}
export default InputField;