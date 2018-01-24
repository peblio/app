import React from 'react';
import PropTypes from 'prop-types';
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
    console.log(props);
    this.setCurrentEditor = () => this.props.setCurrentEditor(this.props.id);
    this.removeEditor = () => this.props.removeEditor(this.props.id);
    this.playCode = () => this.props.playCode(this.props.id);
    this.stopCode = () => this.props.stopCode(this.props.id);
    this.updateCode = val => this.props.updateCode(this.props.id, val);
    this.updateConsoleOutput = (e) => {
      // There's a memory leak in the Javascript editor. Watch the console after clicking Play.
      console.log(e);
      this.props.updateConsoleOutput(this.props.id, e);
    };
    this.setEditorMode = mode => this.props.setEditorMode(this.props.id, mode);
  }

  render() {
    return (
      <div className="codeEditor_totalContainer" onFocus={this.setCurrentEditor}>
        { this.props.preview ||
          <nav>
            <button
              className="element__close"
              onClick={this.removeEditor}
            >
              <CloseSVG alt="close element" />
            </button>
            <button className={`element__close drag__${this.props.id}`}>
              <DragSVG alt="drag element" />
            </button>
          </nav>
        }
        <EditorToolbar
          playCode={this.playCode}
          stopCode={this.stopCode}
          setEditorMode={this.setEditorMode}
        />
        <div className="codeEditor__container">
          <div className="codeEditor__sub-container">
            <div className="codeEditor__input">
              { this.props.editorMode === 'p5' ? (
                <P5Editor
                  editorCode={this.props.code}
                  updateCode={this.updateCode}
                  files={this.props.files}
                />
              ) : this.props.editorMode === 'javascript' &&
                <JavascriptEditor
                  editorCode={this.props.code}
                  updateCode={this.updateCode}
                />
              }
            </div>
            <div className="codeEditor__output">
              { this.props.isPlaying && (
                this.props.editorMode === 'p5' ? (
                  <P5Output
                    editorCode={this.props.code}
                    updateCode={this.updateCode}
                    isPlaying={this.props.isPlaying}
                    updateConsoleOutput={this.updateConsoleOutput}
                  />
                ) : this.props.editorMode === 'javascript' && (
                  <JavascriptOutput
                    editorCode={this.props.code}
                    updateCode={this.updateCode}
                    isPlaying={this.props.isPlaying}
                    updateConsoleOutput={this.updateConsoleOutput}
                    consoleOutputText={this.props.consoleOutputText}
                  />
                )
              )}
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
  id: PropTypes.string.isRequired,
  editorMode: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  preview: PropTypes.bool.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  playCode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired
};

export default EditorContainer;
