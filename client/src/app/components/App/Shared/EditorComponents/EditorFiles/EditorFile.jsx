import React from 'react';
import Tooltip from 'react-tooltip-lite';
import PropTypes from 'prop-types';

import CloseSVG from '../../../../../images/close.svg';

const HTML_FILE_REGEX = /.+\.(html)$/i;

require('./editorFiles.scss');

class EditorFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFileOptionOpen: false
    };
  }

  closeFileOption=() => {
    this.setState({
      isFileOptionOpen: false
    });
  }

  deleteFile = (e, index) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this file?')) { // eslint-disable-line no-restricted-globals
      this.props.deleteFileFromEditor(index);
    }
  }

  openFileOption=() => {
    this.setState({
      isFileUploadOpen: true
    });
  }

  toggleFileOption=() => {
    this.setState(prevState => ({ isFileOptionOpen: !prevState.isFileOptionOpen }));
  }

  focusOnButton(event) {
    event.target.focus();
  }

  render() {
    return (
      <li
        key={this.props.file.id}
        className={`editor-toolbar__file
            ${(this.props.currentFile === this.props.index) ? 'editor-toolbar__file--selected' : ''}`}
      >
        <div className="editor-toolbar__file-name">
          <Tooltip content={this.props.file.name}>
            <button
              onClick={() => {
                this.props.openFileView(this.props.id, this.props.index);
                this.props.setCurrentFile(this.props.index);
              }}
              disabled={this.props.isImage}
              className={
                `editor-toolbar__file-button
                 ${(this.props.currentFile === this.props.index) ? 'editor-toolbar__file-button--selected' : ''}
            ${(this.props.isImage) ? 'editor-toolbar__file-button-static' : ''}`
              }
              data-test="editor-toolbar__file-name"
            >
              {this.props.file.name}
            </button>
          </Tooltip>
          {!this.props.file.name.match(HTML_FILE_REGEX) && (
            <button
              className="editor-toolbar__file-button"
              onClick={(e) => {
                this.focusOnButton(e);
                this.toggleFileOption();
              }}
              onBlur={() => {
                this.closeFileOption();
              }}
              data-test="widget__delete"
            >
              {'>'}
            </button>
          )}
        </div>
        {this.state.isFileOptionOpen && (
          <div
            className="editor-toolbar__file-option"
            role="presentation"
          >
            <button
              className="editor-toolbar__file-button"
              onClick={(e) => { this.deleteFile(e, this.props.index); }}
              data-test="widget__delete"
            >
              Delete
            </button>
          </div>
        )}
      </li>
    );
  }
}

EditorFile.propTypes = {
  currentFile: PropTypes.number.isRequired,
  deleteFileFromEditor: PropTypes.func.isRequired,
  file: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isImage: PropTypes.bool.isRequired,
  openFileView: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired
};

export default EditorFile;
