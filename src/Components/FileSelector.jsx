import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FileSelector extends Component {
  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.openFileSelector = this.openFileSelector.bind(this);
  }

  openFileSelector() {
    this.fileInputRef.current.click();
  }

  handleChange() {
    if (this.props.onFileSelect) {
      this.props.onFileSelect(Array.from(this.fileInputRef.current.files));
      this.fileInputRef.current.value = '';
    }
  }

  render() {
    const {
      name,
      multiple,
      disabled,
      btnContent,
      acceptMimeType,
    } = this.props;

    return (
      <div>
        <input
          type="file"
          name={name}
          className="d-none"
          multiple={multiple}
          disabled={disabled}
          accept={acceptMimeType}
          ref={this.fileInputRef}
          onChange={this.handleChange}
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.openFileSelector}
          disabled={disabled}
        >
          {btnContent ? btnContent : 'Choose Image'}
        </button>
      </div>
    );
  }
}

FileSelector.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  btnContent: PropTypes.any,
  onFileSelect: PropTypes.func,
  acceptMimeType: PropTypes.string,
};
