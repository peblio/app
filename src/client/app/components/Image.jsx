import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import PropTypes from 'prop-types';
import DragSVG from '../images/drag.svg';
import CloseSVG from '../images/close.svg';

import Dropzone from 'react-dropzone';

const axios = require('axios');
const upload = require('superagent');

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    this.setCurrentEditor = () => { this.props.setCurrentEditor(this.props.id); };
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.onChange = (state) => { this.props.onChange(this.props.id, state); };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    upload.post('/api/upload')
      .attach('theseNamesMustMatch', file[0])
      .end((err, res) => {
        if (err) console.log(err);
        console.log(res);
        const imageName = res.text.replace(/\s/g, '+');
        this.setState({ url: `https://s3.amazonaws.com/peblio-files/${imageName}` });
      });
  }

  render() {
    return (
      <div
        id={this.props.id}
        onFocus={this.setCurrentEditor.bind(this)}
        className={`text-editor__container ${this.props.preview ? '' : 'text-editor__container--edit'}`}
      >
        { this.props.preview ||
          <nav className="element__nav">
            <button
              className="element__close"
              onClick={this.removeEditor.bind(this)}
            >
              <CloseSVG alt="close element" />
            </button>
            <button className={`element__close element__drag drag__${this.props.id}`}>
              <DragSVG alt="drag element" />
            </button>
          </nav>
        }

        {!this.state.url &&
          <div>
            <Dropzone
              onDrop={this.onDrop}
              className="element__image"
            >
              <div>Try dropping a file here, or click to select a file to upload.</div>
            </Dropzone>
          </div>
      }
        { this.state.url && <img className="element__image" src={this.state.url} />}
      </div>
    );
  }
}

Image.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func.isRequired
};

export default Image;
