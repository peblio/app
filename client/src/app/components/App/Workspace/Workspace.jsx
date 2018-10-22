import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import SplitPane from 'react-split-pane';

import * as workspaceAction from '../../../action/workspace.js';
import CodeEditor from '../Shared/EditorComponents/CodeEditor/CodeEditor.jsx';
import CodeOutput from '../Shared/EditorComponents/CodeOutput/CodeOutput.jsx';
import EditorToolbar from '../Shared/EditorComponents/EditorToolbar/EditorToolbar.jsx';
import ConsoleOutput from '../Shared/EditorComponents/ConsoleOutput/ConsoleOutput.jsx';

require('./workspace.scss');

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isResizing: false,
      isConsoleOpen: true
    };
  }

  updateConsoleOutput = (e) => {
    // There's a memory leak in the Javascript editor. Watch the console after clicking Play.
    this.props.updateConsoleOutput('workspace', e);
  };

  toggleConsole = () => {
    this.setState(prevState => ({ isConsoleOpen: !prevState.isConsoleOpen }));
  }

  startResize= () => {
    this.setState({ isResizing: true });
  }

  finishResize = () => {
    this.setState({ isResizing: false });
  }

  render() {
    return (
      <section>
        <div>
          <div className='workspace__total-container'>
            <div className='workspace__header-container'>
              <h1 className='workspace__header'>
                My Workspace
              </h1>
              <button
                className="console__toggle"
                onClick={this.props.toggleWorkspace}
              >
                X
              </button>
            </div>
            {this.props.isWorkspaceOpen && (
              <div>
                <EditorToolbar
                  currentFile={this.props.currentFile}
                  editorMode={this.props.editorMode}
                  files={this.props.files}
                  isPlaying={this.props.isPlaying}
                  playCode={this.props.playCode}
                  setCurrentFile={this.props.setCurrentFile}
                  startCodeRefresh={this.props.startCodeRefresh}
                  stopCode={this.props.stopCode}
                  container='workspace'
                  setEditorMode={this.props.setEditorMode}
                />
                <div className='workspace__container'>

                  <div className='workspace__sub-container'>
                    <SplitPane
                      split='vertical'
                      defaultSize={this.props.innerWidth}
                    >
                      <div className='workspace__input'>

                        <CodeEditor
                          currentFile={this.props.currentFile}
                          files={this.props.files}
                          updateFile={this.props.updateFile}
                          editorFontSize={this.props.editorFontSize}
                          editorTheme='light'
                        />
                        <ConsoleOutput
                          consoleOutputText={this.props.consoleOutputText}
                          isConsoleOpen
                          toggleConsole={this.toggleConsole}
                        />
                      </div>
                      <div className='workspace__output'>
                        <div
                          className='workspace__output-overlay'
                        >
                        </div>
                        { this.props.isPlaying && (
                          <CodeOutput
                            id='workspace'
                            clearConsoleOutput={this.props.clearConsoleOutput}
                            editorMode={this.props.editorMode}
                            files={this.props.files}
                            isPlaying={this.props.isPlaying}
                            isRefreshing={this.props.isRefreshing}
                            stopCodeRefresh={this.props.stopCodeRefresh}
                            updateConsoleOutput={this.updateConsoleOutput}
                          />
                        )}
                      </div>
                    </SplitPane>
                  </div>


                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    );
  }
}

Workspace.propTypes = {
  isWorkspaceOpen: PropTypes.bool.isRequired,
  consoleOutputText: PropTypes.string.isRequired,
  currentFile: PropTypes.number.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  editorMode: PropTypes.string.isRequired,
  innerWidth: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  playCode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  clearConsoleOutput: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setInnerWidth: PropTypes.func.isRequired,
  setInnerHeight: PropTypes.func.isRequired,
  toggleWorkspace: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isWorkspaceOpen: state.workspace.isWorkspaceOpen,
  consoleOutputText: state.workspace.workspace.consoleOutputText,
  currentFile: state.workspace.workspace.currentFile,
  files: state.workspace.workspace.files,
  isPlaying: state.workspace.workspace.isPlaying,
  isRefreshing: state.workspace.workspace.isRefreshing,
  editorMode: state.workspace.workspace.editorMode,
  innerWidth: state.workspace.workspace.innerWidth,
  innerHeight: state.workspace.workspace.innerHeight,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...workspaceAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
