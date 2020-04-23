import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faEnvelope, faKey, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faEnvelope, faKey, faEye, faEyeSlash)

export default class Icon extends React.Component{
  render() {
    return(
      <FontAwesomeIcon icon={this.props.name} />
    );
  }
}