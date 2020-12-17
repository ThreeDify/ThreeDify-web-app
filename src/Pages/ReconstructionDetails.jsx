import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Components/Icon';
import { asPage } from '../Middlewares/asPage';
import { getAuthenticatedInstance } from '../Utils/axios';
import {
  RECONSTRUCTION_DETAILS_FETCH_URL,
  USER_RECONSTRUCTIONS_API,
} from '../Constants/apiUrls';
import { IMAGE_URL } from '../Constants/apiUrls';
import ReconstructionCard from '../Components/ReconstructionCard';

const SORT_ORDER = 'AESC';
const NUM_RECONSTRUCTIONS = 4;
const FILTERS = 'orderByCreatedAt';

class ReconstructionDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      userInfo: {},
      images: [],
      projectTitle: '',
      loading: false,
      reconstructions: [],
      reconstructionId: this.props.match.params.id,
    };
    this.likeToggle = this.likeToggle.bind(this);
  }

  likeToggle() {
    const currentState = this.state.liked;
    this.setState({ liked: !currentState });
  }

  componentDidMount() {
    this.fetchReconstruction(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.state.reconstructionId != this.props.match.params.id) {
      this.fetchReconstruction(this.props.match.params.id);
    }
  }

  async fetchReconstruction(id) {
    let axios = await getAuthenticatedInstance();
    try {
      let resp = await axios.get(
        RECONSTRUCTION_DETAILS_FETCH_URL.replace('{reconstructionId}', id)
      );
      this.setState({
        reconstructionId: id,
        loading: false,
        userInfo: resp.data.createdByUser,
        images: resp.data.images,
        projectTitle: resp.data.name,
      });

      let userResp = await axios.get(
        USER_RECONSTRUCTIONS_API.replace(
          '{userId}',
          resp.data.createdByUser.id
        ),
        {
          params: {
            filters: FILTERS,
            order: SORT_ORDER,
            size: NUM_RECONSTRUCTIONS,
          },
        }
      );
      this.setState({
        loading: false,
        reconstructions: userResp.data.data,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    let getFirstLetter = (name) => name && name[0].toUpperCase();
    let firstName = this.state.userInfo.firstName;
    const firstLetter = getFirstLetter(firstName);

    const selectedList = this.state.reconstructions;
    let cards =
      selectedList.length > 0 ? (
        selectedList
          .filter(
            (reconstruction) => reconstruction.id != this.state.reconstructionId
          )
          .slice(0, 3)
          .map((reconstruction, index) => (
            <div key={index} className='m-2'>
              <ReconstructionCard
                reconstruction={reconstruction}
                small
                showCreator
              />
            </div>
          ))
      ) : (
        <p className='reconstruction-not-found'>
          <i>
            <Icon
              className='exclamation-circle'
              name={['fas', 'exclamation-circle']}
              size='1x'
            />
          </i>
          Reconstructions not found!
        </p>
      );

    let reconstructionImage = this.state.images;
    let images = reconstructionImage.map((image, index) => (
      <div key={index} className='reconstruction-image-section'>
        <img
          src={IMAGE_URL.replace('{fileName}', image.fileName)}
          alt='Reconstruction-image'
          crossOrigin='anonymous'
        />
      </div>
    ));

    return (
      <div className='reconstruction-main-container'>
        <div className='reconstruction-details-section'>
          <div className='reconstruction-main-section'>
            <div className='reconstruction-section'></div>
            <div className='reconstruction-project-title-section'>
              <h4>{this.state.projectTitle}</h4>
              <div className='interaction-section'>
                <Icon
                  className={this.state.liked ? 'icon-liked icon' : 'icon'}
                  name={[this.state.liked ? 'fas' : 'far', 'heart']}
                  size='lg'
                  onClick={this.likeToggle}
                />
                <Icon className='' name='share' size='lg' />
                <Icon className='' name='cloud-download-alt' size='lg' />
              </div>
            </div>
            <div className='reconstruction-creator-section'>
              <div className='creator-info'>
                <div className='creator-image'>{firstLetter}</div>
                <div className='created-by'>
                  <p>
                    Created by <strong>{this.state.userInfo.username}</strong>
                  </p>
                </div>
              </div>
              <div className='follow-button'>
                <button className='btn btn-primary'>Follow</button>
              </div>
            </div>
            <div className='reconstruction-used-image-section'>
              <h3>Images used to create reconstruction</h3>
              <div className='reconstruction-images'>{images}</div>
            </div>
          </div>
          <div className='reconstruction-recommendation-section'>
            <h3>Recommendations</h3>
            <div className='recommendation-reconstruction'>{cards}</div>
          </div>
        </div>
      </div>
    );
  }
}

ReconstructionDetails.propTypes = {
  match: PropTypes.object,
};

export default asPage(ReconstructionDetails);
