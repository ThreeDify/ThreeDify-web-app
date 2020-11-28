import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  RECONSTRUCTION_CREATE_URL,
  USER_RECONSTRUCTIONS_API,
} from '../Constants/apiUrls';
import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_SIZE_ERROR,
  BACKEND_ERROR_MESSAGE,
} from '../Constants/messages';
import Icon from '../Components/Icon';
import { asPage } from '../Middlewares/asPage';
import InputField from '../Components/InputField';
import authenticate from '../Middlewares/authenticate';
import { getAuthenticatedInstance } from '../Utils/axios';
import ReconstructionCard from '../Components/ReconstructionCard';
import withAuthenticatedUser from '../Middlewares/withAuthenticatedUser';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 6;
const FILTERS = 'orderByCreatedAt';

export class Reconstruction extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();

    this.state = {
      uploading: false,
      uploadSuccess: false,
      uploadFail: false,
      loading: true,
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

  async componentDidMount() {
    let axios = await getAuthenticatedInstance();
    try {
      let resp = await axios.get(
        USER_RECONSTRUCTIONS_API.replace('{userId}', this.props.user.id),
        {
          params: {
            filters: FILTERS,
            order: SORT_ORDER,
            size: NUM_RECONSTRUCTIONS,
          },
        }
      );

      this.setState({
        reconstructions: resp.data.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
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
    let cards =
      selectedList.length > 0 ? (
        selectedList.map((reconstruction, index) => (
          <div key={index} className='m-2'>
            <ReconstructionCard reconstruction={reconstruction} small />
          </div>
        ))
      ) : (
        <p className='reconstruction-not-found'>
          <i>
            <Icon
              className='exclamation-circle'
              name={['fas', 'exclamation-circle']}
              size='1x'
            />
          </i>
          Reconstructions not found!
        </p>
      );

    return (
      <div className='row'>
        {/* Title */}
        <div className='col-12 my-5'>
          <h2 className='h2 font-weight-bold'>
            Create a 3D model from images.
          </h2>
          <h5>Upload images of the object to reconstruct 3D model.</h5>
        </div>

        {/* main content */}
        <div className='col-12 d-flex'>
          {/* left-section */}
          <div className='form col-4'>
            {/* form  */}
            <form
              ref={this.form}
              onSubmit={this.submitHandler}
              className={`form-group ${
                this.state.uploading || this.state.uploadSuccess ? 'd-none' : ''
              }`}
            >
              <div className='form-group'>
                <label htmlFor='title'>Project Title</label>
                <InputField
                  name='reconstruction_name'
                  type='text'
                  placeholder='eg: 3D Bottles'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='image-upload'>Upload Image</label>
                <small className='form-text text-muted upload-image-message'>
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
                className='btn btn-primary upload-button'
              >
                Upload
              </button>
            </form>

            {/* uploading spinner */}
            {this.state.uploading && (
              <span>
                <Icon name='spinner' size='3x' spin={true} />
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
                  className='btn btn-success reconstruction-again-button'
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
                  className='btn btn-danger reconstruction-again-button'
                  onClick={this.resetHandler}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className='col-8'>
            <nav>
              <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                <a
                  className='nav-item nav-link active'
                  id='nav-all-tab'
                  data-toggle='tab'
                  href='#nav-all'
                  role='tab'
                  aria-controls='nav-all'
                  aria-selected='true'
                >
                  All
                </a>
                <a
                  className='nav-item nav-link'
                  id='nav-completed-tab'
                  data-toggle='tab'
                  href='#nav-completed'
                  role='tab'
                  aria-controls='nav-completed'
                  aria-selected='true'
                >
                  Completed
                </a>
                <a
                  className='nav-item nav-link'
                  id='nav-process-tab'
                  data-toggle='tab'
                  href='#nav-process'
                  role='tab'
                  aria-controls='nav-process'
                  aria-selected='false'
                >
                  In Process
                </a>
                <a
                  className='nav-item nav-link'
                  id='nav-queue-tab'
                  data-toggle='tab'
                  href='#nav-queue'
                  role='tab'
                  aria-controls='nav-queue'
                  aria-selected='false'
                >
                  In Queue
                </a>
              </div>
            </nav>
            <div className='tab-content' id='nav-tabContent'>
              {/* all tab */}
              <div
                className='tab-pane fade show active'
                id='nav-all'
                role='tabpanel'
                aria-labelledby='nav-all-tab'
              >
                {this.state.loading ? (
                  <div className='loading'>
                    <Icon name='spinner' size='3x' spin={true} />
                  </div>
                ) : (
                  <div className='d-flex flex-wrap'>{cards}</div>
                )}
              </div>

              {/* completed tab */}
              <div
                className='tab-pane fade'
                id='nav-completed'
                role='tabpanel'
                aria-labelledby='nav-completed-tab'
              >
                <p>Completed models appears here.</p>
              </div>

              {/* Process tab */}
              <div
                className='tab-pane fade'
                id='nav-process'
                role='tabpanel'
                aria-labelledby='nav-process-tab'
              >
                <p>No models are in process! </p>
              </div>

              {/* Queue Tab */}
              <div
                className='tab-pane fade'
                id='nav-queue'
                role='tabpanel'
                aria-labelledby='nav-queue-tab'
              >
                <p>No models are in queue!</p>
              </div>
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

export default withAuthenticatedUser(authenticate(asPage(Reconstruction)));
