import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import ImageUploadSVG from '../../../images/imageUpload.svg';

require('./details.scss');

const axios = require('axios');
const upload = require('superagent');

class Details extends React.Component {

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    upload.post(`/api/upload/${this.props.name}/profile`)
      .attach('uploadImageFile', file[0])
      .end((err, res) => {
        if (err) console.log(err);
        const imageName = res.text.replace(/\s/g, '+');
        const imageURL = `https://s3.amazonaws.com/peblio-files-staging/${imageName}`;
        // TODO: CHANGE THE folder to env
        this.props.setUserImage(imageURL);
        axios.post('/profile/save', {
          name: this.props.name,
          imageURL
        }).then(() => { console.log('saved'); })
          .catch(error => console.error(error));
      });
  }
  render() {
    return (
      <div className="details__content">
        <div className="details__title">
          {this.props.isOwner &&
            <p>
            Welcome {this.props.name} !
            </p>
          }
          <Dropzone
            onDrop={this.onDrop}
            className="details__image-container"
          >

            <img className="details__image" src={this.props.image} alt="profile-image" />
            <div className="details__image-upload">
              <ImageUploadSVG alt="upload profile image" />
            </div>
          </Dropzone>
          <div className="details__text-primary"> {this.props.name} </div>
          <div className="details__text-secondary"> {this.props.blurb} </div>
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  name: PropTypes.string.isRequired
};

export default Details;
