import React, { PropTypes } from 'react';
import P5Editor from './p5Editor.jsx'
import JavascriptEditor from './JavascriptEditor.jsx'
import P5Output from './p5Output.jsx'
import JavascriptOutput from './JavascriptOutput.jsx'
import EditorToolbar from './EditorToolbar.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';

class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }
  onFocus() {
    // debugger;
    this.props.setCurrentEditor(this.props.editorId);
  }
  render() {
    return (
      <div onFocus={ this.onFocus }>
        <EditorToolbar
          playCode = {this.props.playCode}
          stopCode = {this.props.stopCode}
          setEditorMode = {this.props.setEditorMode}
        />
        <div className = "codeEditor__container">
          <div className="codeEditor__sub-container">
            <div className="codeEditor__input">
              {(() => { // eslint-disable-line
                if (this.props.editorMode.p5) {
                  return (
                    <P5Editor
                      editorCode = {this.props.code}
                      updateCode = {this.props.updateCode}
                    />
                  );
                } else if (this.props.editorMode.javascript) {
                  return (
                    <JavascriptEditor
                      editorCode = {this.props.code}
                      updateCode = {this.props.updateCode}
                    />
                  );
                }
              })()}
            </div>
            <div className="codeEditor__output">
              {(() => { // eslint-disable-line
                if (this.props.isPlaying) {
                  if (this.props.editorMode.p5) {
                    return (
                      <P5Output
                        editorCode = {this.props.code}
                        updateCode = {this.props.updateCode}
                        isPlaying = {this.props.isPlaying}
                        receiveMessage = {this.props.receiveMessage}
                      />
                    );
                  } else if (this.props.editorMode.javascript) {
                    return (
                      <JavascriptOutput
                        editorCode = {this.props.code}
                        updateCode = {this.props.updateCode}
                        isPlaying = {this.props.isPlaying}
                        receiveMessage = {this.props.receiveMessage}
                        consoleOutputText = {this.props.consoleOutputText}
                      />
                    );
                  }
                }
              })()}
            </div>
          </div>
          <div className="codeEditor__console">
            <ConsoleOutput
              consoleOutputText = {this.props.consoleOutputText}
            />
          </div>

        </div>
      </div>
    );
  }

}

export default EditorContainer;
