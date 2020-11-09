import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { login } from '../Store/Actions/auth';
import { asPage } from '../Middlewares/asPage';
import { requestSignup } from '../Store/Actions/auth';
import Icon from '../Components/Icon';
import { EXPLORE_URL } from '../Constants/appUrls';
import TeamMemberCard from '../Components/TeamMemberCard';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className='home-page col-12'>
          <div className='d-flex align-items-center' height='90vh'>
            <div>
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
            <div>
              <img src='/public/images/kg.png' width='434px' height='auto' />
            </div>
          </div>
          <div className='mt-5'>
            <h1>Discover best from ThreeDify</h1>
            <div className='color-box d-flex justify-content-between mt-5'>
              <div className='bg-danger text-white'></div>
              <div className='bg-warning text-dark'></div>
              <div className='bg-info text-white'></div>
            </div>
            <div className='color-box d-flex justify-content-between mt-4'>
              <div className='bg-secondary text-white'></div>
              <div className='bg-success text-white'></div>
              <div className='bg-dark text-white'></div>
            </div>
            <p className='text-right'>
              {' '}
              <a href='#' className='link  '>
                more
              </a>
            </p>
          </div>
          <div className='our-team-section'>
            <h1>Our Team</h1>
            <div className='team-member row'>
              <TeamMemberCard
                imgLink='/public/images/anish.jpg'
                name='Anish Silwal Khatri'
                description='Anish Sliwal Khatri is a Programming Genius and currently working at Leapfrog Technology. He is pursuing 
                  his bachelors degree in CSIT at Bhaktapur Multiple Campus. He has a huge
                  interest on Football and Game Development. He is real blue supporter.'
                githubLink='https://www.github.com/silwalanish/'
                instagramLink='https://www.instagram.com/silwal_anish/'
                linkedinLink='https://www.linkedin.com/in/silwalanish/'
              />
              <TeamMemberCard
                imgLink='/public/images/daniel.jpg'
                name='Daniel Thapa Magar'
                description='Daniel Thapa Magar is a hard working Software Developer. He is currently pursuing
                  bachelors degree in CSIT at Bhaktapur Multiple Campus. He also has a creative knowlegde on video editing, graphic
                  design and many more. He loves to play music.'
                githubLink='https://www.github.com/danny237/'
                instagramLink='https://www.instagram.com/danielthapa23/'
                linkedinLink='https://www.linkedin.com/in/thapadaniel/'
              />

              <TeamMemberCard
                imgLink='/public/images/kishor.jpg'
                name='Kishor Ghising'
                description='Kishor Ghising is an inspiring UI/UX Engineer. He is currently working 
                  at prokura innovations and pursuing his bachelor’s degree in computer science and information 
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
                  in computer science and information technology at Bhaktapur Multiple Campus. He is a technology geek and also 
                  a genuine fan of Real Madrid.'
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
