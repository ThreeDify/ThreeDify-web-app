import React, { Component } from 'react';
import { authenticate } from '../Middlewares/authenticate';
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
            'https://images.unsplash.com/photo-1580907121036-3f1a27994ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
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
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('files', this.state.selectedFiles);
    console.log(this.state.name);
    console.log(this.state.selectedFiles);
  }

  render() {
    let imagesList = this.state.images.map((image) => {
      return (
        <div className='image-holder' key={image.id}>
          <img src={image.img_url}></img>
        </div>
      );
    });
    return (
      <div className='container'>
        {/* header */}
        <div className='header'>
          <h2>Start construct your 3D model.</h2>
          <p>Make some you upload images captured from same device.</p>
        </div>

        {/* left-section */}
        <div className='left-section'>
          {/* form  */}
          <form id='form' onSubmit={this.submitHandler}>
            <label>Project Title</label>
            <br />
            <input
              id='reconstruction_image'
              name='reconstruction_image'
              type='text'
              onChange={this.changeNameHandler}
              value={this.state.value}
              placeholder='eg: 3D Bottles'
            />
            <br /> <br />
            <label>Upload Image</label>
            <p>*more images makes better 3D models.</p>
            <input
              type='file'
              onChange={this.onFileChange}
              multiple
              id='upload-images'
            />
            <br />
            <button type='submit'>Start Reconstruction</button>
          </form>
        </div>

        {/* Right Section */}
        <div className='right-section'>
          <h3>Your Models</h3>
          {imagesList}
        </div>
      </div>
    );
  }
}

export default authenticate(Reconstruction);
