import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from '../Components/Icon';
import { getAxiosInstance } from '../Utils/axios';
import Pagination from '../Components/Pagination';
import { USER_RECONSTRUCTIONS_API } from '../Constants/apiUrls';
import ReconstructionCard from '../Components/ReconstructionCard';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 9;
const FILTERS = 'orderByCreatedAt';

export class Profile extends Component {
  constructor(props) {
    super(props);
    let match = this.props.match || {};

    this.state = {
      loading: true,
      reconstructions: [],
      userFirstName: '',
      userLastName: '',
      userName: '',
      total: 0,
      page: 1,
      userId: (match.params && match.params.id) || this.props.authUser.id,
    };

    this.pageChangeHandler = this.pageChangeHandler.bind(this);
  }

  pageChangeHandler(value) {
    if (value === this.state.page) return;
    this.setState(
      {
        page: value,
        reconstructions: [],
      },
      () => this.fetchUserInformation(this.state.userId)
    );
  }

  async componentDidMount() {
    if (this.state.userId) {
      this.fetchUserInformation(this.state.userId);
    }
  }

  componentDidUpdate() {
    let match = this.props.match || {};
    let id = (match.params && match.params.id) || this.props.authUser.id;
    if (this.state.userId != id) {
      this.fetchUserInformation(id);
    }
  }

  async fetchUserInformation(id) {
    let axios = await getAxiosInstance();
    try {
      let resp = await axios.get(
        USER_RECONSTRUCTIONS_API.replace('{userId}', id),
        {
          params: {
            page: this.state.page,
            filters: FILTERS,
            order: SORT_ORDER,
            size: NUM_RECONSTRUCTIONS,
          },
        }
      );

      this.setState({
        loading: false,
        reconstructions: resp.data.data,
        total: resp.data.total,
        userId: id,
        userFirstName: resp.data.data[0].createdByUser.firstName,
        userLastName: resp.data.data[0].createdByUser.lastName,
        userName: resp.data.data[0].createdByUser.username,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    let getFirstLetter = (name) => name && name[0].toUpperCase();
    let firstName = this.state.userFirstName;
    const firstLetter = getFirstLetter(firstName);

    const selectedList = this.state.reconstructions;
    let cards =
      selectedList.length > 0 ? (
        selectedList.map((reconstruction, index) => (
          <div key={index} className='m-2'>
            <ReconstructionCard reconstruction={reconstruction} small />
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

    const getFullName = () => {
      return this.state.userFirstName + ' ' + this.state.userLastName;
    };

    let fullName = getFullName();

    return (
      <div>
        {/* background holder*/}
        <div className='background-holder'></div>

        {/* profile section */}
        <div className='main-content container'>
          <div className='profile-section col-4'>
            {this.state.loading ? (
              <div className='loading'>
                <Icon name='spinner' size='3x' spin={true} />
              </div>
            ) : (
              <div>
                <div className='user-profile-pic border border-primary rounded-circle text-center text-primary mb-2'>
                  {firstLetter}
                </div>
                <h4 className='font-weight-medium'>{fullName}</h4>
                <p className='text-muted'>{this.state.userName}</p>
                {this.props.match &&
                  this.props.authUser.id != this.props.match.params.id &&
                  <button className='btn btn-primary col-8 mb-4'>
                    Follow
                  </button>
                }
                <div className='info col-8'>
                  <div className='d-flex'>
                    <p className='mr-auto'>Models</p>
                    <p className=''>10</p>
                  </div>
                  <div className='info-item d-flex'>
                    <p className='mr-auto'>Likes</p>
                    <p>50</p>
                  </div>
                  <div className='info-item d-flex'>
                    <p className='mr-auto'>Views</p>
                    <p>150</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* model section */}
          <div className='model-section col-8'>
            <h3 className='border-bottom  mt-2 pb-2'>Models</h3>
            {this.state.loading ? (
              <div className='loading'>
                <Icon name='spinner' size='3x' spin={true} />
              </div>
            ) : (
              <React.Fragment>
                <div className='d-flex flex-wrap'>{cards}</div>
                <div>{this.state.total > NUM_RECONSTRUCTIONS && (
                  <Pagination
                    total={this.state.total}
                    onPageChange={this.pageChangeHandler}
                    page={this.state.page}
                    pageSize={NUM_RECONSTRUCTIONS}
                  />
                )}</div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.object,
  authUser: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    authUser: state.user.me || {},
  };
};

export default connect(mapStateToProps, null)(Profile);
