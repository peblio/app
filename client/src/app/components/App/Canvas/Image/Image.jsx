import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React from 'react';
import axiosOrg from 'axios';
import URL from 'url';

import UploadSVG from '../../../../images/upload.svg';
import CloseSVG from '../../../../images/close.svg';

import axios from '../../../../utils/axios';


require('./image.scss');

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      showUpload: false
    };
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.onChange = (state) => { this.props.onChange(this.props.id, state); };
    this.setImageURL = url => this.props.setImageURL(this.props.id, url);
    this.onDrop = this.onDrop.bind(this);
    this.urlSubmitted = (event) => {
      this.props.setImageURL(this.props.id, this.url.value);
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

  onClick() {
    let newState = { ...this.state };

    this.setUploadPopupVisibility(!newState.showUpload);
  }

  setUploadPopupVisibility(value) {
    let newState = { ...this.state };

    newState.showUpload = value;
    this.setState(newState);
  }

  renderUpload() {
    return !this.props.preview && this.props.name && (
      <div
        className={`image__popup ${this.state.showUpload ? 'visible' : ''}`}
        onMouseEnter={() => this.setUploadPopupVisibility(true)}
      >
        <div className="image__content">
          <CloseSVG className="upload__close" onClick={() =>this.setUploadPopupVisibility(false)} />

          <Dropzone
            onDrop={this.onDrop}
            className="element-image"
          >
            <div className="image__drop">
              <div className="image__svg">
                <UploadSVG alt="upload image" />
              </div>
            </div>
          </Dropzone>
          <div className="image__url">

            <form className="element-image__add-url" onSubmit={this.urlSubmitted.bind(this)}>
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
              <input className="element__button" type="submit" value="Upload" />
            </form>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={`image__container ${this.props.preview ? '' : 'image__container--edit'}`}>

        {!this.props.preview && !this.props.name && (
          <div className="image__login">
            {/*this.props.imageURL && <img className="element__image" src={this.props.imageURL} alt="" />*/}
            <div
              className={`${!this.props.imageURL ? 'image__content' : 'image__content image__replace-content'}`}
            >
              <div className="image__title">
                Please Log In to Upload Images
              </div>
              <div className="image__svg">
                <UploadSVG alt="upload image" />
              </div>
            </div>
          </div>
        )}

        {!this.props.preview &&
        <div
          className="image__login"
          onClick={() => this.onClick()}
          onBlur={() => this.setUploadPopupVisibility(false)}
        >
          {this.props.imageURL && <img className="element__image" src={this.props.imageURL} alt="" />}
          <div
            className={`${!this.props.imageURL ? 'image__content' : 'image__content image__replace-content'}`}
          >
            <div className="image__drop_default">
              <div className="image__svg">
                <UploadSVG alt="upload image" />
              </div>
            </div>
          </div>
        </div>
        }

        {this.props.preview && this.props.imageURL &&
          <img className="element__image" src={this.props.imageURL} alt="" />
        }

        {this.renderUpload()}
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
