import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import React from 'react';
import axiosOrg from 'axios';
import URL from 'url';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageResizeModal from './ImageResizeModal.jsx';
import ImageEditToolbar from './ImageEditToolbar.jsx';
import { resetImageCrop, setImageURL, setImageCrop } from '../../../../action/editors.js';
import axios from '../../../../utils/axios';
import * as WidgetSize from '../../../../constants/widgetConstants.js';
import styles from '../../../../styles/sass/variables.scss';
import FileUpload from '../../Shared/FileUpload/FileUpload.jsx';
import Modal from '../../Modal/Modal.jsx';
import { loadMemoryConsumed } from '../../../../action/dashboard.js';

const MEDIA_FILE_REGEX = /.+\.(gif|jpg|jpeg|png|bmp)$/i;
const VIDEO_FILE_REGEX = /.+\.(mp4|avi|mov|mpg|wmv)$/i;

require('./image.scss');

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadMemoryConsumed();
    this.state = {
      url: '',
      isFileUploadOpen: false,
      isImageSmall: false,
      isFileUploading: false,
      isVideo: false,
      isImageResizerOpen: false
    };
    this.setImageCrop = (crop) => {
      this.props.setImageCrop(this.props.id, crop);
    };
    this.onDrop = this.onDrop.bind(this);
    this.urlSubmitted = (event, value) => {
      event.preventDefault();
      this.props.setImageURL(this.props.id, value);
      this.props.resetImageCrop(this.props.id);
      this.renderUploadPopup(false);
    };
    this.openImageResizer = () => this.setState({ isImageResizerOpen: true });
    this.closeImageResizer = () => this.setState({ isImageResizerOpen: false });
    this.openFileUpload = () => this.setState({ isFileUploadOpen: true });
    this.closeFileUpload = () => this.setState({ isFileUploadOpen: false });
  }

  componentDidMount() {
    this.imageSizeChanged();
    if (this.props.imageURL && this.props.imageURL.match(VIDEO_FILE_REGEX)) {
      this.setState({ isVideo: true });
    }
  }

  componentDidUpdate(prevProps) {
    this.imageSizeChanged();
    if (prevProps.imageURL !== this.props.imageURL) {
      if (this.props.imageURL && this.props.imageURL.match(VIDEO_FILE_REGEX)) {
        this.setState({ isVideo: true }); //eslint-disable-line
      }
    }
  }

  onDrop(files) {
    this.props.resetImageCrop(this.props.id);
    const file = files[0];
    if (file.name.match(MEDIA_FILE_REGEX)) {
      const memoryConsumedInMegaBytes = Math.ceil(this.props.memoryConsumed / 1000000);
      const memoryOfNewFile = Math.ceil(file.size / 1000000);
      if ((memoryConsumedInMegaBytes + memoryOfNewFile) < 1024) {
        this.startFileUpload();
        axios.get(`/upload/${this.props.name}/images`, {
          params: {
            filename: file.name,
            filetype: file.type
          }
        })
          .then((result) => {
            const signedUrl = result.data;
            const options = {
              headers: {
                'Content-Type': file.type
              }
            };

            return axiosOrg.put(signedUrl, file, options);
          })
          .then((result) => {
            const url = URL.parse(result.request.responseURL);
            this.setUploadPopupVisibility(false);
            this.props.setImageURL(this.props.id, `https://s3.amazonaws.com/${process.env.S3_BUCKET}${url.pathname}`);
            this.stopFileUpload();
            this.renderUploadPopup(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert('Cannot upload file as max memory consumed');
      }
    }
  }

  setUploadPopupVisibility(value) {
    const newState = { ...this.state };
    newState.isFileUploadOpen = value;
    this.setState(newState);
  }

  startFileUpload = () => {
    this.setState({ isFileUploading: true });
  }

  stopFileUpload = () => {
    this.setState({ isFileUploading: false });
  }

  imageExists = () => !!this.props.imageURL

  displayImage = () => this.props.imageURL && !this.state.isVideo

  displayVideo = () => this.props.imageURL && this.state.isVideo

  displayLoginScreen = () => !this.props.preview && !this.props.name

  displayImageUploadScreen = () => !this.props.preview && !this.imageExists()

  displayImageEditScreen = () => !this.props.preview && this.props.imageURL && !this.state.isVideo

  imageSizeChanged = () => {
    const isImageSmall = (this.imageWidgetRef.clientWidth < WidgetSize.IMAGE_RESPONSIVE_TRIGGER_WIDTH ||
    this.imageWidgetRef.clientHeight < WidgetSize.IMAGE_RESPONSIVE_TRIGGER_HEIGHT);
    if (this.state.isImageSmall !== isImageSmall) {
      this.setState({ isImageSmall });
    }
  }

  renderUploadPopup=() => (
    <Modal
      size="image"
      isOpen={this.state.isFileUploadOpen}
      closeModal={this.closeFileUpload}
    >
      <FileUpload
        onDrop={this.onDrop}
        urlSubmitted={this.urlSubmitted}
        imageURL={this.props.imageURL}
        container="image"
        isFileUploading={this.state.isFileUploading}
        isSmall={false}
      />
    </Modal>
  )

  renderImageEdit=() => (
    <Modal
      size="image"
      isOpen={this.state.isImageResizerOpen}
      closeModal={this.closeImageResizer}
    >
      <ImageResizeModal
        imageURL={this.props.imageURL}
        crop={this.props.crop ? this.props.crop : WidgetSize.DEFAULT_IMAGE_CROP}
        setImageCrop={this.setImageCrop}
        closeModal={this.closeImageResizer}
      />
    </Modal>
  )

  renderImage=() => {
    const crop = this.props.crop ? this.props.crop : WidgetSize.DEFAULT_IMAGE_CROP;
    const cropCss =
      `polygon(
      ${crop.x}% ${crop.y}%,
      ${crop.x + crop.width}% ${crop.y}%,
      ${crop.x + crop.width}% ${crop.y + crop.height}%,
      ${crop.x}% ${crop.y + crop.height}%)
      `;
    const translateX = 50 - crop.x;
    const translateY = 50 - crop.y;
    const scaleY = 100 / crop.height;
    const scaleX = 100 / crop.width;
    const cropAndScaleFromOriginTransform =
    `translate(-50%, -50%) scale(${scaleY}) translate(${translateX}%, ${translateY}%) `;
    const maxWidth = styles.totalWidth / scaleY * scaleX;
    return (
      <img
        className={
          `element__image
        ${this.props.crop ? '' : 'element__image-legacy'}`
        }
        src={this.props.imageURL}
        id={`ref-${this.props.id}`}
        ref={(input) => {
          this[`ref-${this.props.id}`] = input;
        }}
        alt=""
        data-test="image__main"
        style={{
          clipPath: cropCss,
          WebkitClipPath: cropCss,
          transform: cropAndScaleFromOriginTransform,
          WebkitTransform: cropAndScaleFromOriginTransform,
          maxWidth
        }}
      />
    );
  }

  renderVideo=() => (
    // eslint-disable-next-line
    <video width="100%" controls><source src={this.props.imageURL} />
        Your browser does not support HTML5 video.
    </video>
  )


  render() {
    return (
      <div>
        <div
          ref={(ref) => { this.imageWidgetRef = ref; }}
          data-test="image__container"
          className={`
          image__container
          ${this.props.preview ? '' : 'image__container--edit'}
          ${this.props.name && this.imageWidgetRef && (this.state.isImageSmall) ? 'image__container--small' : ''}
          ${this.props.imageURL && 'image__container--exists'}
          `}
        >
          {this.imageExists() && (
            <div>
              {this.displayImage() && (
                this.renderImage()
              )}
              {this.displayVideo() && (
                this.renderVideo()
              )}
              {!this.props.preview && (
                <ImageEditToolbar
                  name={this.props.name}
                  openFileUpload={this.openFileUpload}
                  openImageResizer={this.openImageResizer}
                  isImageSmall={this.state.isImageSmall}
                />
              )}
            </div>
          )}

          {this.displayImageUploadScreen() && (
            <FileUpload
              onDrop={this.onDrop}
              urlSubmitted={this.urlSubmitted}
              imageURL={this.props.imageURL}
              container="image"
              isFileUploading={this.state.isFileUploading}
              isSmall={this.state.isImageSmall}
            />
          )}

          {this.renderUploadPopup()}
          {this.renderImageEdit()}

        </div>
      </div>
    );
  }
}

Image.propTypes = {
  crop: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    w: PropTypes.number,
    h: PropTypes.number
  }).isRequired,
  id: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  resetImageCrop: PropTypes.func.isRequired,
  setImageCrop: PropTypes.func.isRequired,
  setImageURL: PropTypes.func.isRequired,
  loadMemoryConsumed: PropTypes.func.isRequired,
  memoryConsumed: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
    preview: state.page.preview,
    memoryConsumed: state.dashboard.memoryConsumed
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  resetImageCrop,
  setImageCrop,
  setImageURL,
  loadMemoryConsumed,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Image);
