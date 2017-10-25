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
            _onBoldClick = {this._onBoldClick}
            _onItalicClick = {this._onItalicClick}
            _onUnderlineClick = {this._onUnderlineClick}
            _onCodeClick = {this._onCodeClick}
            _onFontChange = {this._onFontChange}
            _onFontfaceChange = {this._onFontfaceChange}
            addEditor = {this.props.addEditor}
            addTextEditor = {this.props.addTextEditor}
          />
        </nav>
        <div>
          {Editors}
        </div>
        <div>
          {TextEditors}
        </div>
      </div>
    );
  }
}

App.propTypes = {
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
  noOfEditors: PropTypes.number.isRequired,
  noOfTextEditors: PropTypes.number.isRequired,
  currentEditorId: PropTypes.string.isRequired,
  currentTextEditorId: PropTypes.string.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  updateTextChange: PropTypes.func.isRequired,
  currentTextEditorState: PropTypes.object
}

function mapStateToProps(state) {
  return {
    isPlaying: state.editorContainer.isPlaying,
    editors: state.editorContainer.editors,
    noOfEditors: state.editorContainer.noOfEditors,
    currentEditorId: state.editorContainer.currentEditorId,
    textEditors: state.textEditors.textEditors,
    noOfTextEditors: state.textEditors.noOfTextEditors,
    currentTextEditorId: state.textEditors.currentTextEditorId,
    currentTextEditorState: state.textEditors.currentTextEditorState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    editorActions,
    textEditorActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(App));
