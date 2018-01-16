import React, { PropTypes } from 'react';
import P5Editor from './P5Editor.jsx';
import JavascriptEditor from './JavascriptEditor.jsx';
import P5Output from './P5Output.jsx';
import JavascriptOutput from './JavascriptOutput.jsx';
import EditorToolbar from './EditorToolbar.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';
import DragSVG from '../images/drag.svg';
import CloseSVG from '../images/close.svg';


class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    this.props.setCurrentEditor(this.props.editorId);
  }
  render() {
    const dragClassName = `element__close drag__${this.props.editorId}`;
    return (
      <div className="codeEditor_totalContainer" onFocus={this.onFocus}>
        { this.props.preview ||
          <nav>
            <button
              className="element__close"
              onClick={() => this.props.removeEditor(this.props.editorId)}
            >
              <CloseSVG alt="close element" />
            </button>
            <button className={dragClassName}>
              <DragSVG alt="drag element" />
            </button>
          </nav>
        }
        <EditorToolbar
          playCode={() => { this.props.playCode(this.props.editorId); }}
          stopCode={() => { this.props.stopCode(this.props.editorId); }}
          setEditorMode={this.props.setEditorMode}
        />
        <div className="codeEditor__container">
          <div className="codeEditor__sub-container">
            <div className="codeEditor__input">
              {(()=> { // eslint-disable-line
                if (this.props.editorMode === 'p5') {
                  return (
                    <P5Editor
                      editorCode={this.props.code}
                      updateCode={this.props.updateCode}
                    />
                  );
                } else if (this.props.editorMode === 'javascript') {
                  return (
                    <JavascriptEditor
                      editorCode={this.props.code}
                      updateCode={this.props.updateCode}
                    />
                  );
                }
              })()}
            </div>
            <div className="codeEditor__output">
              {(()=> { // eslint-disable-line
                if (this.props.isPlaying) {
                  if (this.props.editorMode === 'p5') {
                    return (
                      <P5Output
                        editorCode={this.props.code}
                        updateCode={this.props.updateCode}
                        isPlaying={this.props.isPlaying}
                        updateConsoleOutput={this.props.updateConsoleOutput}
                      />
                    );
                  } else if (this.props.editorMode === 'javascript') {
                    return (
                      <JavascriptOutput
                        editorCode={this.props.code}
                        updateCode={this.props.updateCode}
                        isPlaying={this.props.isPlaying}
                        updateConsoleOutput={this.props.updateConsoleOutput}
                        consoleOutputText={this.props.consoleOutputText}
                      />
                    );
                  }
                }
              })()}
            </div>
          </div>

          <div className="codeEditor__console">
            <ConsoleOutput
              consoleOutputText={this.props.consoleOutputText}
            />
          </div>

        </div>
      </div>
    );
  }

}

EditorContainer.propTypes = {
  code: PropTypes.string.isRequired,
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  editorId: PropTypes.string.isRequired,
  editorMode: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired
};

export default EditorContainer;
