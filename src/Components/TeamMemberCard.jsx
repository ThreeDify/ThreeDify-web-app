import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Components/Icon';

class TeamMemberCard extends React.Component {
  render() {
    return (
      <div className='team-member-card'>
        <div className='member-img'>
          <img src={this.props.imgLink} />
        </div>
        <h5>{this.props.name}</h5>
        <p>{this.props.description}</p>
        <div className='social-media'>
          <a target='_blank' rel='noreferrer' href={this.props.githubLink}>
            <Icon
              className='social-media-icon'
              name={['fab', 'github']}
              size='2x'
            />
          </a>
          <a target='_blank' rel='noreferrer' href={this.props.instagramLink}>
            <Icon
              className='social-media-icon'
              name={['fab', 'instagram']}
              size='2x'
            />
          </a>
          <a target='_blank' rel='noreferrer' href={this.props.linkedinLink}>
            <Icon
              className='social-media-icon'
              name={['fab', 'linkedin']}
              size='2x'
            />
          </a>
        </div>
      </div>
    );
  }
}

TeamMemberCard.propTypes = {
  imgLink: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  githubLink: PropTypes.string,
  instagramLink: PropTypes.string,
  linkedinLink: PropTypes.string,
};

export default TeamMemberCard;
