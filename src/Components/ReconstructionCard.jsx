import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Components/Icon';

class ReconstructionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.heartToggle = this.heartToggle.bind(this);
  }
  heartToggle() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }
  render() {
    return (
      <div className=' mt-5 color-box-com'>
        <div className='recent-model'></div>
        <div className='card_details'>
          <div>
            <h3>Project{this.props.project_title}</h3>
            <p className='created_user'>Created By{this.props.username}</p>
          </div>
          <Icon
            className={
              this.state.active ? 'heart_icon_active' : 'heart_icon_deactivate'
            }
            name={['fas', 'heart']}
            size='2x'
            onClick={this.heartToggle}
          />
        </div>
      </div>
    );
  }
}

ReconstructionCard.propTypes = {
  username: PropTypes.string,
  project_title: PropTypes.string,
};

export default ReconstructionCard;
