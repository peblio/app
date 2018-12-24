import PropTypes from 'prop-types';
import React from 'react';
import SplitPane from 'react-split-pane';

import CodeEditor from '../../../Shared/EditorComponents/CodeEditor/CodeEditor.jsx';
import CodeOutput from '../../../Shared/EditorComponents/CodeOutput/CodeOutput.jsx';
import ConsoleOutput from '../../../Shared/EditorComponents/ConsoleOutput/ConsoleOutput.jsx';

class SplitEditorContainer extends React.Component {
  render() {
    return (
      <div className="editor__container">

        <div className="editor__sub-container">
          <SplitPane
            split="vertical"
            defaultSize={this.props.innerWidth}
            onDragStarted={this.props.startResize}
            onDragFinished={(size) => { this.props.finishResize(); this.props.setInnerWidth(size); }}
          >
            <div className="editor__input editor__input-split">

              <CodeEditor
                currentFile={this.props.currentFile}
                files={this.props.files}
                updateFile={this.props.updateFile}
              />

            </div>
            <div className={`editor__output ${this.props.isConsoleOpen ? 'editor__output--short' : ''}`}>
              <div
                className={`editor__output-overlay
                      ${this.props.isResizing
        ? 'editor__output-overlay--show' : ''}`}
              >
              </div>
              { this.props.isPlaying && (
                <CodeOutput
                  id={this.props.id}
                  clearConsoleOutput={this.props.clearConsoleOutput}
                  editorMode={this.props.editorMode}
                  files={this.props.files}
                  isPlaying={this.props.isPlaying}
                  isRefreshing={this.props.isRefreshing}
                  stopCodeRefresh={this.props.stopCodeRefresh}
                  updateConsoleOutput={this.props.updateConsoleOutput}
                />
              )}
              <ConsoleOutput
                consoleOutputText={this.props.consoleOutputText}
                isConsoleOpen={this.props.isConsoleOpen}
                toggleConsole={this.props.toggleConsole}
              />
            </div>
          </SplitPane>
        </div>

      </div>
    );
  }
}

SplitEditorContainer.propTypes = {
  id: PropTypes.string.isRequired,
  clearConsoleOutput: PropTypes.func.isRequired,
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFile: PropTypes.number.isRequired,
  editorMode: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  innerWidth: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  setInnerWidth: PropTypes.func.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired
};


export default SplitEditorContainer;
