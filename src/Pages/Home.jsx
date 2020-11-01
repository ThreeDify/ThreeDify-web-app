import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { login } from '../Store/Actions/auth';
import { asPage } from '../Middlewares/asPage';
import { requestSignup } from '../Store/Actions/auth';
import Icon from '../Components/Icon';
import { EXPLORE_URL } from '../Constants/appUrls';

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
                with no knowledge of 3D modeling to build their own 3D model.
              </p>
              {this.props.isLoggedIn ? (
                <span>
                  <Link to={EXPLORE_URL}>explore</Link>
                </span>
              ) : (
                <button
                  type='button'
                  className='btn btn btn-primary'
                  onClick={this.props.signup}
                >
                  signup
                </button>
              )}
            </div>
            <div>
              <img src='/public/images/kg.png' width='434px' height='auto' />
            </div>
          </div>
          <div className='mt-5'>
            <h1>Discover best for ThreeDify</h1>
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
          <div className='wrapper mt-5'>
            <h1 className='mt-5'>Our Team</h1>
            <div className='our_team mt-4'>
              <div className='team_member mr-3 mb-3'>
                <div className='member_img'>
                  <img src='/public/images/anish.jpg' />
                </div>
                <h3>Anish silwal khatri</h3>
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
                <h3>Daniel thapa magar</h3>
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
                <h3>Kishor ghising</h3>
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
                <h3>Shrawan ghimire</h3>
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
