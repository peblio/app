import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import ImageUploadSVG from '../../../images/imageUpload.svg';
import ToolbarLogo from '../../../images/logo.svg';

import axios from '../../../utils/axios';

require('./details.scss');
const upload = require('superagent');

class Details extends React.Component {

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    upload.post(`/upload/${this.props.name}/profile`)
      .attach('uploadImageFile', file[0])
      .end((err, res) => {
        if (err) console.log(err);
        const imageName = res.text.replace(/\s/g, '+');
        const imageURL = `https://s3.amazonaws.com/${process.env.S3_BUCKET}/${imageName}`;
        this.props.setUserImage(imageURL);
        axios.post('/profile/save', {
          name: this.props.name,
          field: 'image',
          value: imageURL
        }).then(() => { console.log('saved'); })
          .catch(error => console.error(error));
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
          {this.props.isOwner &&
            <p className="details__welcome">
            Welcome {this.props.name} ! Feel free to change your profile image and description
            </p>
          }
          {this.props.isOwner &&
          <Dropzone
            onDrop={this.onDrop}
            className="details__image-container"
          >

            <img className="details__image" src={this.props.image} alt="profile" />
            <div className="details__image-upload">
              <ImageUploadSVG alt="upload profile image" />
            </div>
          </Dropzone>
        }
          {!this.props.isOwner &&
          <div
            className="details__image-container"
          >
            <img className="details__image" src={this.props.image} alt="profile" />
          </div>
      }
          <div className="details__text-primary"> {this.props.name} </div>

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
          ></textarea>
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
