import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditorContainer from './EditorContainer.jsx';
import Test from './Test.jsx';
import TextEditor from './TextEditor.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';
import MainToolbar from './MainToolbar.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

import * as editorActions from '../action/editorContainer.jsx';
import * as textEditorActions from '../action/textEditors.jsx';
import * as mainToolbarActions from '../action/mainToolbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditors = this.renderEditors.bind(this);
  }
  componentDidUpdate() {
  }

  renderEditors() {
    let editorsHTML = [];
    let ids = Object.keys(this.props.editors);
    ids.forEach((id) => {
      editorsHTML.push(<EditorContainer
        key={id}
        editorId={id}
        playCode = {this.props.playCode}
        stopCode = {this.props.stopCode}
        updateCode = {this.props.updateCode}
        isPlaying = {this.props.editors[id].isPlaying}
        editorMode = {this.props.editors[id].editorMode}
        consoleOutputText = {this.props.editors[id].consoleOutputText}
        code = {this.props.editors[id].code}
        setCurrentEditor = {this.props.setCurrentEditor}
        setEditorMode = {this.props.setEditorMode}
        updateConsoleOutput = {this.props.updateConsoleOutput}
        removeEditor = {this.props.removeEditor}
      />);
    });
    return editorsHTML;
  }

  renderTextEditors() {
    let textEditors = [];
    let ids = Object.keys(this.props.textEditors);
    ids.forEach((id) => {
      textEditors.push(<TextEditor
        key={id}
        editorState={this.props.textEditors[id].editorState}
        onChange={this.props.updateTextChange}
        ref={this.props.textEditors[id].id}
        id={this.props.textEditors[id].id}
        currentTextEditorState={this.props.currentTextEditorState}
        currentTextEditorId={this.props.currentTextEditorId}
        setCurrentTextEditor={this.props.setCurrentTextEditor}
        removeTextEditor={this.props.removeTextEditor}
      />);
    });

    return textEditors;
  }

  render() {
    const Editors = this.renderEditors();
    const TextEditors = this.renderTextEditors();
    return (
      <div>
        <nav>
          <MainToolbar
            setPageTitle={this.props.setPageTitle}
            addEditor = {this.props.addEditor}
            addTextEditor = {this.props.addTextEditor}
            currentTextEditorState = {this.props.currentTextEditorState}
            onChange={this.props.updateTextChange}
          />
        </nav>
        <section className="canvas">
          <div>
            {Editors}
          </div>
          <div>
            {TextEditors}
          </div>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  editors: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    consoleOutputText: PropTypes.arrayOf(PropTypes.string),
    code: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    editorMode: PropTypes.string.isRequired,
  })),
  textEditors: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    editorState: PropTypes.object
  })),
  isPlaying: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  addEditor: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  indexEditor: PropTypes.number.isRequired,
  indexTextEditor: PropTypes.number.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  updateTextChange: PropTypes.func.isRequired,
  currentTextEditorState: PropTypes.object,
  setCurrentTextEditor: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  removeTextEditor: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isPlaying: state.editorContainer.isPlaying,
    editors: state.editorContainer.editors,
    indexEditor: state.editorContainer.indexEditor,
    currentEditorId: state.editorContainer.currentEditorId,
    textEditors: state.textEditors.textEditors,
    indexTextEditor: state.textEditors.indexTextEditor,
    currentTextEditorId: state.textEditors.currentTextEditorId,
    currentTextEditorState: state.textEditors.currentTextEditorState,
    textEditorIndex: state.textEditors.textEditorIndex,
    styleMap: state.textEditors.styleMap,
    pageTitle: state.mainToolbar.pageTitle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    editorActions,
    textEditorActions,
    mainToolbarActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(App));
