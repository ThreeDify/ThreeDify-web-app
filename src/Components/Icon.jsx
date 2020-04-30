import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faKey,
  faEye,
  faEyeSlash,
  faExclamationCircle,
  faTimes,
  faEllipsisV,
  faSearch,
  faBell,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faChartBar,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faUser,
  faEnvelope,
  faKey,
  faEye,
  faEyeSlash,
  faExclamationCircle,
  faTimes,
  faEllipsisV,
  faSearch,
  faBell,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faChartBar,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faHeart
);

class Icon extends Component {
  render() {
    return <FontAwesomeIcon icon={this.props.name} size={this.props.size} />;
  }
}

export default Icon;
