import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Tooltip from 'react-tooltip-lite';
import PropTypes from 'prop-types';
import axiosOrg from 'axios';
import URL from 'url';

import CloseSVG from '../../../../../images/close.svg';
import InfoSVG from '../../../../../images/info.svg';
import PauseSVG from '../../../../../images/pause.svg';
import PlaySVG from '../../../../../images/play.svg';
import EditorExpand from '../../../../../images/editor-expand.svg';
import EditorCompress from '../../../../../images/editor-compress.svg';
import PreferencesSVG from '../../../../../images/preferences.svg';
import axios from '../../../../../utils/axios';
import { ProcessingWarning, WorkspaceLanguageConfirmation } from '../../../../../constants/codeConstants.js';
import EditorOptions from '../EditorOptions/EditorOptions.jsx';
import FileUpload from '../../FileUpload/FileUpload.jsx';

const MEDIA_FILE_REGEX = /.+\.(gif|jpg|jpeg|png|bmp)$/i;
const CODE_FILE_REGEX = /.+\.(csv|txt|json|js|css)$/i;
const HTML_FILE_REGEX = /.+\.(html)$/i;

require('./editorToolbar.scss');

class EditorToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFileUploadOpen: false,
      isFileUploading: false,
      isEditorViewOpen: false
    };
  }

  toggleWidgetFullscreen = () => {
    this.props.toggleWidgetFullscreen(this.props.id);
  }

  toggleEditorView = () => {
    this.setState(prevState => (
      { isEditorViewOpen: !prevState.isEditorViewOpen }));
  }

  openFileUpload = () => {
    this.setState({ isFileUploadOpen: true });
  }

  closeFileUpload = () => {
    this.setState({ isFileUploadOpen: false });
  }

  deleteFile = (e, index) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this file?')) { // eslint-disable-line no-restricted-globals
      this.props.deleteFileFromEditor(index);
    }
  }

  renderEditorSizeIcon = () => {
    console.log(this.props.isWidgetFullScreenMode);
    if (this.props.isWidgetFullScreenMode) {
      return (
        <EditorCompress alt="compress editor" />
      );
    }
    return (<EditorExpand alt="expand editor" />);
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
    if (file.name.match(CODE_FILE_REGEX)) {
      axiosOrg.get(file.preview)
        .then((data) => {
          this.props.addFileToEditor(file.name, data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (file.name.match(MEDIA_FILE_REGEX)) {
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
  }

  render() {
    return (
      <div className='editor-toolbar__container'>
        <div className='editor-toolbar__button-container'>
          <div className='editor-toolbar__button-container-left'>
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
            <Tooltip content="Run Code">
              <button
                className={`editor-toolbar__svg ${this.props.isPlaying ? 'editor-toolbar--isPlaying' : ''}`}
                onClick={() => {
                  this.props.playCode();
                  if (this.props.isPlaying) { this.props.startCodeRefresh(); }
                }}
                data-test='play-sketch-button'
              >
                <PlaySVG alt='Run Code' />
              </button>
            </Tooltip>
            <Tooltip content="Stop Code">
              <button
                className={`editor-toolbar__svg ${!this.props.isPlaying ? 'editor-toolbar--isPaused' : ''}`}
                onClick={this.props.stopCode}
                data-test='pause-sketch-button'
              >
                <PauseSVG alt='Pause Code' />
              </button>
            </Tooltip>
          </div>
          <div className='editor-toolbar__button-container-right'>
            {this.props.container === 'workspace' && (
              <button
                onClick={this.props.openShareWorkspace}
                className="editor-toolbar__button"
              >
                Share Project
              </button>
            )}
            {this.props.container === 'canvas' && (
              <div
                onClick={(e) => {
                  e.target.focus();
                }}
                role="presentation"
                onBlur={() => {
                  setTimeout(() => {
                    if (this.state.isEditorViewOpen) {
                      this.toggleEditorView();
                    }
                  }, 50);
                }}
              >
                <button
                  onMouseDown={this.toggleEditorView}
                  onKeyDown={this.toggleEditorView}
                  className="editor-toolbar__button"
                >
                  <PreferencesSVG
                    alt='view preferences'
                    className="editor-toolbar__pref-svg"
                  />
                </button>
                <button
                  onMouseDown={this.toggleWidgetFullscreen}
                  onKeyDown={this.toggleWidgetFullscreen}
                  className="editor-toolbar__button"
                >
                  {this.renderEditorSizeIcon()}
                </button>
                {this.state.isEditorViewOpen && (
                  <EditorOptions
                    editorView={this.props.editorView}
                    isConsoleOpen={this.props.isConsoleOpen}
                    isEditorViewOpen={this.state.isEditorViewOpen}
                    setCurrentFile={this.props.setCurrentFile}
                    setEditorView={this.props.setEditorView}
                    toggleConsole={this.props.toggleConsole}
                    toggleEditorView={this.toggleEditorView}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <ul className='editor-toolbar__files'>
          {this.props.editorView === 'tabbed' && (
            <li
              key='preview'
              className='editor-toolbar__file'
            >
              <button
                onClick={() => {
                  this.props.viewEditorPreview();
                }}
                className={
                  `editor-toolbar__file-button
                  ${(this.props.currentFile === -1) ? 'editor-toolbar__file-button--selected' : ''}`
                }
                data-test="editor-toolbar__file-name"
              >
              Preview
              </button>
            </li>
          )}
          {
            this.props.files.map((file, index) => {
              const isImage = 'externalLink' in file;
              return (
                <li
                  key={file.id}
                  className={`editor-toolbar__file ${(this.props.currentFile === index) ? 'editor-toolbar__file--selected' : ''}`}
                >
                  <Tooltip content={file.name}>
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
                      data-test="editor-toolbar__file-name"
                    >
                      {file.name}
                    </button>
                  </Tooltip>
                  {!file.name.match(HTML_FILE_REGEX) && (
                    <button
                      className="editor-toolbar__file-button"
                      onClick={(e) => { this.deleteFile(e, index); }}
                      data-test="widget__delete"
                    >
                      <CloseSVG alt="close element" />
                    </button>
                  )}
                </li>
              );
            })
          }
          {
            (this.props.editorMode === 'p5' || this.props.editorMode === 'webdev') &&
          (
            <li key='add-media' className='editor-toolbar__file'>
              <Tooltip content="Add Image">
                <button
                  className="editor-toolbar__file-button"
                  onClick={this.openFileUpload}
                  data-test='editor-toolbar__add-file-button'
                >
                  <i className="fas fa-plus"></i>
                </button>
              </Tooltip>
            </li>
          )
          }
        </ul>
        {this.state.isFileUploadOpen && (
          <div
            tabIndex="0" //eslint-disable-line
            className="editor-toolbar__image-upload"
            data-test="file-upload__container"
          >
            <button
              className="editor-toolbar__image-close"
              onClick={this.closeFileUpload}
            >
              <i className="fas fa-times"></i>
            </button>
            <FileUpload
              files={this.props.files}
              addFileToEditor={this.props.addFileToEditor}
              closeFileUpload={this.closeFileUpload}
              onDrop={this.onDrop}
              urlSubmitted={this.props.addMediaFile}
              imageURL={this.props.imageURL}
              readOnly={false}
              container="editor"
              isSmall={false}
              isFileUploading={this.state.isFileUploading}
            />
          </div>
        )}
      </div>
    );
  }
}

EditorToolbar.propTypes = {
  addMediaFile: PropTypes.func.isRequired,
  addFileToEditor: PropTypes.func.isRequired,
  container: PropTypes.string.isRequired,
  currentFile: PropTypes.number.isRequired,
  deleteFile: PropTypes.func.isRequired,
  deleteFileFromEditor: PropTypes.func.isRequired,
  editorMode: PropTypes.string.isRequired,
  editorView: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  id: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  isConsoleOpen: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isWidgetFullScreenMode: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openShareWorkspace: PropTypes.func.isRequired,
  playCode: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  setEditorView: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  toggleConsole: PropTypes.func.isRequired,
  toggleWidgetFullscreen: PropTypes.func.isRequired,
  viewEditorPreview: PropTypes.func.isRequired
};

export default EditorToolbar;
