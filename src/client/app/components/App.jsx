import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConsoleOutput from './ConsoleOutput.jsx';
import EditorContainer from './EditorContainer.jsx';
import Login from './Login.jsx';
import MainToolbar from './MainToolbar.jsx';
import Modal from './Modal.jsx';
import PagesList from './PagesList.jsx';
import TextEditor from './TextEditor.jsx';

import * as editorActions from '../action/editorContainer.jsx';
import * as mainToolbarActions from '../action/mainToolbar.jsx';
import * as textEditorActions from '../action/textEditors.jsx';
import * as userActions from '../action/user.jsx';

const axios = require('axios');
const Regex = require('regex');

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

            addEditor = {this.props.addEditor}
            addTextEditor = {this.props.addTextEditor}
            currentTextEditorState = {this.props.currentTextEditorState}
            editors={this.props.editors}
            indexEditor={this.props.indexEditor}
            indexTextEditor={this.props.indexTextEditor}
            name={this.props.name}
            onChange={this.props.updateTextChange}
            pageTitle={this.props.pageTitle}
            setAllPages={this.props.setAllPages}
            setPageTitle={this.props.setPageTitle}
            submitPage={this.props.submitPage}
            textEditors={this.props.textEditors}
            updatePage={this.props.updatePage}
            viewPagesModal={this.props.viewPagesModal}
            viewLoginModal={this.props.viewLoginModal}
            viewSignUpModal={this.props.viewSignUpModal}
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
            if (this.props.isPagesModalOpen) {
              return (
                <Modal
                  isOpen={this.props.isPagesModalOpen}
                  closeModal={this.props.closePagesModal}
                >
                  <PagesList
                    pages={this.props.pages}
                    setAllPages={this.props.setAllPages}
                  />
                </Modal>
              );
            }
          })()}
          {(() => { // eslint-disable-line
            if (this.props.isLoginModalOpen) {
              return (
                <Modal
                  isOpen={this.props.isLoginModalOpen}
                  closeModal={this.props.closeLoginModal}
                >
                  <Login
                    name={this.props.name}
                    password={this.props.password}
                    updateUserName={this.props.updateUserName}
                    updateUserPassword={this.props.updateUserPassword}
                    loginUser={this.props.loginUser}
                  />
                </Modal>
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
  setAllPages: PropTypes.func.isRequired,
  isPagesModalOpen: PropTypes.bool.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  closePagesModal: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
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
    pages: state.mainToolbar.pages,
    name: state.user.name,
    password: state.user.password,
    isPagesModalOpen: state.mainToolbar.isPagesModalOpen,
    isLoginModalOpen: state.mainToolbar.isLoginModalOpen,
    isSignUpModalOpen: state.mainToolbar.isSignUpModalOpen,
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
