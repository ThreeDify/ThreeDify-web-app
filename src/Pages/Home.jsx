import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Icon from '../Components/Icon';
import { login } from '../Store/Actions/auth';
import { asPage } from '../Middlewares/asPage';
import { getAxiosInstance } from '../Utils/axios';
import { EXPLORE_URL } from '../Constants/appUrls';
import { STATUS_OK } from '../Constants/httpStatus';
import { requestSignup } from '../Store/Actions/auth';
import TeamMemberCard from '../Components/TeamMemberCard';
import { RECONSTRUCTION_FETCH_URL } from '../Constants/apiUrls';
import ReconstructionCard from '../Components/ReconstructionCard';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 6;
const FILTERS = 'orderByCreatedAt';

class Home extends React.Component {
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
              size=''
            />
          </i>
          Reconstructions not found!
        </p>
      );
    return (
      <React.Fragment>
        <div className='container'>
          <div className='hero-section'>
            <div className='threedify-about-section'>
              <h1>Construct your 3D object</h1>
              <p>
                ThreeDify gives a simple user-interface which allows any users
                with zero knowledge of 3D modeling to build their own 3D model.
              </p>
              {this.props.isLoggedIn ? (
                <Link to={EXPLORE_URL}>
                  <button type='button' className='btn btn-primary'>
                    Explore
                  </button>
                </Link>
              ) : (
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={this.props.signup}
                >
                  Signup
                </button>
              )}
            </div>
            <div className='about-section-image'>
              <img src='/public/images/kg.png' />
            </div>
          </div>
          <div className='discover-section'>
            <h1>Discover best from ThreeDify</h1>
            <div className='reconstruction-image-section'>
              {this.state.loading ? (
                <div className='loading'>
                  <Icon name='spinner' size='3x' spin={true} />
                </div>
              ) : (
                <div className='row'>{reconstructionCard}</div>
              )}
            </div>
          </div>
          <div className='our-team-section'>
            <h1>Our Team</h1>
            <div className='team-member'>
              <TeamMemberCard
                imgLink='/public/images/anish.jpg'
                name='Anish Silwal Khatri'
                description='Anish Sliwal Khatri is a Software Engineer at Leapfrog Technology. He is pursuing 
                  his bachelors degree in Bsc.CSIT. He has a huge
                  interest in Game Development. He is a massive football fan (supports Chelsea Football Club).'
                githubLink='https://www.github.com/silwalanish/'
                instagramLink='https://www.instagram.com/silwal_anish/'
                linkedinLink='https://www.linkedin.com/in/silwalanish/'
              />
              <TeamMemberCard
                imgLink='/public/images/daniel.jpg'
                name='Daniel Thapa Magar'
                description='Daniel Thapa Magar is a hard working Software Developer. He is currently pursuing his
                  bachelors degree in Bsc.CSIT at Bhaktapur Multiple Campus. He also has a creative knowlegde on video editing, graphic
                  design, and many more. He loves to play music.'
                githubLink='https://www.github.com/danny237/'
                instagramLink='https://www.instagram.com/danielthapa23/'
                linkedinLink='https://www.linkedin.com/in/thapadaniel/'
              />

              <TeamMemberCard
                imgLink='/public/images/kishor.jpg'
                name='Kishor Ghising'
                description='Kishor Ghising is a UI/UX Engineer at Prokura Innovations. He is currently 
                pursuing his bachelor’s degree in computer science and information 
                  technology from Bhaktapur Multiple Campus. He loves to describe himself as a design geek.
                  '
                githubLink='https://www.github.com/KGhising/'
                instagramLink='https://www.instagram.com/kghisinga/'
                linkedinLink='https://www.linkedin.com/in/kghisiga/'
              />

              <TeamMemberCard
                imgLink='/public/images/shrawan.jpg'
                name='Shrawan Ghimire'
                description='Shrawan Ghimire is a Web Developer and Technology Enthusiastic. He is pursuing his bachelors degree
                  in computer science and information technology at Bhaktapur Multiple Campus. He is a huge football fan and supports 
                  Football Club Real Madrid.'
                githubLink='https://www.github.com/SG-coder/'
                instagramLink='https://www.instagram.com/shrwan_ghimire/'
                linkedinLink='https://www.linkedin.com/in/shrawan-ghimire-36536b145/'
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  signup: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token) => dispatch(login(token)),
    signup: () => dispatch(requestSignup()),
  };
};

export default asPage(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
);
