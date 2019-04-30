import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axiosOrg from 'axios';
import URL from 'url';

import ImageUploadSVG from '../../../images/imageUpload.svg';
import ToolbarLogo from '../../../images/logo.svg';

import axios from '../../../utils/axios';

import './account.scss';

class Account extends React.Component {
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
        this.props.updateUserProfileImage(imageURL);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleBlurbChange = (e) => {
    this.props.setUserBlurb(e.target.value);
  }

  handleBlurbBlur = (e) => {
    this.props.updateProfileBlurb(e.target.value);
  }

  render() {
    return (
      <div className="account__container">
        <div className="account__sub-container">
          <Dropzone
            onDrop={this.onDrop}
            className="account__image-container"
          >
            <img className="account__image" src={this.props.image} alt="profile" />
            <div className="account__image-upload">
              <ImageUploadSVG alt="upload profile image" />
            </div>
          </Dropzone>

          <div className="account__text-primary">
            {this.props.name}
          </div>
        </div>
        <div className="account__sub-container">
          <p className="account__text-secondary">
            Bio
          </p>
          <textarea
            className="account__text-blurb"
            type="text"
            value={this.props.blurb}
            rows={15}
            onChange={this.handleBlurbChange}
            onBlur={this.handleBlurbBlur}
          >
          </textarea>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  blurb: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  updateUserProfileImage: PropTypes.func.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  setUserBlurb: PropTypes.func.isRequired
};

export default Account;
