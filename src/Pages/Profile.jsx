import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Icon from '../Components/Icon';
import authenticate from '../Middlewares/authenticate';
import { getAuthenticatedInstance } from '../Utils/axios';
import { USER_RECONSTRUCTIONS_API } from '../Constants/apiUrls';
import ReconstructionCard from '../Components/ReconstructionCard';
import withAuthenticatedUser from '../Middlewares/withAuthenticatedUser';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 9;
const FILTERS = 'orderByCreatedAt';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reconstructions: [],
    };
  }

  async componentDidMount() {
    let axios = await getAuthenticatedInstance();
    try {
      let resp = await axios.get(
        USER_RECONSTRUCTIONS_API.replace('{userId}', this.props.user.id),
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
        reconstructions: resp.data.data,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    // return the first letter of name
    let getFirstLetter = (name) => name[0].toUpperCase();
    let firstName = this.props.user.first_name;
    const firstLetter = getFirstLetter(firstName);

    // card list
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

    // get full name
    const getFullName = () => {
      let user = this.props.user;
      return user.first_name + ' ' + user.last_name;
    };

    let fullName = getFullName();

    return (
      // maincontainer
      <div>
        {/* background holder*/}
        <div className='background-holder'></div>

        {/* profile section */}
        <div className='main-content container'>
          <div className='profile-section col-4'>
            {/* profile img */}
            <div className='user-profile-pic border border-primary rounded-circle text-center text-primary mb-2'>
              {firstLetter}
            </div>
            <h4 className='font-weight-medium'>{fullName}</h4>
            <p className='text-muted'>{this.props.user.username}</p>

            <button className='btn btn-primary col-8 mb-4'>Follow</button>

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

          {/* model section */}
          <div className='model-section col-8'>
            <h3 className='border-bottom  mt-2 pb-2'>Models</h3>
            {this.state.loading ? (
              <div className='loading'>
                <Icon name='spinner' size='3x' spin={true} />
              </div>
            ) : (
              <div className='d-flex flex-wrap'>{cards}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
};

export default withAuthenticatedUser(authenticate(Profile));
