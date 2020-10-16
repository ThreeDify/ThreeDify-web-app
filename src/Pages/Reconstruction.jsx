import React, { Component } from 'react';
import { authenticate } from '../Middlewares/authenticate';

export class Reconstruction extends Component {
  render() {
    return (
      <div className='container'>
        <div className='image-reconstruction'>
          <h3>Project Title</h3>
          <input
            type='text'
            name='recostruction_name'
            placeholder='eg: 3D bottles'
          />

          <h3>Upload Images</h3>
          <p>*more images are better to construct 3D models</p>

          <input type='file' multiple />
          <br />

          <input type='submit' value='Start Reconstruction' />
        </div>

        <div className='image-gallary'></div>
      </div>
    );
  }
}

export default authenticate(Reconstruction);
