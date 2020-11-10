import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { login } from '../Store/Actions/auth';
import { asPage } from '../Middlewares/asPage';
import { requestSignup } from '../Store/Actions/auth';
import Icon from '../Components/Icon';
import { EXPLORE_URL } from '../Constants/appUrls';
import ReconstructionCard from '../Components/ReconstructionCard';
import { getAxiosInstance } from '../Utils/axios';
import { RECONSTRUCTION_FETCH_URL } from '../Constants/apiUrls';
import { STATUS_OK } from '../Constants/httpStatus';

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
    let recentNineReconstructions = sortedArray.slice(0, 6);
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
            <ReconstructionCard
              showCreator={true}
              reconstruction={reconstruction}
            />
          </div>
        );
      }
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
            <p className='text-right'>
              {' '}
              <a href='#' className='more-link'>
                more
              </a>
            </p>
          </div>
          <div className='wrapper mt-5'>
            <h1 className='mt-5'>Our Team</h1>
            <div className='our_team mt-4'>
              <div className='team_member mr-3 mb-3'>
                <div className='member_img'>
                  <img src='/public/images/anish.jpg' />
                </div>
                <h3>Anish Silwal Khatri</h3>
                <div className='social_media mt-2'>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.instagram.com/silwal_anish/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'instagram']}
                      size='2x'
                    />
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.linkedin.com/in/silwalanish/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'linkedin']}
                      size='2x'
                    />
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.facebook.com/silwalanish'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'facebook']}
                      size='2x'
                    />
                  </a>
                </div>
              </div>
              <div className='team_member mr-3 mb-3'>
                <div className='member_img'>
                  <img src='/public/images/daniel.jpg' />
                </div>
                <h3>Daniel Thapa Magar</h3>
                <div className='social_media mt-2'>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.instagram.com/danielthapa23/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'instagram']}
                      size='2x'
                    />
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.linkedin.com/in/thapadaniel/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'linkedin']}
                      size='2x'
                    />
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.facebook.com/daniel.thapa.35'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'facebook']}
                      size='2x'
                    />
                  </a>
                </div>
              </div>
              <div className='team_member mr-3 mb-3'>
                <div className='member_img'>
                  <img src='/public/images/kishor.jpg' />
                </div>
                <h3>Kishor Ghising</h3>
                <div className='social_media mt-2'>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.instagram.com/kghisinga/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'instagram']}
                      size='2x'
                    />
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.linkedin.com/in/kishor-ghising-9b77611a4/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'linkedin']}
                      size='2x'
                    />
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.facebook.com/kghisinga/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'facebook']}
                      size='2x'
                    />
                  </a>
                </div>
              </div>
              <div className='team_member mb-3'>
                <div className='member_img'>
                  <img src='/public/images/shrawan.jpg' />
                </div>
                <h3>Shrawan Ghimire</h3>
                <div className='social_media mt-2'>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.instagram.com/shrwan_ghimire/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'instagram']}
                      size='2x'
                    />
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.linkedin.com/in/shrawan-ghimire-36536b145/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'linkedin']}
                      size='2x'
                    />
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.facebook.com/shrawan.ghimire.7/'
                  >
                    <Icon
                      className='social-media-icon'
                      name={['fab', 'facebook']}
                      size='2x'
                    />
                  </a>
                </div>
              </div>
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
