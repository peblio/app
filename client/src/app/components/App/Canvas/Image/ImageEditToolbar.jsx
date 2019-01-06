import PropTypes from 'prop-types';
import React from 'react';
import UploadSVG from '../../../../images/upload.svg';

require('./image.scss');


class ImageEditToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToolbarVisible: false
    };
  }

  openToolbar = () => {
    this.setState({ isToolbarVisible: true });
    this.modal.focus();
  };

  closeToolbar = () => { this.setState({ isToolbarVisible: false }); };

  renderContent=() => (
    <div>
      {!this.props.name && (
        <p className="image__upload-notice">
          Log in to upload or edit images
        </p>
      )}
      {this.props.name && (
        <div>
          <button
            onMouseDown={this.props.openFileUpload}
            onKeyDown={this.props.openFileUpload}
            className="image-edit-toolbar__button"
          >
            Upload new
          </button>
          <button
            onMouseDown={this.props.openImageResizer}
            onKeyDown={this.props.openImageResizer}
            className="image-edit-toolbar__button"
          >
            Edit
          </button>
        </div>
      )
      }
    </div>
  )

  render() {
    return (
      <div>
        {this.props.isImageSmall && (
          <div
            ref={(element) => { this.modal = element; }}
            onBlur={() => {
              setTimeout(() => {
                this.closeToolbar();
              }, 50);
            }}
          >
            <button
              className="image-edit-toolbar__upload-button"
              onMouseDown={this.openToolbar}
              onKeyDown={this.openToolbar}
            >
              <UploadSVG alt="upload profile image" />
            </button>
            {this.state.isToolbarVisible && (
              <div
                className="image-edit-toolbar__pop-up"
              >
                {this.renderContent()}
              </div>
            )}
          </div>
        )}
        {!this.props.isImageSmall && (
          <div
            className="image-edit-toolbar__container"
          >
            {this.renderContent()}
          </div>
        )}

      </div>
    );
  }
}

ImageEditToolbar.propTypes = {
  isImageSmall: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openFileUpload: PropTypes.func.isRequired,
  openImageResizer: PropTypes.func.isRequired
};
export default ImageEditToolbar;
