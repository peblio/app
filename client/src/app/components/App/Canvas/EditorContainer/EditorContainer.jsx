import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditorToolbar from '../../Shared/EditorComponents/EditorToolbar/EditorToolbar.jsx';
import EditorFiles from '../../Shared/EditorComponents/EditorFiles/EditorFiles.jsx';
import * as editorActions from '../../../../action/editors.js';
import { setYPosition } from '../../../../action/navigation.js';
import SplitEditorContainer from './EditorViews/SplitEditorContainer.jsx';
import TabbedEditorContainer from './EditorViews/TabbedEditorContainer.jsx';

require('./editorContainer.scss');
require('./resizer.scss');

class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isResizing: false,
      isConsoleOpen: true
    };
    this.startResize = this.startResize.bind(this);
    this.finishResize = this.finishResize.bind(this);
    this.addMediaFile = (name, link) => this.props.addMediaFile(this.props.id, name, link);
    this.addFileToEditor = (name, content) => this.props.addFileToEditor(this.props.id, name, content);
    this.deleteFileFromEditor = index => this.props.deleteFileFromEditor(this.props.id, index);
    this.playCode = () => this.props.playCode(this.props.id);
    this.stopCode = () => this.props.stopCode(this.props.id);
    this.setEditorView = value => this.props.setEditorView(this.props.id, value);
    this.setInnerWidth = value => this.props.setInnerWidth(this.props.id, value);
    this.startCodeRefresh = () => this.props.startCodeRefresh(this.props.id);
    this.stopCodeRefresh = () => this.props.stopCodeRefresh(this.props.id);
    this.updateFile = (index, file) => this.props.updateFile(this.props.id, index, file);
    this.setCurrentFile = index => this.props.setCurrentFile(this.props.id, index);
    this.clearConsoleOutput = () => this.props.clearConsoleOutput(this.props.id);
    this.updateConsoleOutput = (e) => {
      // UPDATE: 29-Oct-18 : Not using Javascript editor now, but keep in mind if added
      // Dec-17 : There's a memory leak in the Javascript editor. Watch the console after clicking Play.
      this.props.updateConsoleOutput(this.props.id, e);
    };
    this.viewEditorPreview = () => this.props.viewEditorPreview(this.props.id);
  }

  toggleConsole = () => {
    this.setState(prevState => ({ isConsoleOpen: !prevState.isConsoleOpen }));
  }

  editorView = () => this.props.editorView || 'split'

  startResize() {
    this.setState({ isResizing: true });
  }

  finishResize() {
    this.setState({ isResizing: false });
  }


  render() {
    const themeClass = classNames('editor__total-container', {
      editor__dark: (this.props.editorTheme === 'dark'),
      editor__light: (this.props.editorTheme === 'light'),
    });
    return (
      <div>
        <div className={classNames(themeClass)} data-test={`code-editor-${this.props.editorMode}`}>
          <EditorToolbar
            id={this.props.id}
            addMediaFile={this.addMediaFile}
            addFileToEditor={this.addFileToEditor}
            container="canvas"
            currentFile={this.props.currentFile}
            deleteFileFromEditor={this.deleteFileFromEditor}
            editorMode={this.props.editorMode}
            editorView={this.props.editorView}
            files={this.props.files}
            isConsoleOpen={this.state.isConsoleOpen}
            isPlaying={this.props.isPlaying}
            isWidgetFullScreenMode={this.props.isWidgetFullScreenMode}
            name={this.props.name}
            playCode={this.playCode}
            setCurrentFile={this.setCurrentFile}
            setEditorView={this.setEditorView}
            setYPosition={this.props.setYPosition}
            startCodeRefresh={this.startCodeRefresh}
            stopCode={this.stopCode}
            toggleConsole={this.toggleConsole}
            toggleWidgetFullscreen={this.props.toggleWidgetFullscreen}
            viewEditorPreview={this.viewEditorPreview}
          />
          <div className='editor__vertical-container'>
            <EditorFiles
              id={this.props.id}
              addMediaFile={this.addMediaFile}
              addFileToEditor={this.addFileToEditor}
              container="canvas"
              currentFile={this.props.currentFile}
              deleteFileFromEditor={this.deleteFileFromEditor}
              editorMode={this.props.editorMode}
              editorView={this.props.editorView}
              files={this.props.files}
              isConsoleOpen={this.state.isConsoleOpen}
              isPlaying={this.props.isPlaying}
              isWidgetFullScreenMode={this.props.isWidgetFullScreenMode}
              name={this.props.name}
              playCode={this.playCode}
              setCurrentFile={this.setCurrentFile}
              setEditorView={this.setEditorView}
              setYPosition={this.props.setYPosition}
              startCodeRefresh={this.startCodeRefresh}
              stopCode={this.stopCode}
              toggleConsole={this.toggleConsole}
              toggleWidgetFullscreen={this.props.toggleWidgetFullscreen}
              viewEditorPreview={this.viewEditorPreview}
            />
            {this.editorView() === 'split' && (
              <SplitEditorContainer
                innerWidth={this.props.innerWidth}
                startResize={this.startResize}
                finishResize={this.finishResize}
                setInnerWidth={this.setInnerWidth}
                currentFile={this.props.currentFile}
                files={this.props.files}
                updateFile={this.updateFile}
                isConsoleOpen={this.state.isConsoleOpen}
                isResizing={this.state.isResizing}
                id={this.props.id}
                clearConsoleOutput={this.clearConsoleOutput}
                editorMode={this.props.editorMode}
                isPlaying={this.props.isPlaying}
                isRefreshing={this.props.isRefreshing}
                stopCodeRefresh={this.stopCodeRefresh}
                updateConsoleOutput={this.updateConsoleOutput}
                consoleOutputText={this.props.consoleOutputText}
                toggleConsole={this.toggleConsole}
              />
            )}
            {this.editorView() === 'tabbed' && (
              <TabbedEditorContainer
                innerWidth={this.props.innerWidth}
                startResize={this.startResize}
                finishResize={this.finishResize}
                setInnerWidth={this.setInnerWidth}
                currentFile={this.props.currentFile}
                files={this.props.files}
                updateFile={this.updateFile}
                isConsoleOpen={this.state.isConsoleOpen}
                isResizing={this.state.isResizing}
                id={this.props.id}
                clearConsoleOutput={this.clearConsoleOutput}
                editorMode={this.props.editorMode}
                isPlaying={this.props.isPlaying}
                isRefreshing={this.props.isRefreshing}
                stopCodeRefresh={this.stopCodeRefresh}
                updateConsoleOutput={this.updateConsoleOutput}
                consoleOutputText={this.props.consoleOutputText}
                toggleConsole={this.toggleConsole}
              />
            )}
          </div>
        </div>

      </div>
    );
  }
}

EditorContainer.propTypes = {
  id: PropTypes.string.isRequired,
  addMediaFile: PropTypes.func.isRequired,
  addFileToEditor: PropTypes.func.isRequired,
  clearConsoleOutput: PropTypes.func.isRequired,
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFile: PropTypes.number.isRequired,
  deleteFileFromEditor: PropTypes.func.isRequired,
  editorMode: PropTypes.string.isRequired,
  editorTheme: PropTypes.string.isRequired,
  editorView: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  innerWidth: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  isWidgetFullScreenMode: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  playCode: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setEditorView: PropTypes.func.isRequired,
  setInnerWidth: PropTypes.func.isRequired,
  setYPosition: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  toggleWidgetFullscreen: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
  viewEditorPreview: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
    editorTheme: state.preferences.editorTheme
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  ...editorActions,
  setYPosition
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
