import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Icon from '../Components/Icon';
import { getAxiosInstance } from '../Utils/axios';
import Pagination from '../Components/Pagination';
import { PAGE_NOT_FOUND } from '../Constants/appUrls';
import ReconstructionCard from '../Components/ReconstructionCard';
import { USER_PROFILE_URL, USER_RECONSTRUCTIONS_API } from '../Constants/apiUrls';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 9;
const FILTERS = 'orderByCreatedAt,completed';

export class Profile extends Component {
  constructor(props) {
    super(props);
    const match = this.props.match || {};

    this.state = {
      loading: true,
      reconstructions: [],
      user: {
        id: (match.params && match.params.id) || this.props.authUser.id,
        firstName: '',
        lastName: ''
      },
      total: 0,
      page: 1 
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
      () => this.fetchUserReconstruction()
    );
  }

  async componentDidMount() {
    if (this.state.user.id) {
      this.fetchUserInformation(this.state.user.id);
    }
  }

  componentDidUpdate() {
    const match = this.props.match || {};
    const userId = (match.params && match.params.id) || this.props.authUser.id;
    if (this.state.user.id != userId) {
      this.fetchUserInformation(userId);
    }
  }

  async fetchUserReconstruction() {
    const axios = await getAxiosInstance();

    try {
      let resp = await axios.get(
        USER_RECONSTRUCTIONS_API.replace('{userId}', this.state.user.id),
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
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  async fetchUserInformation(userId) {
    const axios = await getAxiosInstance();

    try {
      let resp = await axios.get(USER_PROFILE_URL.replace('{userId}', userId));

      this.setState({
        user: {
          id: resp.data.id,
          username: resp.data.username,
          firstName: resp.data.first_name,
          lastName: resp.data.last_name
        }
      }, () => {
        this.fetchUserReconstruction();
      });
    } catch (err) {
      this.props.history.push(PAGE_NOT_FOUND);
    }
  }

  render() {
    const {user} = this.state;

    let getFirstLetter = (name) => name && name[0].toUpperCase();
    let firstName = user.firstName;
    const firstLetter = getFirstLetter(firstName);

    const selectedList = this.state.reconstructions;
    let cards =
      selectedList.length > 0 ? (
        selectedList.map((reconstruction, index) => (
          <div key={index} className="m-2">
            <ReconstructionCard reconstruction={reconstruction} small />
          </div>
        ))
      ) : (
        <p className="reconstruction-not-found">
          <i>
            <Icon
              className="exclamation-circle"
              name={['fas', 'exclamation-circle']}
              size="1x"
            />
          </i>
          Reconstructions not found!
        </p>
      );

    const getFullName = () => {
      return this.state.user.firstName + ' ' + this.state.user.lastName;
    };

    let fullName = getFullName();

    return (
      <div>
        {/* background holder*/}
        <div className="background-holder"></div>

        {/* profile section */}
        <div className="main-content container">
          <div className="profile-section col-4">
            {this.state.loading ? (
              <div className="loading">
                <Icon name="spinner" size="3x" spin={true} />
              </div>
            ) : (
              <div>
                <div className="user-profile-pic border border-primary rounded-circle text-center text-primary mb-2">
                  {firstLetter}
                </div>
                <h4 className="font-weight-medium">{fullName}</h4>
                <p className="text-muted">{this.state.user.username}</p>
                {this.props.match &&
                  this.props.authUser.id != this.props.match.params.id && (
                  <button className="btn btn-primary col-8 mb-4">
                      Follow
                  </button>
                )}
                <div className="info col-8">
                  <div className="d-flex">
                    <p className="mr-auto">Models</p>
                    <p className="">10</p>
                  </div>
                  <div className="info-item d-flex">
                    <p className="mr-auto">Likes</p>
                    <p>50</p>
                  </div>
                  <div className="info-item d-flex">
                    <p className="mr-auto">Views</p>
                    <p>150</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* model section */}
          <div className="model-section col-8">
            <h3 className="border-bottom  mt-2 pb-2">Models</h3>
            {this.state.loading ? (
              <div className="loading">
                <Icon name="spinner" size="3x" spin={true} />
              </div>
            ) : (
              <React.Fragment>
                <div className="d-flex flex-wrap">{cards}</div>
                <div>
                  {this.state.total > NUM_RECONSTRUCTIONS && (
                    <Pagination
                      total={this.state.total}
                      onPageChange={this.pageChangeHandler}
                      page={this.state.page}
                      pageSize={NUM_RECONSTRUCTIONS}
                    />
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  authUser: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authUser: state.user.me || {},
  };
};

export default withRouter(connect(mapStateToProps, null)(Profile));
