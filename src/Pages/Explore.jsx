import React from 'react';
import { debounce } from 'lodash';

import Icon from '../Components/Icon';
import { asPage } from '../Middlewares/asPage';
import InputField from '../Components/InputField';
import { getAxiosInstance } from '../Utils/axios';
import Pagination from '../Components/Pagination';
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
      search: '',
      loading: false,
      reconstruction: [],
      total: 0,
      page: 1,
    };

    this.searchHandler = this.searchHandler.bind(this);
    this.pageChangeHandler = this.pageChangeHandler.bind(this);

    // debounce
    this.delayHandler = debounce(this.delayHandler, 1000);
  }

  async fetchReconstructions() {
    try {
      this.setState({
        loading: true,
      });
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
      if (reconstruction.status === STATUS_OK) {
        this.setState({
          loading: false,
          reconstruction: reconstruction.data.data,
          total: reconstruction.data.total,
        });
      }
    } catch (err) {
      this.setState({
        reconstruction: [],
        loading: false,
      });
    }
  }

  componentDidMount() {
    this.fetchReconstructions();
  }

  delayHandler() {
    this.fetchReconstructions();
  }

  searchHandler(e) {
    this.setState(
      {
        search: e.target.value.trim(),
        total: 0,
        page: 1,
      },
      this.delayHandler()
    );
  }

  pageChangeHandler(value) {
    if (value == this.state.page) return;
    this.setState(
      {
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
            {this.state.search === '' ? (
              <h2>Recently constructed models for you</h2>
            ) : (
              <h2>Showing search results for {this.state.search}</h2>
            )}
            {this.state.loading ? (
              <div className='loading'>
                <Icon name='spinner' size='3x' spin={true} />
              </div>
            ) : (
              <div className='row'>{reconstructionCard}</div>
            )}
          </div>
          <div className='d-flex justify-content-center'>
            {this.state.total > NUM_RECONSTRUCTIONS && (
              <Pagination
                total={this.state.total}
                onPageChange={this.pageChangeHandler}
                page={this.state.page}
                pageSize={NUM_RECONSTRUCTIONS}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default asPage(Explore);
