import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';

import Dropzone from 'react-dropzone';

import UploadSVG from '../../../../images/upload.svg';

class FileUpload extends React.Component {
  render() {
    return (
      <div>
        <div className="image__title">Upload a file</div>
        <Dropzone
          onDrop={(files) => { this.props.onDrop(files); }}
          className="element-image"
          disabled={this.props.isSmall}
        >
          <div className="image__drop">
            <div className="image__svg">
              <UploadSVG alt="upload image" />
            </div>
            <div className="image__svg--text">Drop a file or click to upload</div>
          </div>
        </Dropzone>
        {this.props.isFileUploading && (
          <ReactLoading
            className="editor-toolbar__image-upload-gif"
            height="20%"
            width="20%"
            color="#B1B1B1"
          />
        )}
        {this.props.container === 'image' && (
          <div>
            <div className="image__title">or add a URL</div>
            <div className="image__url">
              <form
                className="element-image__add-url"
                onSubmit={e => this.props.urlSubmitted(e, this.url.value)}
              >
                <label htmlFor="element-image-name" className="element-image__label">
                  <input
                    id="element-image-name"
                    className="element-image__input"
                    type="text"
                    ref={(element) => { this.url = element; }}
                    defaultValue={this.props.imageURL}
                    readOnly={this.props.preview}
                  />
                </label>
                <input className="element__button" type="submit" value="Upload New" />
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}


FileUpload.propTypes = {
  container: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  isFileUploading: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  urlSubmitted: PropTypes.func.isRequired,
};


export default FileUpload;
