import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { asPage } from '../Middlewares/asPage';
import { InputField } from '../Components/InputField';
import FileSelector from '../Components/FileSelector';
import ImagePreview from '../Components/ImagePreview';
import authenticate from '../Middlewares/authenticate';
import { getAuthenticatedInstance } from '../Utils/axios';
import {
  RECONSTRUCTION_ADD_IMAGE_URL,
  RECONSTRUCTION_CREATE_URL,
} from '../Constants/apiUrls';
import withAuthenticatedUser from '../Middlewares/withAuthenticatedUser';

export class Reconstruction extends Component {
  constructor(props) {
    super(props);
    this.imageFormRef = React.createRef();
    this.creationFormRef = React.createRef();

    this.state = {
      reconstruction: {
        id: 0,
        name: '',
      },
      uploading: false,
      uploadStates: {},
      selectedImages: [],
      reconstructionCreated: false,
      creatingReconstruction: false,
    };

    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleImageFormSubmit = this.handleImageFormSubmit.bind(this);
    this.handleCreationFormSubmit = this.handleCreationFormSubmit.bind(this);
  }

  handleImageSelect(images) {
    this.setState({
      selectedImages: [
        ...this.state.selectedImages,
        ...images.filter((img) => {
          return (
            this.state.selectedImages.findIndex((sImg) => {
              return sImg.name === img.name;
            }) < 0
          );
        }),
      ],
    });
  }

  handleImageProgress(index) {
    return (evnt) => {
      this.setState({
        uploadStates: {
          ...this.state.uploadStates,
          [index]: {
            progress: Math.round((100 * evnt.loaded) / evnt.total),
          },
        },
      });
    };
  }

  async uploadImage(image, index) {
    this.setState(
      {
        uploadStates: {
          ...this.state.uploadStates,
          [index]: {
            progress: 0,
            error: false,
          },
        },
      },
      async () => {
        const axios = await getAuthenticatedInstance();
        const data = new FormData();
        data.append('image', image);

        const config = {
          onUploadProgress: this.handleImageProgress(index),
        };

        try {
          const resp = await axios.put(
            RECONSTRUCTION_ADD_IMAGE_URL.replace(
              '{reconstructionId}',
              this.state.reconstruction.id
            ),
            data,
            config
          );

          if (resp.status !== 200) {
            this.setState({
              uploadStates: {
                ...this.state.uploadStates,
                [index]: {
                  progress: 0,
                  error: true,
                },
              },
            });
          }
        } catch (err) {
          console.log(err);
          this.setState({
            uploadStates: {
              ...this.state.uploadStates,
              [index]: {
                progress: 0,
                error: true,
              },
            },
          });
        }
      }
    );
  }

  async handleImageFormSubmit(e) {
    e.preventDefault();

    if (this.state.selectedImages.length > 0) {
      this.setState(
        {
          uploading: true,
        },
        () => {
          this.state.selectedImages.forEach(this.uploadImage.bind(this));
        }
      );
    }
  }

  async handleCreationFormSubmit(e) {
    e.preventDefault();

    this.setState({
      creatingReconstruction: true,
    });

    const axios = await getAuthenticatedInstance();
    const data = new FormData(this.creationFormRef.current);
    try {
      const resp = await axios.post(RECONSTRUCTION_CREATE_URL, {
        reconstruction_name: data.get('reconstruction_name'),
      });

      if (resp.status === 200) {
        this.setState({
          reconstructionCreated: true,
          creatingReconstruction: false,
          reconstruction: resp.data.reconstruction,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      uploading,
      uploadStates,
      reconstruction,
      selectedImages,
      reconstructionCreated,
      creatingReconstruction,
    } = this.state;

    const btnContent =
      selectedImages.length > 0 ? (
        <React.Fragment>
          Select more image.{' '}
          <span className="badge badge-light">{selectedImages.length}</span>
        </React.Fragment>
      ) : null;

    const images = selectedImages.map((image, index) => {
      const state = uploadStates[index];

      return (
        <ImagePreview
          key={index}
          image={image}
          uploading={uploading}
          error={state && state.error}
          progress={state && state.progress}
        />
      );
    });

    const imageCount = this.state.selectedImages.length;

    let uploadCount = 0;

    for (let i = 0; i < imageCount; i++) {
      const progress = uploadStates[i] ? uploadStates[i].progress : 0;
      if (progress === 100) {
        uploadCount++;
      }
    }

    return (
      <div className="col-12 my-5">
        <h2 className="h2 font-weight-bold">Create a 3D model from images.</h2>
        <h5>Upload images of the object to reconstruct 3D model.</h5>

        <div className="form mt-3">
          {reconstructionCreated ? (
            <h3 className="h3 font-weight-bold">{reconstruction.name}</h3>
          ) : (
            <form
              ref={this.creationFormRef}
              onSubmit={this.handleCreationFormSubmit}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <label className="mb-3 mr-1">Name your reconstruction</label>
                  <InputField
                    type="text"
                    name="reconstruction_name"
                    placeholder="e.g. 3D Car"
                    required
                  ></InputField>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mb-3"
                  disabled={creatingReconstruction}
                >
                  Create Reconstruction
                </button>
              </div>
            </form>
          )}
        </div>

        {reconstructionCreated && (
          <div className="form mt-3">
            {!uploading ? (
              <form
                ref={this.imageFormRef}
                onSubmit={this.handleImageFormSubmit}
              >
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column mb-2">
                    <h4 className="h4">Upload Image</h4>
                    <small className="text-muted">
                      *more images makes 3D model better.
                    </small>
                  </div>
                  <div className="d-flex">
                    <FileSelector
                      multiple
                      disabled={uploading}
                      btnContent={btnContent}
                      onFileSelect={this.handleImageSelect}
                      acceptMimeType="image/png, image/jpeg"
                    ></FileSelector>
                    {selectedImages.length > 0 && (
                      <button
                        type="submit"
                        className="ml-2 btn btn-success"
                        disabled={uploading}
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              </form>
            ) : (
              <h4 className="h4">
                {uploadCount} out of {selectedImages.length} images uploaded.
              </h4>
            )}

            <div className="d-flex flex-wrap">{images}</div>
          </div>
        )}
      </div>
    );
  }
}

Reconstruction.propTypes = {
  user: PropTypes.object,
};

export default withAuthenticatedUser(authenticate(asPage(Reconstruction)));
