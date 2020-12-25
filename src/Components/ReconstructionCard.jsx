import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../Components/Icon';
import { IMAGE_URL } from '../Constants/apiUrls';
import { PROFILE_URL } from '../Constants/appUrls';

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
    return (
      <div
        className={`reconstruction-card ${this.props.small ? 'reconstruction-card--small' : ''
        }`}
      >
        <img
          src={IMAGE_URL.replace(
            '{fileName}',
            this.props.reconstruction.images[0].fileName
          )}
          className='reconstruction-card-image'
          crossOrigin='anonymous'
        ></img>
        <div className='reconstruction-card-details'>
          <div className='card-details'>
            <div>
              <h5
                className={
                  !this.props.showCreator ? 'heading-creator-hidden' : ''
                }
              >
                <Link to={'/reconstructions/' + this.props.reconstruction.id}>
                  <span className='reconstruction-card-title'>
                    {this.props.reconstruction.name}
                  </span>
                </Link>
              </h5>
              {this.props.showCreator && (
                <p>
                  Created by{' '}
                  <Link
                    to={
                      PROFILE_URL +
                      '/' +
                      `${this.props.reconstruction.createdByUser.id}`
                    }
                  >
                    <span className='creator-user-name'>
                      {this.props.reconstruction.createdByUser.username}
                    </span>
                  </Link>
                </p>
              )}
            </div>
            <Icon
              className={this.state.liked ? 'icon-liked icon' : 'icon'}
              name={[this.state.liked ? 'fas' : 'far', 'heart']}
              size='2x'
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
  small: PropTypes.bool,
};

export default ReconstructionCard;
