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
import { Tabs, Tab, Pagination } from 'react-bootstrap';

const SORT_ORDER = 'DESC';
const NUM_RECONSTRUCTIONS = 6;

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
      key: 'all',
      total: 0,
      page: 1,
      hasPrevious: false,
      hasNext: false,
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.tabChangeHandler = this.tabChangeHandler.bind(this);
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
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

  async fetchModels() {
    this.setState({
      loading: true,
    });
    let axios = await getAuthenticatedInstance();
    try {
      let filters = this.state.key === 'all' ? '' : this.state.key;
      let resp = await axios.get(
        USER_RECONSTRUCTIONS_API.replace('{userId}', this.props.user.id),
        {
          params: {
            page: this.state.page,
            size: NUM_RECONSTRUCTIONS,
            order: SORT_ORDER,
            filters: 'orderByCreatedAt' + (filters ? `,${filters}` : ''),
          },
        }
      );
      this.setState({
        reconstructions: resp.data.data,
        loading: false,
        total: Math.ceil(resp.data.total / NUM_RECONSTRUCTIONS),
        hasPrevious: resp.data.hasPrevPage,
        hasNext: resp.data.hasNextPage,
      });
    } catch (err) {
      this.setState({
        reconstructions: [],
        total: 0,
        loading: false,
      });
    }
  }

  componentDidMount() {
    this.fetchModels();
  }

  tabChangeHandler(k) {
    if (k === this.state.key) return;
    this.setState(
      {
        key: k,
        reconstructions: [],
        total: 0,
      },
      () => this.fetchModels()
    );
  }

  pageChangeHandler(value) {
    if (value === this.state.page) return;
    this.setState(
      {
        page: value,
        reconstructions: [],
      },
      () => this.fetchModels()
    );
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

    // pagination
    let pageNumbers = [];

    for (var i = 1; i <= this.state.total; i++) {
      pageNumbers.push(i);
    }

    let pageList = pageNumbers.map((num) => (
      <Pagination.Item
        active={num === this.state.page}
        key={num}
        onClick={() => this.pageChangeHandler(num)}
      >
        {num}
      </Pagination.Item>
    ));

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
            <Tabs
              defaultActiveKey='all'
              activeKey={this.state.key}
              onSelect={this.tabChangeHandler}
            >
              {/* all tab */}
              <Tab eventKey='all' title='All'>
                {this.state.loading ? (
                  <div className='loading'>
                    <Icon name='spinner' size='3x' spin={true} />
                  </div>
                ) : (
                  <div className='d-flex flex-wrap'>{cards}</div>
                )}
              </Tab>

              {/* Completed tab */}
              <Tab eventKey='completed' title='Completed'>
                {this.state.loading ? (
                  <div className='loading'>
                    <Icon name='spinner' size='3x' spin={true} />
                  </div>
                ) : (
                  <div className='d-flex flex-wrap'>{cards}</div>
                )}
              </Tab>

              {/* Process Tab */}
              <Tab eventKey='inProgress' title='In Process'>
                {this.state.loading ? (
                  <div className='loading'>
                    <Icon name='spinner' size='3x' spin={true} />
                  </div>
                ) : (
                  <div className='d-flex flex-wrap'>{cards}</div>
                )}
              </Tab>

              {/* In Queue Tab */}
              <Tab eventKey='inQueue' title='In Queue'>
                {this.state.loading ? (
                  <div className='loading'>
                    <Icon name='spinner' size='3x' spin={true} />
                  </div>
                ) : (
                  <div className='d-flex flex-wrap'>{cards}</div>
                )}
              </Tab>
            </Tabs>

            {/* Pagination */}

            {pageList.length > 1 && (
              <Pagination>
                <Pagination.Prev
                  disabled={!this.state.hasPrevious}
                  onClick={() => {
                    this.pageChangeHandler(this.state.page - 1);
                  }}
                />
                {pageList}
                <Pagination.Next
                  disabled={!this.state.hasNext}
                  onClick={() => {
                    this.pageChangeHandler(this.state.page + 1);
                  }}
                />
              </Pagination>
            )}
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
