import React, { PropTypes } from 'react';
import P5Editor from './p5Editor.jsx'
import JavascriptEditor from './JavascriptEditor.jsx'
// import PythonEditor from './PythonEditor.jsx'
import EditorToolbar from './EditorToolbar.jsx';

class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <select id="test" onChange={this.props.setEditorMode}>
          <option value="p5">p5</option>
          <option value="javascript">javascript</option>
          <option value="python">python</option>
        </select>
        {(() => { // eslint-disable-line
          if (this.props.editorMode.p5) {
            return (
              <P5Editor
                editorCode = {this.props.editorCode}
                updateCode = {this.props.updateCode}
              />
            );
          } else if (this.props.editorMode.javascript) {
            return (
              <JavascriptEditor
                editorCode = {this.props.editorCode}
                updateCode = {this.props.updateCode}
              />
            );
          }
        })()}

      <button
        onClick = {this.props.playCode}
      >
        Play
      </button>
      <button
        onClick = {this.props.stopCode}
      >
        Stop
      </button>
      </div>
    );
  }

}

export default EditorContainer;
