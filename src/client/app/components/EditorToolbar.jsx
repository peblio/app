import React from 'react';
import PropTypes from 'prop-types';

import PlaySVG from '../images/play.svg';
import PauseSVG from '../images/pause.svg';

class EditorToolbar extends React.Component {
  render() {
    return (
      <div className="editor-toolbar__container">
        <div className="editor-toolbar__button-container">
          <select
            className="editor-toolbar__item"
            id="test"
            onChange={(event) => { this.props.setEditorMode(event.target.value); }}
          >
            <option value="p5">p5</option>
          </select>
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
              )

            )
          }
        </ul>
      </div>
    );
  }
}

EditorToolbar.propTypes = {
  currentFile: PropTypes.number.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired
};

export default EditorToolbar;
