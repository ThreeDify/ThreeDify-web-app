import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../Components/Icon';
import { IMAGE_URL } from '../Constants/apiUrls';
import { PROFILE_URL, RECONSTRUCTION_DETAILS_URL } from '../Constants/appUrls';

const STATE_MAP = {
  COMPLETED: {
    icon: 'check-circle',
    cssClass: 'card-state--success',
  },
  FAILED: {
    icon: 'exclamation-circle',
    cssClass: 'card-state--error',
  },
  INPROGRESS: {
    icon: 'bolt',
    cssClass: 'card-state--info',
  },
  INQUEUE: {
    icon: 'clock',
    cssClass: 'card-state--alternate',
  },
};

class ReconstructionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
    this.likeToggle = this.likeToggle.bind(this);
  }

  likeToggle() {
    const currentState = this.state.liked;
    this.setState({ liked: !currentState });
  }

  render() {
    let stateMap = STATE_MAP[this.props.reconstruction.state];

    return (
      <div
        className={`reconstruction-card ${
          this.props.small ? 'reconstruction-card--small' : ''
        }`}
      >
        {this.props.showState && (
          <div
            className={`card-state ${stateMap.cssClass}`}
            title={this.props.reconstruction.state}
          >
            <Icon name={stateMap.icon} size="2x" />
          </div>
        )}
        {this.props.reconstruction.images.length > 0 && (
          <img
            src={IMAGE_URL.replace(
              '{fileName}',
              this.props.reconstruction.images[0].fileName
            )}
            className="reconstruction-card-image"
            crossOrigin="anonymous"
          ></img>
        )}
        <div className="reconstruction-card-details">
          <div className="card-details">
            <div>
              <h5
                className={
                  !this.props.showCreator ? 'heading-creator-hidden' : ''
                }
              >
                <Link
                  to={RECONSTRUCTION_DETAILS_URL.replace(
                    ':id',
                    this.props.reconstruction.id
                  )}
                >
                  <span className="reconstruction-card-title">
                    {this.props.reconstruction.name}
                  </span>
                </Link>
              </h5>
              {this.props.showCreator && (
                <p>
                  Created by{' '}
                  <Link
                    to={PROFILE_URL.replace(
                      ':id',
                      this.props.reconstruction.createdByUser.id
                    )}
                  >
                    <span className="creator-user-name">
                      {this.props.reconstruction.createdByUser.username}
                    </span>
                  </Link>
                </p>
              )}
            </div>
            <Icon
              className={this.state.liked ? 'icon-liked icon' : 'icon'}
              name={[this.state.liked ? 'fas' : 'far', 'heart']}
              size="2x"
              onClick={this.likeToggle}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReconstructionCard.propTypes = {
  reconstruction: PropTypes.object,
  showCreator: PropTypes.bool,
  showState: PropTypes.bool,
  small: PropTypes.bool,
};

export default ReconstructionCard;
