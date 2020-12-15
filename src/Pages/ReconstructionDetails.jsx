import React from 'react';

import Icon from '../Components/Icon';
import { asPage } from '../Middlewares/asPage';
import { getAxiosInstance } from '../Utils/axios';
import { RECONSTRUCTION_DETAILS_FETCH_URL } from '../Constants/apiUrls';
import { IMAGE_URL } from '../Constants/apiUrls';

class ReconstructionDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      userInfo: {},
      images: {},
      projectTitle: '',
      loading: false,
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    let axios = await getAxiosInstance();
    try {
      let resp = await axios.get(
        RECONSTRUCTION_DETAILS_FETCH_URL.replace('{reconstructionId}', id)
      );
      console.log(resp.data);
      this.setState({
        loading: false,
        userInfo: resp.data.createdByUser,
        images: resp.data.images[0],
        projectTitle: resp.data.name,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className='reconstruction-main-container'>
        <div className='reconstruction-details-section'>
          <div className='reconstruction-main-section'>
            <div className='reconstruction-section'>
              <img
                src={IMAGE_URL.replace(
                  '{fileName}',
                  this.state.images.fileName
                )}
                alt='Reconstruction-details-image'
              />
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
                <Icon
                  className=''
                  name='share'
                  size='lg'
                  onClick={this.likeToggle}
                />
                <Icon
                  className=''
                  name='cloud-download-alt'
                  size='lg'
                  onClick={this.likeToggle}
                />
              </div>
            </div>
            <div className='reconstruction-creator-section'>
              <div className='creator-info'>
                <div className='creator-image'></div>
                <div className='created-by'>
                  <p>
                    Created by<strong> {this.state.userInfo.username}</strong>
                  </p>
                </div>
              </div>
              <div className='follow-button'>
                <button className='btn btn-primary'>Follow</button>
              </div>
            </div>
            <div className='reconstruction-used-image-section'>
              <h3>Images used to create reconstruction</h3>
            </div>
          </div>
          <div className='reconstruction-recommendation-section'>
            <h3>Recommendations</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default asPage(ReconstructionDetails);
