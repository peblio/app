import React, { PropTypes } from 'react';
import P5Editor from './p5Editor.jsx'
import JavascriptEditor from './JavascriptEditor.jsx'
import P5Output from './p5Output.jsx'
import JavascriptOutput from './JavascriptOutput.jsx'
import EditorToolbar from './EditorToolbar.jsx';

class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <EditorToolbar
          playCode = {this.props.playCode}
          stopCode = {this.props.stopCode}
        />  
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

      {(() => { // eslint-disable-line
        if(this.props.isPlaying) {
          if (this.props.editorMode.p5) {
            return (
              <P5Output
                editorCode = {this.props.editorCode}
                updateCode = {this.props.updateCode}
                isPlaying = {this.props.isPlaying}
              />
            );
          } else if (this.props.editorMode.javascript) {
            return (
              <JavascriptOutput
                editorCode = {this.props.editorCode}
                updateCode = {this.props.updateCode}
                isPlaying = {this.props.isPlaying}
              />
            );
          }
        }

      })()}
    </div>
    );
  }

}

export default EditorContainer;
