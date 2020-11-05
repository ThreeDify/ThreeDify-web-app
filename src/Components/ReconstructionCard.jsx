import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Components/Icon';
import { IMAGE_URL } from '../constants/apiUrls';

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
      <div className='reconstruction-card'>
        <img
          src={IMAGE_URL + '/' + this.props.reconstruction.images[0].fileName}
          className='reconstruction-card-image'
        ></img>
        <div className='reconstruction-card-details'>
          <div className='card-details'>
            <div>
              <h5 className='reconstruction-card-title'>
                Project{this.props.reconstruction.name}
              </h5>
              {this.props.showCreator && (
                <p className='creator-user-name'>
                  Created by{this.props.reconstruction.createdByUser.username}
                </p>
              )}
            </div>
            <Icon
              className={this.state.liked ? 'icon-liked' : ''}
              name={['fas', 'heart']}
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
};

export default ReconstructionCard;
