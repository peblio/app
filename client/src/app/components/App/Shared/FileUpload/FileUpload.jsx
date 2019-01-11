import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';

import Dropzone from 'react-dropzone';
import Modal from '../../Modal/Modal.jsx';

import UploadSVG from '../../../../images/upload.svg';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToolbarVisible: false
    };
  }

  openToolbar = () => { this.setState({ isToolbarVisible: true }); };

  closeToolbar = () => { this.setState({ isToolbarVisible: false }); };

  renderContent = () => (
    <div>
      {!this.props.name && (
        <p className="image__upload-notice">
            Please Log In to Upload Images
        </p>
      )}
      {this.props.name && (
        <div
          className="image__upload-container"
          data-test="image__upload-container"
          ref={(input) => { this.fileUpload = input; }}
        >
          <div className="image__title">Upload a file</div>
          <Dropzone
            onDrop={(files) => { this.props.onDrop(files); }}
            className="element-image"
          >
            <div
              className="image__drop"
              data-test="image__drop"
            >
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
              <div
                className="image__url"
                data-test="image__url"
              >
                <form
                  className="element-image__add-url"
                  onSubmit={e => this.props.urlSubmitted(e, this.url.value)}
                >
                  <label htmlFor="element-image-name" className="element-image__label">
                    <input
                      id="element-image-name"
                      className="element-image__input"
                      data-test="image__url-input"
                      type="text"
                      ref={(element) => { this.url = element; }}
                      defaultValue={this.props.imageURL}
                      readOnly={this.props.preview}
                    />
                  </label>
                  <input
                    className="element__button"
                    type="submit"
                    value="Upload New"
                    data-test="image__upload"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  render() {
    return (
      <div>
        {this.props.isSmall && (
          <div>
            <button
              className="image-edit-toolbar__upload-button"
              onMouseDown={this.openToolbar}
              onKeyDown={this.openToolbar}
            >
              <UploadSVG alt="upload profile image" />
            </button>
            {this.state.isToolbarVisible && (
              <Modal
                size="image"
                isOpen={this.state.isToolbarVisible}
                closeModal={this.closeToolbar}
              >
                {this.renderContent()}
              </Modal>
            )}
          </div>
        )}
        {!this.props.isSmall && (
          <div>
            {this.renderContent()}
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
  name: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  urlSubmitted: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    name: state.user.name,
    preview: state.page.preview
  };
}

export default connect(mapStateToProps, null)(FileUpload);
