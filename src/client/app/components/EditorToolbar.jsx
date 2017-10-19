import React from 'react';
import { render } from 'react-dom';

class EditorToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="editorToolbar__container">
        <button
          className="editorToolbar__item"
          onClick = {this.props.playCode}
        >
          Play
        </button>
        <button
          className="editorToolbar__item"
          onClick = {this.props.stopCode}
        >
          Stop
        </button>
        <select
          className="editorToolbar__item"
          id="test"
          onChange={this.props.setEditorMode}
        >
          <option value="p5">p5</option>
          <option value="javascript">javascript</option>
          <option value="python">python</option>
        </select>
      </div>
    );
  }

}

export default EditorToolbar;
