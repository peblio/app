import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axiosOrg from 'axios';
import URL from 'url';

import ImageUploadSVG from '../../../images/imageUpload.svg';
import ToolbarLogo from '../../../images/logo.svg';

import axios from '../../../utils/axios';

require('./details.scss');

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    const file = files[0];

    axios.get(`/upload/${this.props.name}/profile`, {
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
        const imageURL = `https://s3.amazonaws.com/${process.env.S3_BUCKET}${url.pathname}`;
        this.props.setUserImage(imageURL);
        axios.post('/profile/save', {
          name: this.props.name,
          field: 'image',
          value: imageURL
        }).then(() => { console.log('saved'); })
          .catch(error => console.error(error));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveUserBlurb = (blurb) => {
    axios.post('/profile/save', {
      name: this.props.name,
      field: 'blurb',
      value: blurb
    }).then(() => { console.log('saved'); })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="details__content">
        <a className="details__link" href="/" target="_blank" rel="noopener noreferrer">
          <ToolbarLogo className="details__logo" alt="logo in toolbar" />
        </a>
        <div className="details__container">
          {this.props.isOwner && (
            <p className="details__welcome">
            Welcome
              {' '}
              {this.props.name}
              {' '}
! Feel free to change your profile image and description
            </p>
          )}
          {this.props.isOwner && (
            <Dropzone
              onDrop={this.onDrop}
              className="details__image-container"
            >

              <img className="details__image" src={this.props.image} alt="profile" />
              <div className="details__image-upload">
                <ImageUploadSVG alt="upload profile image" />
              </div>
            </Dropzone>
          )}
          {!this.props.isOwner && (
            <div
              className="details__image-container"
            >
              <img className="details__image" src={this.props.image} alt="profile" />
            </div>
          )}
          <div className="details__text-primary">
            {' '}
            {this.props.name}
            {' '}
          </div>

          <textarea
            className="details__text-secondary"
            type="text"
            value={this.props.blurb}
            rows={15}
            onChange={(e) => {
              this.props.setUserBlurb(e.target.value);
            }}
            onBlur={(e) => {
              this.saveUserBlurb(e.target.value);
            }}
            readOnly={!this.props.isOwner}
          >
          </textarea>
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  blurb: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  setUserBlurb: PropTypes.func.isRequired,
  setUserImage: PropTypes.func.isRequired
};

export default Details;
