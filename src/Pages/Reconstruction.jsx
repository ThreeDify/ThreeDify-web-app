import React, { Component } from 'react';

import withAuthenticatedUser from '../Middlewares/withAuthenticatedUser';
import authenticate from '../Middlewares/authenticate';
import { getAuthenticatedInstance } from '../Utils/axios';
import PropTypes from 'prop-types';
import {
  RECONSTRUCTION_CREATE_URL,
  USER_RECONSTRUCTIONS_API,
} from '../Constants/apiUrls';
import ReconstructionCard from '../Components/ReconstructionCard';
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
      reconstructions: [],
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

  // fetching model
  async componentDidMount() {
    console.log(this.props);

    let axios = await getAuthenticatedInstance();
    try {
      let resp = await axios.get(
        USER_RECONSTRUCTIONS_API.replace('{userId}', this.props.user.id)
      );
      const imagesList = resp.data;

      this.setState({
        reconstructions: imagesList.slice(0, 6),
      });
    } catch (err) {
      console.log(err);
    }
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

    // upload images
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
    const selectedList = this.state.reconstructions;
    let cards = selectedList.map((reconstruction, index) => (
      <div key={index} className='m-2'>
        <ReconstructionCard reconstruction={reconstruction} />
      </div>
    ));

    console.log(this.props.user);

    return (
      <div className='main-container col-12'>
        {/* Title */}
        <div className='col-12'>
          <h2 className='h2 font-weight-bold'>
            Create a 3D model from images.
          </h2>
          <p>Upload images of the object to reconstruct 3D model.</p>
        </div>

        {/* main content */}
        <div className='col-12 d-flex'>
          {/* left-section */}
          <div className='col-3 form p-4'>
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
                  className='fileField file-path form-control-file'
                  name='images'
                  type='file'
                  multiple
                  accept='image/png, image/jpeg'
                  aria-label='File browser example'
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
          <div className='ml-2 col-7'>
            <h2 className='text-center'>Your Models</h2>
            <hr />
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
              {cards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Reconstruction.propTypes = {
  user: PropTypes.object,
};

export default withAuthenticatedUser(authenticate(Reconstruction));
