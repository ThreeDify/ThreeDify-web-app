import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_URL } from './Constants/appUrls';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className='footer-wrap bg-dark text-white pt-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 mt-md-0 mt-3'>
              <h5 className='text-uppercase'>ThreeDify</h5>
              <p>Create 3D models from images.</p>
            </div>

            <hr className='clearfix w-100 d-md-none pb-3' />
            <div className='col-md-3 mb-md-0 mb-3'>
              <h5 className='text-uppercase'>Quick Links</h5>

              <ul className='list-unstyled'>
                <li>
                  <Link to={HOME_URL}>Home</Link>
                </li>
                <li>
                  <a href='#!'>About Us</a>
                </li>
                <li>
                  <a href='#!'>Contact Us</a>
                </li>
                <li>
                  <a href='#!'>Terms of Service</a>
                </li>
                <li>
                  <a href='#!'>Privacy</a>
                </li>
                <li>
                  <a href='#!'>Security</a>
                </li>
              </ul>
            </div>
            <div className='col-md-3 mb-md-0 mb-3'>
              <h5 className='text-uppercase'>Developers</h5>

              <ul className='list-unstyled'>
                <li>
                  <a href='#!'>API docs</a>
                </li>
                <li>
                  <a href='#!'>Apps</a>
                </li>
              </ul>
            </div>
          </div>

          <div className='text-center py-3 bg-black'>
            © 2020 Copyright <a href='#'>ThreeDify</a>
          </div>
        </div>
      </footer>
    );
  }
}
