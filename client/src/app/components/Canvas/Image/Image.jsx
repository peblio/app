import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React from 'react';

import UploadSVG from '../../../images/upload.svg';

require('./image.scss');
const upload = require('superagent');

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://s3.amazonaws.com/peblio-files/potato.png'
    };
    this.setCurrentEditor = () => { this.props.setCurrentEditor(this.props.id); };
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.onChange = (state) => { this.props.onChange(this.props.id, state); };
    this.setImageURL = url => this.props.setImageURL(this.props.id, url);
    this.onDrop = this.onDrop.bind(this);
    this.urlSubmitted = (event) => {
      this.props.setImageURL(this.props.id, this.url.value);
      event.preventDefault();
    };
  }


  onDrop(file) {
    upload.post('/upload')
      .attach('uploadImageFile', file[0])
      .end((err, res) => {
        if (err) console.log(err);
        const imageName = res.text.replace(/\s/g, '+');
        this.setImageURL(`https://s3.amazonaws.com/peblio-files/${imageName}`);
      });
  }
  render() {
    return (
      <div className={`text-editor__container ${this.props.preview ? '' : 'text-editor__container--edit'}`} >

        {!this.props.imageURL && !this.props.name &&
        <div className="image__login">
          <div className="image__content">
            <div className="image__title">
                Please Log In to Upload Images
            </div>
            <div className="image__svg">
              <UploadSVG alt="upload image" />
            </div>
          </div>
        </div>
        }
        {!this.props.imageURL && this.props.name &&
          <div className="image__login">
            <div className="image__content">
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
        {this.props.imageURL && <img className="element__image" src={this.props.imageURL} alt="" /> }
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
  setCurrentEditor: PropTypes.func.isRequired,
  setImageURL: PropTypes.func.isRequired,
};

export default Image;
