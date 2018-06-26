import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const upload = require('superagent');

class Details extends React.Component {

  constructor(props) {
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  uploadImage() {
    console.log('hi hi hi');
  }
  componentDidUpdate() {
    console.log(this.props.image);
  }
  onDrop(file) {
    upload.post(`/api/upload/${this.props.name}/profile`)
      .attach('uploadImageFile', file[0])
      .end((err, res) => {
        if (err) console.log(err);
        const imageName = res.text.replace(/\s/g, '+');
        // TODO: CHANGE THE folder to env
        this.props.setProfileImage(`https://s3.amazonaws.com/peblio-files-staging/${imageName}`);
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
