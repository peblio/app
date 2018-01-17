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
    
    const i = this.props.index;
    this.setCurrentEditor = () => this.props.setCurrentEditor(i);
    this.removeEditor = () => this.props.removeEditor(i);
    this.playCode = () => this.props.playCode(i);
    this.stopCode = () => this.props.stopCode(i);
    this.updateCode = val => this.props.updateCode(i, val);
    this.updateConsoleOutput = e => this.props.updateConsoleOutput(i, e)
    this.setEditorMode = mode => this.props.setEditorMode(i, mode);
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
            <button className={`element__close drag__${this.props.editorId}`}>
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
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  editorMode: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired,
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
