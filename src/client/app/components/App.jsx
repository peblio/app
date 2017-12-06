import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rnd from 'react-rnd';

import ConsoleOutput from './ConsoleOutput.jsx';
import EditorContainer from './EditorContainer.jsx';
import Iframe from './Iframe.jsx';
import Login from './Login.jsx';
import MainToolbar from './MainToolbar.jsx';
import Modal from './Modal.jsx';
import PagesList from './PagesList.jsx';
import SignUp from './SignUp.jsx';
import TextEditor from './TextEditor.jsx';

import * as editorActions from '../action/editorContainer.jsx';
import * as iframeActions from '../action/iframe.jsx';
import * as mainToolbarActions from '../action/mainToolbar.jsx';
import * as textEditorActions from '../action/textEditors.jsx';
import * as userActions from '../action/user.jsx';

const axios = require('axios');
const Regex = require('regex');

const divStyle = {
  background: 'maroon'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditors = this.renderEditors.bind(this);
    this.projectID = this.projectID.bind(this);
  }
  projectID() {
    let location = this.props.location.pathname;
    let projectID = location.match(/\/page\/([\w-].*)/);
    return projectID ? projectID[1] : null;
  }
  componentDidMount() {
    if(this.projectID()){
      axios.get('/api/page/'+ this.projectID())
        .then(res => {
        this.props.loadPage(res.data[0].id, res.data[0].title);
        this.props.loadEditors(res.data[0].indexEditor, res.data[0].editors);
        this.props.loadTextEditors(res.data[0].indexTextEditor, res.data[0].textEditors);
        this.props.loadIframes(res.data[0].indexIframe, res.data[0].iframes);
        })
    }
    axios.get('/api/user')
      .then((res) => {
        if(res.data.name) {
          this.props.setUserName(res.data.name);
        }
      })
  }

  renderEditors() {

    let editorsHTML = [];
    let ids = Object.keys(this.props.editors);
    ids.forEach((id) => {
      let extendsProps = {
        onMouseOver: () => {
          this.props.setCurrentEditor(id)
        }
      };
      let dragHandle = '.drag__' + id;
      editorsHTML.push(
        <Rnd
          className="resize-container"
          size={{ width: this.props.editors[id].width,  height: this.props.editors[id].height }}
          position={{ x: this.props.editors[id].x, y: this.props.editors[id].y }}
          onDragStop={(e, d) => {this.props.setEditorPosition(d.x, d.y)}}
          dragHandleClassName={dragHandle}
          onResize={(e, direction, ref, delta, position) => {
            this.props.setEditorSize(ref.offsetWidth, ref.offsetHeight)
          }}
          minWidth={this.props.editors[id].minWidth}
          minHeight={this.props.editors[id].minHeight}
          extendsProps={extendsProps}
        >
          <EditorContainer
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
          />
        </Rnd>
      );
    });
    return editorsHTML;
  }

  renderTextEditors() {
    let textEditors = [];


    let ids = Object.keys(this.props.textEditors);
    ids.forEach((id) => {
      let extendsProps = {
        onMouseOver: () => {
          this.props.setCurrentTextEditor(this.props.textEditors[id].id, this.props.textEditors[id].editorState)
        }
      };
      let dragHandle = '.drag__' + id;
      textEditors.push(
        <Rnd
          className="resize-container"
          size={{ width: this.props.textEditors[id].width,  height: this.props.textEditors[id].height }}
          position={{ x: this.props.textEditors[id].x, y: this.props.textEditors[id].y }}
          onDragStop={(e, d) => {console.log("hi");this.props.setTextEditorPosition(d.x, d.y)}}
          dragHandleClassName={dragHandle}
          onResize={(e, direction, ref, delta, position) => {
            this.props.setTextEditorSize(ref.offsetWidth, ref.offsetHeight)
          }}
          minWidth={this.props.textEditors[id].minWidth}
          minHeight={this.props.textEditors[id].minHeight}
          extendsProps={extendsProps}
        >
          <TextEditor
            key={id}
            editorState={this.props.textEditors[id].editorState}
            onChange={this.props.updateTextChange}
            ref={this.props.textEditors[id].id}
            id={this.props.textEditors[id].id}
            currentTextEditorState={this.props.currentTextEditorState}
            currentTextEditorId={this.props.currentTextEditorId}
            setCurrentTextEditor={this.props.setCurrentTextEditor}
            removeTextEditor={this.props.removeTextEditor}
          />
        </Rnd>
      );
    });

    return textEditors;
  }

  renderIframes() {
    let iframes = [];
    let ids = Object.keys(this.props.iframes);
    ids.forEach((id) => {
      let extendsProps = {
        onMouseOver: () => {
          this.props.setCurrentIframe(id);
        }
      };
      let dragHandle = '.drag__' + id;
      iframes.push(
        <Rnd
          className="resize-container"
          size={{ width: this.props.iframes[id].width,  height: this.props.iframes[id].height }}
          position={{ x: this.props.iframes[id].x, y: this.props.iframes[id].y }}
          onDragStop={(e, d) => {this.props.setIframePosition(d.x, d.y)}}
          dragHandleClassName={dragHandle}
          onResize={(e, direction, ref, delta, position) => {
            this.props.setIframeSize(ref.offsetWidth, ref.offsetHeight)
          }}
          minWidth={this.props.iframes[id].minWidth}
          minHeight={this.props.iframes[id].minHeight}
          extendsProps={extendsProps}
        >
          <Iframe
            key={id}
            id={id}
            setIframeURL={this.props.setIframeURL}
            iframeURL={this.props.iframes[id].url}
            setCurrentIframe={this.props.setCurrentIframe}
            removeIframe={this.props.removeIframe}
          />
        </Rnd>
      );
    });
    return iframes;
  }

  render() {
    const Editors = this.renderEditors();
    const TextEditors = this.renderTextEditors();
    const Iframes = this.renderIframes();
    return (
      <div>
        <nav>
          <MainToolbar
            id={this.props.id}
            addEditor = {this.props.addEditor}
            addIframe = {this.props.addIframe}
            addTextEditor = {this.props.addTextEditor}
            currentTextEditorState = {this.props.currentTextEditorState}
            editors={this.props.editors}
            iframes={this.props.iframes}
            indexEditor={this.props.indexEditor}
            indexIframe={this.props.indexIframe}
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
          {Editors}
          {TextEditors}
          {Iframes}
        </section>
        {(() => { // eslint-disable-line
          if(this.props.isPagesModalOpen) {
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
                  loginName={this.props.loginName}
                  loginPassword={this.props.loginPassword}
                  updateUserName={this.props.updateUserName}
                  updateUserPassword={this.props.updateUserPassword}
                  setUserName={this.props.setUserName}
                  closeLoginModal={this.props.closeLoginModal}
                />
              </Modal>
            );
          }
        })()}
        {(() => { // eslint-disable-line
          if (this.props.isSignUpModalOpen) {
            return (
              <Modal
                isOpen={this.props.isSignUpModalOpen}
                closeModal={this.props.closeSignUpModal}
              >
                <SignUp
                  loginName={this.props.loginName}
                  loginPassword={this.props.loginPassword}
                  updateUserName={this.props.updateUserName}
                  updateUserPassword={this.props.updateUserPassword}
                  signUserUp={this.props.signUserUp}
                  setUserName={this.props.setUserName}
                  closeSignUpModal={this.props.closeSignUpModal}
                />
              </Modal>
            );
          }
        })()}
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
  iframes: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })),

  isPlaying: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  addEditor: PropTypes.func.isRequired,
  indexEditor: PropTypes.number.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired,
  loadEditors: PropTypes.func.isRequired,
  setEditorSize: PropTypes.func.isRequired,
  setEditorPosition: PropTypes.func.isRequired,

  addIframe: PropTypes.func.isRequired,
  setCurrentIframe: PropTypes.func.isRequired,
  removeIframe: PropTypes.func.isRequired,
  setIframeSize: PropTypes.func.isRequired,
  setIframePosition: PropTypes.func.isRequired,

  addTextEditor: PropTypes.func.isRequired,
  indexTextEditor: PropTypes.number.isRequired,
  updateTextChange: PropTypes.func.isRequired,
  currentTextEditorState: PropTypes.object,
  setCurrentTextEditor: PropTypes.func.isRequired,
  removeTextEditor: PropTypes.func.isRequired,
  loadTextEditors: PropTypes.func.isRequired,
  setTextEditorSize: PropTypes.func.isRequired,
  setTextEditorPosition: PropTypes.func.isRequired,

  setPageTitle: PropTypes.func.isRequired,
  submitPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  loadPage: PropTypes.func.isRequired,
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
  loginName: PropTypes.string.isRequired,
  loginPassword: PropTypes.string.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired,
  signUserUp: PropTypes.func.isRequired
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

    currentIframeId: state.iframe.currentIframeId,
    iframes: state.iframe.iframes,
    indexIframe: state.iframe.indexIframe,

    pageTitle: state.mainToolbar.pageTitle,
    id: state.mainToolbar.id,
    pages: state.mainToolbar.pages,
    name: state.user.name,
    loginName: state.user.loginName,
    loginPassword: state.user.loginPassword,

    isPagesModalOpen: state.mainToolbar.isPagesModalOpen,
    isLoginModalOpen: state.mainToolbar.isLoginModalOpen,
    isSignUpModalOpen: state.mainToolbar.isSignUpModalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    editorActions,
    iframeActions,
    mainToolbarActions,
    textEditorActions,
    userActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(App));
