import React from 'react';
import PropTypes from 'prop-types';

import InfoSVG from '../../../../../images/info.svg';
import PauseSVG from '../../../../../images/pause.svg';
import PlaySVG from '../../../../../images/play.svg';

require('./editorToolbar.scss');

class EditorToolbar extends React.Component {
  render() {
    return (
      <div className="editor-toolbar__container">
        <div className="editor-toolbar__button-container">
          {(this.props.editorMode === 'processing') && (
            <div
              tabIndex="0"
              className="editor-toolbar__svg editor-toolbar__svg-info"
            >
              <InfoSVG alt="More information" />

              <div
                tabIndex="0"
                className="editor-toolbar__warning-container"
              >
                <p className="editor-toolbar__warning">
                      We currently use the Processing.js library to run Processing in the browser which comes along with certain limitations. Learn more
                  {' '}
                  <a
                    className="editor-toolbar__warning-link"
                    href="http://processingjs.org/articles/p5QuickStart.html#thingstoknowusingpjs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                        here.
                  </a>
                </p>
              </div>
            </div>
          )}

          <p className="editor-toolbar__title">
            {this.props.editorMode}
          </p>
          <button
            className="editor-toolbar__svg"
            onClick={() => {
              this.props.playCode();
              if (this.props.isPlaying) { this.props.startCodeRefresh(); }
            }}
          >
            <PlaySVG alt="Run Code" />
          </button>
          <button
            className="editor-toolbar__svg"
            onClick={this.props.stopCode}
          >
            <PauseSVG alt="Pause Code" />
          </button>
        </div>
        <ul className="editor-toolbar__files">
          {
            this.props.files.map((file, index) => (
              <li key={file.id} className="editor-toolbar__file">
                <button
                  onClick={() => this.props.setCurrentFile(index)}
                  className={
                    `editor-toolbar__file-button
                    ${(this.props.currentFile === index) ? 'editor-toolbar__file-button--selected' : ''}`
                  }
                >
                  {file.name}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

EditorToolbar.propTypes = {
  currentFile: PropTypes.number.isRequired,
  editorMode: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired
};

export default EditorToolbar;
