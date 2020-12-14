import React from 'react';

import Icon from '../Components/Icon';
import { asPage } from '../Middlewares/asPage';
import InputField from '../Components/InputField';
import { getAxiosInstance } from '../Utils/axios';
import { STATUS_OK } from '../Constants/httpStatus';
import { RECONSTRUCTION_FETCH_URL } from '../Constants/apiUrls';
import ReconstructionCard from '../Components/ReconstructionCard';
import Pagination from '../Components/Pagination';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 9;
const FILTERS = 'orderByCreatedAt';

class Explore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      loading: true,
      reconstruction: [],
      total: 0,
      page: 1,
      hasPrevious: false,
      hasNext: false,
    };

    this.searchHandler = this.searchHandler.bind(this);
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
  }

  componentDidMount() {
    this.fetchReconstructions();
  }

  async fetchReconstructions() {
    let axios = getAxiosInstance();
    let reconstruction = await axios.get(RECONSTRUCTION_FETCH_URL, {
      params: {
        q: this.state.search,
        page: this.state.page,
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
          total: Math.ceil(reconstruction.data.total / NUM_RECONSTRUCTIONS),
          hasPrevious: reconstruction.data.hasPrevPage,
          hasNext: reconstruction.data.hasNextPage,
        });
      }
    } catch (err) {
      if (err) {
        this.setState({
          loading: false,
        });
      }
    }
  }

  searchHandler(e) {
    this.setState(
      {
        search: e.target.value,
        loading: true,
        reconstruction: [],
        total: 0,
      },
      () => this.fetchReconstructions()
    );
  }

  pageChangeHandler(value) {
    if (value == this.state.page) return;
    this.setState(
      {
        loading: true,
        reconstruction: [],
        page: value,
      },
      () => this.fetchReconstructions()
    );
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
                value={this.state.search}
                onChange={this.searchHandler}
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
          <div className='search-display mb-2'>
            <h2>Recently constructed models for you</h2>
            {this.state.loading ? (
              <div className='loading'>
                <Icon name='spinner' size='3x' spin={true} />
              </div>
            ) : (
              <div className='row'>{reconstructionCard}</div>
            )}
          </div>
          {this.state.total > 1 && (
            <Pagination
              disablePrevious={!this.state.hasPrevious}
              disableNext={!this.state.hasNext}
              total={this.state.total}
              pageChangeHandler={this.pageChangeHandler}
              page={this.state.page}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default asPage(Explore);
