import React from 'react';
import Tooltip from 'react-tooltip-lite';
import PropTypes from 'prop-types';
import axiosOrg from 'axios';
import URL from 'url';

import CloseSVG from '../../../../../images/close.svg';
import axios from '../../../../../utils/axios';
import FileUpload from '../../FileUpload/FileUpload.jsx';

const MEDIA_FILE_REGEX = /.+\.(gif|jpg|jpeg|png|bmp)$/i;
const CODE_FILE_REGEX = /.+\.(csv|txt|json|js|css)$/i;
const HTML_FILE_REGEX = /.+\.(html)$/i;

require('./editorFiles.scss');

class EditorFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFileUploadOpen: false,
      isFileUploading: false
    };
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

  startFileUpload = () => {
    this.setState({ isFileUploading: true });
  }

  stopFileUpload = () => {
    this.setState({ isFileUploading: false });
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
                  className={`editor-toolbar__file
                    ${(this.props.currentFile === index) ? 'editor-toolbar__file--selected' : ''}`}
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

EditorFiles.propTypes = {
  addMediaFile: PropTypes.func.isRequired,
  addFileToEditor: PropTypes.func.isRequired,
  currentFile: PropTypes.number.isRequired,
  deleteFileFromEditor: PropTypes.func.isRequired,
  editorMode: PropTypes.string.isRequired,
  editorView: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  viewEditorPreview: PropTypes.func.isRequired
};

export default EditorFiles;
