import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import SplitPane from 'react-split-pane';

import * as workspaceAction from '../../../action/workspace.js';
import { submitPage } from '../../../action/page.js';
import CodeEditor from '../Shared/EditorComponents/CodeEditor/CodeEditor.jsx';
import CodeOutput from '../Shared/EditorComponents/CodeOutput/CodeOutput.jsx';
import EditorToolbar from '../Shared/EditorComponents/EditorToolbar/EditorToolbar.jsx';
import ConsoleOutput from '../Shared/EditorComponents/ConsoleOutput/ConsoleOutput.jsx';
import ShareWorkspace from '../Modal/ShareWorkspace/ShareWorkspace.jsx';
import Modal from '../Modal/Modal.jsx';

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
    const themeClass = classNames('workspace__total-container', {
      'editor__dark': (this.props.editorTheme === 'dark'),
      'editor__light': (this.props.editorTheme === 'light'),
      'workspace__total-container--open': (this.props.isWorkspaceOpen === true)
    });
    return (
      <section>
        <div>
          <div className={classNames(themeClass)}>
            <div className='workspace__header-container'>
              <h1 className='workspace__header'>
                My Workspace
              </h1>
              <button
                className="workspace__toggle"
                onClick={this.props.toggleWorkspace}
              >
                {this.props.isWorkspaceOpen &&
                <i className="fas fa-caret-down"></i>
                }
                {this.props.isWorkspaceOpen ||
                <i className="fas fa-caret-up"></i>
                }
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
                  openShareWorkspace={this.props.openShareWorkspace}
                />
                <div className='workspace__container'>

                  <div className='workspace__sub-container'>
                    <SplitPane
                      split='vertical'
                      defaultSize={this.props.innerWidth}
                      onDragStarted={this.startResize}
                      onDragFinished={(size) => { this.finishResize(); this.props.setInnerWidth(size); }}
                    >
                      <div className='workspace__input'>

                        <CodeEditor
                          currentFile={this.props.currentFile}
                          files={this.props.files}
                          updateFile={this.props.updateFile}
                          editorFontSize={this.props.editorFontSize}
                          editorTheme={this.props.editorTheme}
                          container='workspace'
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
        <Modal
          size="auto"
          isOpen={this.props.isShareWorkspaceOpen}
          closeModal={this.props.closeShareWorkspace}
        >
          <ShareWorkspace
            closeModal={this.props.closeShareWorkspace}
            workspace={this.props.workspace}
            submitPage={this.props.submitPage}
          />
        </Modal>
      </section>
    );
  }
}

Workspace.propTypes = {
  clearConsoleOutput: PropTypes.func.isRequired,
  consoleOutputText: PropTypes.string.isRequired,
  currentFile: PropTypes.number.isRequired,
  editorFontSize: PropTypes.number.isRequired,
  editorMode: PropTypes.string.isRequired,
  editorTheme: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  innerWidth: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  isWorkspaceOpen: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setInnerHeight: PropTypes.func.isRequired,
  setInnerWidth: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  submitPage: PropTypes.func.isRequired,
  toggleWorkspace: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  consoleOutputText: state.workspace.workspace.consoleOutputText,
  currentFile: state.workspace.workspace.currentFile,
  editorFontSize: state.preferences.editorFontSize,
  editorMode: state.workspace.workspace.editorMode,
  editorTheme: state.preferences.editorTheme,
  files: state.workspace.workspace.files,
  innerWidth: state.workspace.workspace.innerWidth,
  innerHeight: state.workspace.workspace.innerHeight,
  isPlaying: state.workspace.workspace.isPlaying,
  isRefreshing: state.workspace.workspace.isRefreshing,
  isShareWorkspaceOpen: state.workspace.isShareWorkspaceOpen,
  isWorkspaceOpen: state.workspace.isWorkspaceOpen,
  workspace: state.workspace.workspace
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...workspaceAction,
  submitPage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
