import React from 'react';
import { render } from 'react-dom';

const playButton = require('../../images/play.svg');
const pauseButton = require('../../images/pause.svg');

class EditorToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="editorToolbar__container">
        <select
          className="editorToolbar__item"
          id="test"
          onChange={(event) => {this.props.setEditorMode(event.target.value)}}
        >
          <option value="p5">p5</option>
          <option value="javascript">javascript</option>
          <option value="python">python</option>
        </select>
        <button
          className="editorToolbar__svg"
          onClick = {this.props.playCode}
        >
        <InlineSVG src={playButton} alt="Run Code" />
        </button>
        <button
          className="editorToolbar__svg"
          onClick = {this.props.stopCode}
        >
        <InlineSVG src={pauseButton} alt="Pause Code" />

        </button>
      </div>
    );
  }

}

export default EditorToolbar;
