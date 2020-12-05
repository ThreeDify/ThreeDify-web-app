import React from 'react';

import Icon from '../Components/Icon';
import { asPage } from '../Middlewares/asPage';
import InputField from '../Components/InputField';
import { getAxiosInstance } from '../Utils/axios';
import { STATUS_OK } from '../Constants/httpStatus';
import { RECONSTRUCTION_FETCH_URL } from '../Constants/apiUrls';
import ReconstructionCard from '../Components/ReconstructionCard';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 9;
const FILTERS = 'orderByCreatedAt';

class Explore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reconstruction: [],
    };
  }

  componentDidMount() {
    this.fetchReconstructions();
  }

  async fetchReconstructions() {
    let axios = getAxiosInstance();
    let reconstruction = await axios.get(RECONSTRUCTION_FETCH_URL, {
      params: {
        filters: FILTERS,
        order: SORT_ORDER,
        size: NUM_RECONSTRUCTIONS,
      },
    });

    try {
      if (reconstruction.status === STATUS_OK) {
        this.setState({
          loading: false,
          reconstruction: reconstruction.data.data,
        });
      }
    } catch (err) {
      if (err) {
        this.setState({
          loading: true,
        });
      }
    }
  }

  render() {
    const reconstructionArray = this.state.reconstruction;
    const reconstructionCard =
      reconstructionArray.length > 0 ? (
        reconstructionArray.map((reconstruction, index) => {
          return (
            <div
              key={index}
              className='col-lg-4 col-md-6 col-sm-12 reconstruction-card-container'
            >
              <ReconstructionCard
                showCreator={true}
                reconstruction={reconstruction}
              />
            </div>
          );
        })
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

export default asPage(Explore);
