import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  RECONSTRUCTION_DETAILS_FETCH_URL,
  RECONSTRUCTION_OUTPUT_URL,
  USER_RECONSTRUCTIONS_API,
} from '../Constants/apiUrls';
import Icon from '../Components/Icon';
import { asPage } from '../Middlewares/asPage';
import PlyPlayer from '../Components/PlyPlayer';
import { IMAGE_URL } from '../Constants/apiUrls';
import { getAxiosInstance } from '../Utils/axios';
import Pagination from '../Components/Pagination';
import { PROFILE_URL } from '../Constants/appUrls';
import ReconstructionCard from '../Components/ReconstructionCard';

const SORT_ORDER = 'AESC';
const NUM_RECONSTRUCTIONS = 4;
const FILTERS = 'orderByCreatedAt';

const NUM_IMAGES = 12;

const RECONSTRUCTION_STATE_MAP = {
  'INQUEUE': 'in queue',
  'INPROGRESS': 'in progress',
  'COMPLETED': 'completed'
};

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
      imageCount: 0,
      imagePage: 1,
      reconstructionState: 'INQUEUE',
      reconstructionId: this.props.match.params.id,
    };

    this.likeToggle = this.likeToggle.bind(this);
    this.imagePageChange = this.imagePageChange.bind(this);
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

  imagePageChange(page) {
    this.setState({
      imagePage: page
    });
  }

  async fetchReconstruction(id) {
    let axios = await getAxiosInstance();
    try {
      let resp = await axios.get(
        RECONSTRUCTION_DETAILS_FETCH_URL.replace('{reconstructionId}', id)
      );
      this.setState({
        reconstructionId: id,
        loading: false,
        reconstructionState: resp.data.state,
        userInfo: resp.data.createdByUser,
        images: resp.data.images,
        imageCount: resp.data.images.length,
        imagePage: 1,
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

    const reconstructionImage = this.state.images.slice((this.state.imagePage - 1) * NUM_IMAGES, this.state.imagePage * NUM_IMAGES);
    const images = reconstructionImage.map((image, index) => (
      <div key={index} className='reconstruction-image-section'>
        <img
          src={IMAGE_URL.replace('{fileName}', image.fileName)}
          alt='Reconstruction-image'
          crossOrigin='anonymous'
        />
      </div>
    ));

    const reconstructionState = RECONSTRUCTION_STATE_MAP[this.state.reconstructionState];

    return (
      <div className='reconstruction-main-container'>
        <div className='reconstruction-details-section'>
          <div className='reconstruction-main-section'>
            <div className='reconstruction-section'>
              {this.state.reconstructionState === 'COMPLETED' ?
                <PlyPlayer url={RECONSTRUCTION_OUTPUT_URL.replace('{reconstructionId}', this.state.reconstructionId)} width={700} height={400} animate></PlyPlayer>
                :
                <div className='reconstruction-output-info'>
                  <div className='mb-2'><Icon name='exclamation-circle' size='3x'></Icon></div>
                  <h5>This reconstruction is still {reconstructionState}.</h5>
                </div>
              }
            </div>
            <div className='alert alert-primary my-2'>
              <Icon name='question-circle' size='1x'></Icon> Use WASD to move around. Click and drag model to rotate.
            </div>
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
                    Created by{' '}
                    <Link
                      to={
                        PROFILE_URL +
                        '/' +
                        `${this.state.userInfo.id}`
                      }
                    >
                      {this.state.userInfo.username}
                    </Link>
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
              {this.state.imageCount > NUM_IMAGES &&
                <Pagination
                  total={this.state.imageCount}
                  page={this.state.imagePage}
                  pageSize={NUM_IMAGES}
                  onPageChange={this.imagePageChange}>
                </Pagination>
              }
            </div>
          </div>
          <div className='reconstruction-recommendation-section'>
            <h3>More from this user.</h3>
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
