import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

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
        this.props.setProfileImage(imageURL);
        axios.post('/profile/save', {
          name: this.props.name,
          imageURL
        }).then(() => { console.log('saved'); })
          .catch(error => console.error(error));
      });
  }
  render() {
    return (
      <div>
        {this.props.isOwner &&
          <p>
          Welcome {this.props.name} !
          </p>
        }
        <h1> {this.props.name} </h1>
        <Dropzone
          onDrop={this.onDrop}
          className="element-image"
        >
          <div className="image__title">
            Upload a file
          </div>
          <img src={this.props.image} />
        </Dropzone>
        <button
          onClick={this.uploadImage}
        >
            Click here to upload image
        </button>
      </div>
    );
  }
}

Details.propTypes = {
  name: PropTypes.string.isRequired
};

export default Details;
