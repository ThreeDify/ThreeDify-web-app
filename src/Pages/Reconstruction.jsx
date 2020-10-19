import React, { Component } from 'react';

import { authenticate } from '../Middlewares/authenticate';
import { asPage } from '../Middlewares/asPage';

import '../Themes/Reconstruction.css';

export class Reconstruction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      selectedFiles: [],
      images: [
        {
          img_url:
            'https://images.unsplash.com/photo-1580907044340-1ae4b9de54cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          id: 1,
        },
        {
          img_url:
            'https://images.unsplash.com/photo-1580907121036-3f1a27994ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          id: 2,
        },
        {
          img_url:
            'https://images.unsplash.com/photo-1580907044340-1ae4b9de54cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          id: 3,
        },
        {
          img_url:
            'https://images.unsplash.com/photo-1580907121036-3f1a27994ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          id: 4,
        },
        {
          img_url:
            'https://images.unsplash.com/photo-1580907044340-1ae4b9de54cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          id: 5,
        },
        {
          img_url:
            'https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
          id: 6,
        },
      ],
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  changeNameHandler(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onFileChange(e) {
    this.setState({
      selectedFiles: e.target.files[0],
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const myData = document.getElementById('form');
    let formData = new FormData(myData);
    console.log(formData);
  }

  render() {
    let imagesList = this.state.images.map((image) => {
      return (
        <div className='image-holder my-4' key={image.id}>
          <img src={image.img_url}></img>
        </div>
      );
    });
    return (
      <div className='row'>
        {/* Title */}
        <div className='col-12'>
          <h2 className='h2 font-weight-bold'>
            Start construct your 3D model.
          </h2>
          <p>Make some you upload images captured from same device.</p>
        </div>

        {/* left-section */}
        <div className='col-6'>
          {/* form  */}
          <form id='form' onSubmit={this.submitHandler} className='form-group'>
            <div className='form-group mb-4'>
              <label htmlFor='title'>Project Title</label>
              <input
                className='form-control col-4'
                id='title'
                name='reconstruction_image'
                type='text'
                onChange={this.changeNameHandler}
                value={this.state.value}
                placeholder='eg: 3D Bottles'
              />
            </div>

            <div className='form-group mb-2'>
              <label htmlFor='image-upload'>Upload Image</label>
              <small className='form-text text-muted'>
                *more images makes 3D model better.
              </small>
              <br />
              <input
                className='form-control-file'
                id='image-upload'
                name='images'
                type='file'
                onChange={this.onFileChange}
                multiple
              />
              <small className='form-text text-muted'>
                Select multiple files at once.
              </small>
            </div>

            <button type='submit' className='btn btn-primary my-2'>
              Start Reconstruction
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className='col-6'>
          <h3>Your Models</h3>
          <div className='row row-cols-3'>{imagesList}</div>
        </div>
      </div>
    );
  }
}

export default asPage(authenticate(Reconstruction));
