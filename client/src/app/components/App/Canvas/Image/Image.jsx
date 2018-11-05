import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React from 'react';
import axiosOrg from 'axios';
import URL from 'url';

import UploadSVG from '../../../../images/upload.svg';
import CloseSVG from '../../../../images/close.svg';

import axios from '../../../../utils/axios';
import * as WidgetSize from '../../../../constants/widgetConstants.js';
import FileUpload from '../../Shared/FileUpload/FileUpload.jsx';

require('./image.scss');

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      showUploadPopup: false
    };
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.onChange = (state) => { this.props.onChange(this.props.id, state); };
    this.setImageURL = url => this.props.setImageURL(this.props.id, url);
    this.onDrop = this.onDrop.bind(this);
    this.urlSubmitted = (event, value) => {
      this.props.setImageURL(this.props.id, value);
      event.preventDefault();
    };
  }

  onDrop(files) {
    const file = files[0];

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
        this.setImageURL(`https://s3.amazonaws.com/${process.env.S3_BUCKET}${url.pathname}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUploadPopupVisibility(value) {
    const newState = { ...this.state };

    newState.showUploadPopup = value;
    this.setState(newState);
  }

  handleOnClick() {
    console.log('poop');
    const newState = { ...this.state };

    return (
      this.imageWidgetRef && (
        this.imageWidgetRef.clientWidth < WidgetSize.IMAGE_RESPONSIVE_TRIGGER_WIDTH ||
        this.imageWidgetRef.clientHeight < WidgetSize.IMAGE_RESPONSIVE_TRIGGER_HEIGHT
      )
    ) &&
    this.setUploadPopupVisibility(!newState.showUploadPopup);
  }

  renderUploadPopup() {
    return (
      <FileUpload
        onDrop={this.onDrop}
        urlSubmitted={this.urlSubmitted}
        imageURL={this.props.imageURL}
        readOnly={this.props.preview}
      />
    );
  }

  //
  render() {
    return (
      <div>
        //
        {' '}
        <div
          ref={(ref) => { this.imageWidgetRef = ref; }}
          className={`
          image__container
          ${this.props.preview ? '' : 'image__container--edit'}
          ${this.props.name && this.imageWidgetRef && (
        this.imageWidgetRef.clientWidth < WidgetSize.IMAGE_RESPONSIVE_TRIGGER_WIDTH ||
            this.imageWidgetRef.clientHeight < WidgetSize.IMAGE_RESPONSIVE_TRIGGER_HEIGHT
      ) ? 'image__container--small' : ''}
          ${this.props.imageURL && 'image__container--exists'}
        `}
        >
          {!this.props.preview && !this.props.name && (
            <div className="image__login">
              {this.props.imageURL && <img className="element__image" src={this.props.imageURL} alt="" />}
              <div
                className={`${!this.props.imageURL ? 'image__content' : 'image__content image__replace-content'}`}
              >
                <div className="image__title">
                Log In to Upload Images
                </div>
              </div>
            </div>
          )}

          {!this.props.preview && this.props.name && (
            <div
              tabIndex="1"
              role="button"
              className={`image__login ${!this.props.imageURL ? 'image__content' : 'image__content image__replace-content'}`}
              onClick={() => { console.log('dfgdgf'); this.handleOnClick(); }}
              onKeyUp={() => this.handleOnClick()}
            >
              {this.renderUploadPopup()}
            </div>
          )}

          {this.props.imageURL &&
          <img className="element__image" src={this.props.imageURL} alt="" />
          }

          {this.state.showUploadPopup && (
            <div
              className='image__container image__container--popup'
              onBlur={() => this.setUploadPopupVisibility(false)}
            >
              {this.renderUploadPopup()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Image.propTypes = {
  id: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setImageURL: PropTypes.func.isRequired,
};

export default Image;
