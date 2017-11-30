import React, { PropTypes } from 'react';
import P5Editor from './P5Editor.jsx'
import JavascriptEditor from './JavascriptEditor.jsx'
import P5Output from './P5Output.jsx'
import JavascriptOutput from './JavascriptOutput.jsx'
import EditorToolbar from './EditorToolbar.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';

class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }
  onFocus() {
    this.props.setCurrentEditor(this.props.editorId);
  }
  render() {
    let dragClassName = "element__close drag__" +this.props.editorId;
    return (
      <div className= "codeEditor_totalContainer" onFocus={ this.onFocus }>
        <nav>
          <button className="element__close" onClick={() => this.props.removeEditor(this.props.editorId)}>&#x2613;</button>
          <button className={dragClassName}>&#x2612;</button>
        </nav>
        <EditorToolbar
          playCode = {() => {this.props.playCode(this.props.editorId)}}
          stopCode = {() => {this.props.stopCode(this.props.editorId)}}
          setEditorMode = {this.props.setEditorMode}
        />
        <div className = "codeEditor__container">
          <div className="codeEditor__sub-container">
            <div className="codeEditor__input">
              {(() => { // eslint-disable-line
                if (this.props.editorMode=='p5') {
                  return (
                    <P5Editor
                      editorCode = {this.props.code}
                      updateCode = {this.props.updateCode}
                    />
                  );
                } else if (this.props.editorMode=='javascript') {
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
                  if (this.props.editorMode=='p5') {
                    return (
                      <P5Output
                        editorCode = {this.props.code}
                        updateCode = {this.props.updateCode}
                        isPlaying = {this.props.isPlaying}
                        updateConsoleOutput = {this.props.updateConsoleOutput}
                      />
                    );
                  } else if (this.props.editorMode=='javascript') {
                    return (
                      <JavascriptOutput
                        editorCode = {this.props.code}
                        updateCode = {this.props.updateCode}
                        isPlaying = {this.props.isPlaying}
                        updateConsoleOutput = {this.props.updateConsoleOutput}
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
