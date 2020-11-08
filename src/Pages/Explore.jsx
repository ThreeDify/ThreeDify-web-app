import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../Components/InputField';
import { asPage } from '../Middlewares/asPage';
import ReconstructionCard from '../Components/ReconstructionCard';
import { getAxiosInstance } from '../Utils/axios';
import { RECONSTRUCTION_FETCH_URL } from '../Constants/apiUrls';
import {
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} from '../Constants/httpStatus';
import Icon from '../Components/Icon';

class Explore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reconstruction: [],
    };
    this.reconstructionCardFetchHandler = this.reconstructionCardFetchHandler.bind(
      this
    );
  }

  componentDidMount() {
    this.reconstructionCardFetchHandler();
  }

  async reconstructionCardFetchHandler() {
    let axios = getAxiosInstance();
    let reconstruction = await axios.get(RECONSTRUCTION_FETCH_URL);

    try {
      if (reconstruction.status === STATUS_OK) {
        this.setState({
          loading: false,
        });
        this.fetchReconstructionsSuccess(reconstruction.data);
      }
    } catch (err) {
      if (err) {
        this.setState({
          loading: true,
        });
      }
    }
  }

  fetchReconstructionsSuccess(reconstruction) {
    let sortedArray = reconstruction.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    let recentNineReconstructions = sortedArray.slice(0, 9);
    this.setState({
      reconstruction: recentNineReconstructions,
    });
  }

  render() {
    const reconstructionArray = this.state.reconstruction;
    const reconstructionCard = reconstructionArray.map(
      (reconstruction, index) => {
        return (
          <div
            key={index}
            className='col-lg-4 col-md-6 col-sm-12 reconstruction-card-container'
          >
            <ReconstructionCard reconstruction={reconstruction} />
          </div>
        );
      }
    );
    return (
      <React.Fragment>
        <div className='container'>
          <div className='search-section'>
            <div className='search-section-input'>
              <InputField
                required
                type='text'
                name='search'
                leftIconName='search'
                placeholder='Search eg. Bottles, monkey'
              />
              <p>
                You can search for publicly shared models and use for personal
                and business project for free.
              </p>
            </div>
          </div>
          <div className='search-display'>
            <h2>Recently constructed models for you</h2>
            {this.state.loading ? (
              <div className='loading'>
                <Icon name='spinner' size='3x' spin={true} />
              </div>
            ) : (
              <div className='row'>{reconstructionCard}</div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Explore.propTypes = {
  reconstruction: PropTypes.object,
  loading: PropTypes.bool,
};

export default asPage(Explore);
