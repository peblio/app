import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditorContainer from './EditorContainer.jsx';
import TextEditor from './TextEditor.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';
import MainToolbar from './MainToolbar.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

import * as editorActions from '../action/editorContainer.jsx';
import * as textEditorActions from '../action/textEditors.jsx';
import * as mainToolbarActions from '../action/mainToolbar.jsx';
import * as userActions from '../action/user.jsx';

const axios = require('axios');
const Regex = require("regex");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditors = this.renderEditors.bind(this);
  }
  componentDidMount() {
    let location = this.props.location.pathname;
    let projectID = location.match(/\/page\/([\w-].*)/);
    if(projectID){
      axios.get('/api/page/'+projectID[1])
        .then(res => {
        this.props.setDBPage(res.data[0].id,res.data[0].title);
        this.props.setDBEditors(res.data[0].indexEditor,res.data[0].editors);
        this.props.setDBTextEditors(res.data[0].indexTextEditor,res.data[0].textEditors);
        })
    }
    axios.get('/api/user')
      .then((res) => {
        console.log(res);
        if(res.data.name) {
          console.log(res.data.name);
          this.props.setUserName(res.data.name);
        }
      })
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
            id={this.props.id}
            setPageTitle={this.props.setPageTitle}
            addEditor = {this.props.addEditor}
            addTextEditor = {this.props.addTextEditor}
            currentTextEditorState = {this.props.currentTextEditorState}
            onChange={this.props.updateTextChange}
            submitPage={this.props.submitPage}
            updatePage={this.props.updatePage}
            pageTitle={this.props.pageTitle}
            editors={this.props.editors}
            indexEditor={this.props.indexEditor}
            textEditors={this.props.textEditors}
            indexTextEditor={this.props.indexTextEditor}
            name={this.props.name}
            getAllPages={this.props.getAllPages}
          />
        </nav>
        <section className="canvas">
          <div>
            {Editors}
          </div>
          <div>
            {TextEditors}
          </div>
          {(() => { // eslint-disable-line
            if (this.name && this.props.location.pathname.match(/pages$/)) {
              return (
                <div>
                  WORK!!!
                </div>
              );
            }
          })()}
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
  removeEditor: PropTypes.func.isRequired,
  submitPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  setDBPage: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  getAllPages: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
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
    id: state.mainToolbar.id,
    name: state.user.name
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    editorActions,
    textEditorActions,
    mainToolbarActions,
    userActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(App));
