import React, { Component } from 'react';

import { asPage } from '../Middlewares/asPage';
import authenticate from '../Middlewares/authenticate';
import { getAuthenticatedInstance } from '../Utils/axios';

import { RECONSTRUCTION_CREATE_URL } from '../Constants/apiUrls';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_SIZE_ERROR,
  BACKEND_ERROR_MESSAGE,
} from '../Constants/messages';
import InputField from '../Components/InputField';

export class Reconstruction extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();

    this.state = {
      uploading: false,
      uploadSuccess: false,
      uploadFail: false,

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
    this.submitHandler = this.submitHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

  resetHandler() {
    this.form.current && this.form.current.reset();
    this.setState({
      uploading: false,
      uploadSuccess: false,
      uploadFail: false,
      backendError: false,
    });
  }

  async submitHandler(e) {
    e.preventDefault();
    const myData = new FormData(this.form.current);
    let imagesList = myData.getAll('images');

    // form file-size validation
    for (let key of imagesList) {
      if (key.size / 1000000 > 5) {
        this.setState({ uploadFail: true });
        return;
      }
    }

    this.setState({
      uploading: true,
      uploadFail: false,
    });

    let axios = await getAuthenticatedInstance();
    try {
      let resp = await axios.post(RECONSTRUCTION_CREATE_URL, myData);
      if (resp.status === 200) {
        this.setState({
          uploadSuccess: true,
          uploading: false,
        });
      }
    } catch (err) {
      if (err) {
        this.setState({
          backendError: true,
        });
      }
    }
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
            Create a 3D model from images.
          </h2>
          <p>Upload images of the object to reconstruct 3D model.</p>
        </div>

        {/* left-section */}
        <div className='col-6'>
          {/* form  */}
          <form
            ref={this.form}
            onSubmit={this.submitHandler}
            className={`form-group ${
              this.state.uploading || this.state.uploadSuccess ? 'd-none' : ''
            }`}
          >
            <div className='form-group mb-4'>
              <label htmlFor='title'>Project Title</label>
              <InputField
                name='reconstruction_name'
                type='text'
                placeholder='eg: 3D Bottles'
                required
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
                name='images'
                type='file'
                multiple
                accept='image/png, image/jpeg'
                required
              />
              <small className='form-text text-muted'>
                Select multiple files at once.
              </small>
            </div>

            <button
              disabled={this.state.uploading && true}
              type='submit'
              className='btn btn-primary my-2'
            >
              Upload
            </button>
          </form>

          {/* uploading spinner */}
          {this.state.uploading && (
            <span>
              <FontAwesomeIcon icon='spinner' pulse className='mx-5' />
              Uploading...
            </span>
          )}

          {/* Size error message */}
          {this.state.uploadFail && (
            <span className='alert alert-danger'>{IMAGE_SIZE_ERROR}</span>
          )}

          {/* Success Message */}
          {this.state.uploadSuccess && (
            <div>
              <span className='alert alert-success'>
                {IMAGE_UPLOAD_SUCCESS}
              </span>
              <button
                className='btn btn-success mx-2'
                onClick={this.resetHandler}
              >
                Reconstruct Again
              </button>
            </div>
          )}

          {/* Backend Error Message */}
          {this.state.backendError && (
            <div>
              <span className='alert alert-danger'>
                {BACKEND_ERROR_MESSAGE}
              </span>
              <button
                className='btn btn-danger mx-2'
                onClick={this.resetHandler}
              >
                Try Again
              </button>
            </div>
          )}
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
