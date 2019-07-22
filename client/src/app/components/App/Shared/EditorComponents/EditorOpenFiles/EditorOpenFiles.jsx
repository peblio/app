import PropTypes from 'prop-types';
import React from 'react';
import CloseSVG from '../../../../../images/close.svg';

require('./editorOpenFiles.scss');

class EditorOpenFiles extends React.Component {
  render() {
    return (
      <div className="open-files__container">
        <button
          className="open-files__toggle-button"
          onClick={this.props.toggleEditorFilesView}
        >
          {'<'}
        </button>
        <ul className="open-files__files">
          {(this.props.container === 'tabbed-editor') && (

            <li
              className={
                `open-files__file
                ${(this.props.currentFile === -1) ? 'open-files__file--selected' : ''}`
              }
            >
              <button
                className="open-files__file-button"
                onClick={this.props.viewEditorPreview}
              >
                Preview
              </button>
            </li>
          )}
          {this.props.files.map((file, index) => {
            if (typeof file.isFileInView === 'undefined' || file.isFileInView) {
              return (
                <li
                  className={
                    `open-files__file
                    ${(this.props.currentFile === index) ? 'open-files__file--selected' : ''}`
                  }
                >
                  <button
                    className="open-files__file-button"
                    onClick={() => {
                      this.props.setCurrentFile(index);
                    }
                    }
                  >
                    {file.name}
                  </button>
                  <button
                    className="open-files__close-button"
                    onClick={() => this.props.closeFileView(this.props.id, index)}
                  >
                    <CloseSVG alt="close element" />
                  </button>
                </li>
              );
            }
            return null;
          })
          }
        </ul>
      </div>
    );
  }
}

EditorOpenFiles.propTypes = {
  closeFileView: PropTypes.func.isRequired,
  container: PropTypes.string.isRequired,
  currentFile: PropTypes.number.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isFileInView: PropTypes.bool.isRequired
  })).isRequired,
  id: PropTypes.string.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  toggleEditorFilesView: PropTypes.func.isRequired
};
export default EditorOpenFiles;
