import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React from 'react';
import axiosOrg from 'axios';
import URL from 'url';

import UploadSVG from '../../../../images/upload.svg';

import axios from '../../../../utils/axios';


require('./image.scss');

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
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
      const url = new URL(result.request.responseURL);
      this.setImageURL(`https://s3.amazonaws.com/${process.env.S3_BUCKET}/${url.pathname}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className={`image__container ${this.props.preview ? '' : 'image__container--edit'}`} >

        {!this.props.preview && !this.props.name &&
        <div className="image__login">
          {this.props.imageURL && <img className="element__image" src={this.props.imageURL} alt="" />}
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
        }
        {!this.props.preview && this.props.name &&
          <div className="image__login">
            {this.props.imageURL && <img className="element__image" src={this.props.imageURL} alt="" />}
            <div
              className={`${!this.props.imageURL ? 'image__content' : 'image__content image__replace-content'}`}
            >
              <Dropzone
                onDrop={this.onDrop}
                className="element-image"
              >
                <div className="image__title">
                Upload a file
                </div>
                <div className="image__drop">
                  <div className="image__svg">
                    <UploadSVG alt="upload image" />
                  </div>
                  <div className="image__svg">Drop a file or click to upload</div>
                </div>
              </Dropzone>
              <div className="image__title">
              or add a URL
              </div>
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
                  <input className="element__button" type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>

      }
        {this.props.preview && this.props.imageURL &&
          <img className="element__image" src={this.props.imageURL} alt="" />
        }
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
