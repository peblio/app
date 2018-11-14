import React from 'react';
import ReactTooltip from 'react-tooltip';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import axiosOrg from 'axios';
import URL from 'url';

import InfoSVG from '../../../../../images/info.svg';
import PauseSVG from '../../../../../images/pause.svg';
import PlaySVG from '../../../../../images/play.svg';
import axios from '../../../../../utils/axios';
import { ProcessingWarning, WorkspaceLanguageConfirmation } from '../../../../../constants/codeConstants.js';
import * as descriptions from '../../../../../constants/imageDescConstants.js';
import FileUpload from '../../FileUpload/FileUpload.jsx';

require('./editorToolbar.scss');

class EditorToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFileUploadOpen: false,
      isFileUploading: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.files !== this.props.files) {
      ReactTooltip.rebuild();
    }
  }

  openFileUpload = () => {
    this.setState({ isFileUploadOpen: true });
  }

  closeFileUpload = () => {
    this.setState({ isFileUploadOpen: false });
  }

  startFileUpload = () => {
    this.setState({ isFileUploading: true });
  }

  stopFileUpload = () => {
    this.setState({ isFileUploading: false });
  }

  confirmLanguageChange = (e) => {
    const validationResults = window.confirm(WorkspaceLanguageConfirmation);

    if (validationResults === false) {
      e.selectedIndex = (e.selectedIndex === 1) ? 0 : 1;
    } else {
      this.props.setEditorMode(e);
    }
  }

  onDrop=(files) => {
    const file = files[0];
    this.startFileUpload();
    axios.get(`/upload/${this.props.name}/images`, {
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
        this.props.addMediaFile(file.name, `https://s3.amazonaws.com/${process.env.S3_BUCKET}${url.pathname}`);
        this.stopFileUpload();
        this.closeFileUpload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='editor-toolbar__container'>
        <ReactTooltip
          delayShow={descriptions.SHOW_DESC_DELAY}
        />
        <div className='editor-toolbar__button-container'>
          {(this.props.editorMode === 'processing') && (
            <div
              tabIndex='0' // eslint-disable-line
              className='editor-toolbar__svg editor-toolbar__svg-info'
            >
              <InfoSVG alt='More information' />

              <div
                tabIndex='0' // eslint-disable-line
                className='editor-toolbar__warning-container'
              >
                <p className='editor-toolbar__warning'>
                  {ReactHtmlParser(ProcessingWarning)}
                </p>
              </div>
            </div>
          )}

          {(this.props.editorMode === 'python') && (
            <span
              className='beta-tag'
            >
           beta
            </span>
          )}

          {this.props.container === 'workspace' && (
            <select
              className='editor-toolbar__dropdown'
              onChange={this.confirmLanguageChange}
              value={this.props.editorMode}
            >
              <option value='html'>HTML</option>
              <option value='webdev'>HTML/JS/CSS</option>
              <option value='p5'>p5</option>
              <option value='processing'>Processing</option>
              <option value='python'>Python</option>
            </select>
          )}
          {this.props.container === 'canvas' && (
            <p className='editor-toolbar__title'>
              {this.props.editorMode}
            </p>
          )}
          <button
            className={`editor-toolbar__svg ${this.props.isPlaying ? 'editor-toolbar--isPlaying' : ''}`}
            onClick={() => {
              this.props.playCode();
              if (this.props.isPlaying) { this.props.startCodeRefresh(); }
            }}
            data-test='play-sketch-button'
            data-tip={descriptions.EDITOR_PLAY_DESC}
          >
            <PlaySVG alt='Run Code' />
          </button>
          <button
            className={`editor-toolbar__svg ${!this.props.isPlaying ? 'editor-toolbar--isPaused' : ''}`}
            onClick={this.props.stopCode}
            data-tip={descriptions.EDITOR_STOP_DESC}
          >
            <PauseSVG alt='Pause Code' />
          </button>
          {this.props.container === 'workspace' && (
            <button
              onClick={this.props.openShareWorkspace}
              className="editor-toolbar__button"
            >
                Share Project
            </button>
          )}
        </div>
        <ul className='editor-toolbar__files'>
          {
            this.props.files.map((file, index) => {
              const isImage = 'externalLink' in file;
              return (
                <li
                  key={file.id}
                  className='editor-toolbar__file'
                  data-tip={file.name}
                >
                  <button
                    onClick={() => {
                      this.props.setCurrentFile(index);
                    }}
                    disabled={isImage}
                    className={
                      `editor-toolbar__file-button
                    ${(this.props.currentFile === index) ? 'editor-toolbar__file-button--selected' : ''}
                    ${(isImage) ? 'editor-toolbar__file-button-static' : ''}`
                    }
                  >
                    {file.name}
                  </button>
                </li>
              );
            })
          }
          {
            (this.props.editorMode === 'p5' || this.props.editorMode === 'webdev') &&

          (
            <li key='add-media' className='editor-toolbar__file'>
              <button
                className="editor-toolbar__file-button"
                onClick={this.openFileUpload}
                data-test='add-editor-image-button'
                data-tip={descriptions.EDITOR_ADD_IMAGE_DESC}
              >
                <i className="fas fa-plus"></i>
              </button>
            </li>
          )
          }
        </ul>
        {this.state.isFileUploadOpen && (
          <div
            tabIndex="0" //eslint-disable-line
            className="editor-toolbar__image-upload"
            data-test="file-upload-container"
          >
            <button
              className="editor-toolbar__image-close"
              onClick={this.closeFileUpload}
            >
              <i className="fas fa-times"></i>
            </button>
            {this.props.name ? (
              <FileUpload
                onDrop={this.onDrop}
                urlSubmitted={this.props.addMediaFile}
                imageURL={this.props.imageURL}
                readOnly={false}
                container="editor"
                isSmall={false}
                isFileUploading={this.state.isFileUploading}
              />
            ) : (
              <p className="editor-toolbar__image-notice">
            Please Log In to Upload Images
              </p>
            )
            }
          </div>

        )}
      </div>
    );
  }
}

EditorToolbar.propTypes = {
  addMediaFile: PropTypes.func.isRequired,
  container: PropTypes.string.isRequired,
  currentFile: PropTypes.number.isRequired,
  editorMode: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  imageURL: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openShareWorkspace: PropTypes.func.isRequired,
  playCode: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired
};

export default EditorToolbar;
