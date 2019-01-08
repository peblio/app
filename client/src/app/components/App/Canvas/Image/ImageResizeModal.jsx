import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

class ImageResizeModal extends React.Component {
  render() {
    return (
      <div
        className="image-resizer__container"
      >
        <ReactCrop
          src={this.props.imageURL}
          crop={this.props.crop}
          onChange={(crop) => {
            this.props.setImageCrop(crop);
          }}
        />
        <button
          className="image-edit-toolbar__button"
          onClick={this.props.closeModal}
        >
          Ok
        </button>
      </div>
    );
  }
}

ImageResizeModal.propTypes = {
  crop: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    w: PropTypes.number,
    h: PropTypes.number
  }).isRequired,
  imageURL: PropTypes.string.isRequired,
  setImageCrop: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ImageResizeModal;
