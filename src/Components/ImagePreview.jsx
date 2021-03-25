import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Icon from './Icon';

export default class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    this.imgRef.current.src = URL.createObjectURL(this.props.image);
  }

  render() {
    const { image, uploading, error, progress } = this.props;

    const overlayIcon = error ? (
      <div className="icon error" title="Error occurred while uploading.">
        <Icon icon={['fas', 'exclamation-circle']} size="3x"></Icon>
      </div>
    ) : progress === 100 ? (
      <div className="icon tick" title="File uploaded successfully.">
        <Icon icon={['fas', 'check']} size="3x"></Icon>
      </div>
    ) : uploading ? (
      <React.Fragment>
        <div className="icon spinning">
          <Icon icon={['fas', 'spinner']} size="3x" spin></Icon>
        </div>
        <div className="upload-progress">{progress || 0}%</div>
      </React.Fragment>
    ) : (
      ''
    );

    return (
      <div className="image-preview">
        <img className="img-fluid" ref={this.imgRef} alt={image.name} />
        <div className="label-cont">
          <span className="label">{image.name}</span>
        </div>
        <div className={'overlay' + (uploading ? ' uploading' : '')}>
          {overlayIcon}
        </div>
      </div>
    );
  }
}

ImagePreview.propTypes = {
  error: PropTypes.bool,
  uploading: PropTypes.bool,
  progress: PropTypes.number,
  image: PropTypes.objectOf(File),
};
