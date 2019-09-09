import React from 'react';
import PropTypes from 'prop-types';

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
    if (window.confirm('Are you sure you want to delete this file?')) { // eslint-disable-line no-restricted-globals
      this.props.deleteFileFromEditor(index);
    }
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
          <button
            onClick={() => {
              this.props.openFileView(this.props.index);
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
            <i className="far fa-file-alt editor-toolbar__file-icon"></i>
            {this.props.file.name}
          </button>
          {!this.props.file.name.match(HTML_FILE_REGEX) && ( //eslint-disable-line
            <div
              onClick={(e) => {
                this.focusOnButton(e);
              }}
              onBlur={() => {
                setTimeout(() => {
                  this.closeFileOption();
                }, 50);
              }}
            >
              <button
                className="editor-toolbar__file-button editor-toolbar__file-button-option"
                onMouseDown={(e) => {
                  this.toggleFileOption();
                }}
                onKeyDown={(e) => {
                  this.toggleFileOption();
                }}
                data-test="widget__delete"
              >
                {'>'}
              </button>
              {this.state.isFileOptionOpen && (
                <div
                  className="editor-toolbar__file-option"
                  role="presentation"
                >
                  <button
                    className="editor-toolbar__file-button editor-toolbar__file-button-delete"
                    onMouseDown={(e) => { this.deleteFile(e, this.props.index); }}
                    onKeyDown={(e) => { this.deleteFile(e, this.props.index); }}
                    data-test="widget__delete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

          )}
        </div>

      </li>
    );
  }
}

EditorFile.propTypes = {
  currentFile: PropTypes.number.isRequired,
  deleteFileFromEditor: PropTypes.func.isRequired,
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isImage: PropTypes.bool.isRequired,
  openFileView: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired
};

export default EditorFile;
