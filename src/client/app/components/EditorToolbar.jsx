import React from 'react';
import { render } from 'react-dom';

import PlaySVG from '../images/play.svg';
import PauseSVG from '../images/pause.svg';

class EditorToolbar extends React.Component {
  render() {
    return (
      <div className="editorToolbar__container">
        <select
          className="editorToolbar__item"
          id="test"
          onChange={(event) => { this.props.setEditorMode(event.target.value); }}
        >
          <option value="p5">p5</option>
          <option value="javascript">javascript</option>
          <option value="python">python</option>
        </select>
        <button
          className="editorToolbar__svg"
          onClick={this.props.playCode}
        >
          <PlaySVG alt="Run Code" />
        </button>
        <button
          className="editorToolbar__svg"
          onClick={this.props.stopCode}
        >
          <PauseSVG alt="Pause Code" />

        </button>
      </div>
    );
  }

}

export default EditorToolbar;
