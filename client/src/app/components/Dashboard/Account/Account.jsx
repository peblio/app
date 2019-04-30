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
        this.props.updateProfileImage(imageURL);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleBlurbChange = (e) => {
    this.props.setProfileBlurb(e.target.value);
  }

  handleBlurbBlur = (e) => {
    this.props.updateProfileBlurb(e.target.value);
  }

  render() {
    return (
      <div className="details__content">
        <div className="details__container">
          <p className="details__welcome">
            {`Welcome ${this.props.name}! Feel free to change your profile image and description.`}
          </p>
          <Dropzone
            onDrop={this.onDrop}
            className="details__image-container"
          >
            <img className="details__image" src={this.props.image} alt="profile" />
            <div className="details__image-upload">
              <ImageUploadSVG alt="upload profile image" />
            </div>
          </Dropzone>

          <div className="details__text-primary">
            {this.props.name}
          </div>

          <textarea
            className="details__text-secondary"
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
  updateProfileImage: PropTypes.func.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  setProfileBlurb: PropTypes.func.isRequired
};

export default Account;
