import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropzone from 'react-dropzone';
import { submitPage } from '../../../../action/page.js';
import { viewLoginModal } from '../../../../action/mainToolbar.js';
import * as PageDefaults from '../../../../constants/pageConstants.js';
import { convertWorkspaceDescHeight } from '../../../../utils/pixel-to-grid.js';

import UploadSVG from '../../../../images/upload.svg';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="image__title">Upload a file</div>
        <Dropzone
          onDrop={(files) => { console.log('test'); this.props.onDrop(files); }}
          className="element-image"
        >
          <div className="image__drop">
            <div className="image__svg">
              <UploadSVG alt="upload image" />
            </div>
            <div className="image__svg--text">Drop a file or click to upload</div>
          </div>
        </Dropzone>
        <div className="image__title">or add a URL</div>
        <div className="image__url">
          <form
            className="element-image__add-url"
            onSubmit={e => this.props.urlSubmitted(e, this.url.value)}
          >
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
            <input className="element__button" type="submit" value="Upload New" />
          </form>
        </div>
      </div>
    );
  }
}


FileUpload.propTypes = {

};


export default FileUpload;
