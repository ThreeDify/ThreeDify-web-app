import React, { Component } from 'react';
import authenticate from '../Middlewares/authenticate';
import withAuthenticatedUser from '../Middlewares/withAuthenticatedUser';
import { getAuthenticatedInstance } from '../Utils/axios';
import ReconstructionCard from '../Components/ReconstructionCard';
import PropTypes from 'prop-types';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reconstructions: [],
    };
  }

  async componentDidMount() {
    let axios = await getAuthenticatedInstance();
    try {
      let resp = await axios.get(
        `https://threedify-api-staging.herokuapp.com/users/${this.props.user.id}/reconstructions`
      );
      const imagesList = resp.data;
      this.setState({
        reconstructions: imagesList.slice(0, 6),
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    // return the first letter of name
    let getFirstLetter = (name) => name[0].toUpperCase();
    let firstName = this.props.user.first_name;
    const firstLetter = getFirstLetter(firstName);

    // card list
    const selectedList = this.state.reconstructions;
    let cards = selectedList.map((reconstruction, index) => (
      <div key={index} className='m-2'>
        <ReconstructionCard reconstruction={reconstruction} />
      </div>
    ));

    return (
      <div className='col-12'>
        {/* background holder*/}
        <div className='backgroundHolder col-12'></div>

        {/* profile section */}
        <div className='mainContent'>
          <div className='profileSection'>
            {/* pforile img */}
            <div className='user-profile-pic border border-primary rounded-circle text-center text-primary'>
              {firstLetter}
            </div>
            <h1 className='font-weight-bold'>{this.props.user.first_name}</h1>
            <h3>{this.props.user.username}</h3>

            <button className='btn btn-primary col-8 my-4'>Follow</button>

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
          <div className='model-section ml-2'>
            <h2 className='ml-5'>Models</h2>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
              {cards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
};

export default authenticate(withAuthenticatedUser(Profile));
