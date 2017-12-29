import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Canvas from './Canvas.jsx';
import Login from './Login.jsx';
import MainToolbar from './MainToolbar.jsx';
import Modal from './Modal.jsx';
import PagesList from './PagesList.jsx';
import SignUp from './SignUp.jsx';
import TextEditor from './TextEditor.jsx';

import * as editorActions from '../action/editorContainer.jsx';
import * as iframeActions from '../action/iframe.jsx';
import * as mainToolbarActions from '../action/mainToolbar.jsx';
import * as pageActions from '../action/page.jsx';
import * as textEditorActions from '../action/textEditors.jsx';
import * as userActions from '../action/user.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authPage = this.authPage.bind(this);
    this.projectID = this.projectID.bind(this);
  }

  componentDidMount() {
    this.authPage();
  }

  authPage() {
    if (this.projectID()) {
      this.props.setEditAccess(false);
      const projectID = this.projectID();
      axios.get(`/api/page/${this.projectID()}`)
        .then((res) => {
          this.props.loadPage(res.data[0].id, res.data[0].title);
          this.props.loadEditors(res.data[0].indexEditor, res.data[0].editors);
          this.props.loadTextEditors(res.data[0].indexTextEditor, res.data[0].textEditors);
          this.props.loadIframes(res.data[0].indexIframe, res.data[0].iframes);
          axios.get('/api/user')
            .then((res1) => {
              if (res1.data.pages) {
                if (res1.data.pages.includes(projectID)) {
                  this.props.setEditAccess(true);
                }
              }
            });
        });
    }
    axios.get('/api/user')
      .then((res) => {
        if (res.data.name) {
          this.props.setUserName(res.data.name);
        }
      });
  }
  projectID() {
    const location = this.props.location.pathname;
    const projectID = location.match(/\/pebl\/([\w-].*)/);
    return projectID ? projectID[1] : null;
  }

  render() {
    return (
      <div>
        <nav>
          <MainToolbar
            id={this.props.id}
            addEditor={this.props.addEditor}
            addIframe={this.props.addIframe}
            addTextEditor={this.props.addTextEditor}
            canEdit={this.props.canEdit}
            currentTextEditorState={this.props.currentTextEditorState}
            editors={this.props.editors}
            iframes={this.props.iframes}
            indexEditor={this.props.indexEditor}
            indexIframe={this.props.indexIframe}
            indexTextEditor={this.props.indexTextEditor}
            isFileDropdownOpen={this.props.isFileDropdownOpen}
            name={this.props.name}
            onChange={this.props.updateTextChange}
            pageTitle={this.props.pageTitle}
            setAllPages={this.props.setAllPages}
            setPageTitle={this.props.setPageTitle}
            setUnsavedChanges={this.props.setUnsavedChanges}
            submitPage={this.props.submitPage}
            textEditors={this.props.textEditors}
            toggleFileDropdown={this.props.toggleFileDropdown}
            unsavedChanges={this.props.unsavedChanges}
            updatePage={this.props.updatePage}
            viewPagesModal={this.props.viewPagesModal}
            viewLoginModal={this.props.viewLoginModal}
            viewSignUpModal={this.props.viewSignUpModal}
          />
        </nav>
        <Canvas
          setUnsavedChanges={this.props.setUnsavedChanges}

          editors={this.props.editors}
          textEditors={this.props.textEditors}
          iframes={this.props.iframes}
          isPlaying={this.props.isPlaying}
          playCode={this.props.playCode}
          stopCode={this.props.stopCode}
          updateCode={this.props.updateCode}
          setCurrentEditor={this.props.setCurrentEditor}
          updateConsoleOutput={this.props.updateConsoleOutput}
          setEditorMode={this.props.setEditorMode}
          removeEditor={this.props.removeEditor}
          setEditorSize={this.props.setEditorSize}
          setEditorPosition={this.props.setEditorPosition}

          removeIframe={this.props.removeIframe}
          setCurrentIframe={this.props.setCurrentIframe}
          setIframePosition={this.props.setIframePosition}
          setIframeSize={this.props.setIframeSize}
          setIframeURL={this.props.setIframeURL}

          currentTextEditorId={this.props.currentTextEditorId}
          currentTextEditorState={this.props.currentTextEditorState}
          removeTextEditor={this.props.removeTextEditor}
          setCurrentTextEditor={this.props.setCurrentTextEditor}
          setTextEditorSize={this.props.setTextEditorSize}
          setTextEditorPosition={this.props.setTextEditorPosition}
          updateTextChange={this.props.updateTextChange}
        />
        {(()=> { // eslint-disable-line
          if (this.props.isPagesModalOpen) {
            return (
              <Modal
                isOpen={this.props.isPagesModalOpen}
                closeModal={this.props.closePagesModal}
              >
                <PagesList
                  pages={this.props.pages}
                  deletePage={this.props.deletePage}
                  setAllPages={this.props.setAllPages}
                />
              </Modal>
            );
          }
        })()}
        {(()=> { // eslint-disable-line
          if (this.props.isLoginModalOpen) {
            return (
              <Modal
                isOpen={this.props.isLoginModalOpen}
                closeModal={this.props.closeLoginModal}
              >
                <Login
                  authPage={this.authPage}
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
        {(()=> { // eslint-disable-line
          if (this.props.isSignUpModalOpen) {
            return (
              <Modal
                isOpen={this.props.isSignUpModalOpen}
                closeModal={this.props.closeSignUpModal}
              >
                <SignUp
                  authPage={this.authPage}
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
  location: PropTypes.shape.isRequired,
  pages: PropTypes.arrayOf.isRequired,
  id: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  editors: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    consoleOutputText: PropTypes.arrayOf(PropTypes.string),
    code: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    editorMode: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    minWidth: PropTypes.number.isRequired,
    minHeight: PropTypes.number.isRequired
  })).isRequired,
  textEditors: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    editorState: PropTypes.shape,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    minWidth: PropTypes.number.isRequired,
    minHeight: PropTypes.number.isRequired
  })).isRequired,
  iframes: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    minWidth: PropTypes.number.isRequired,
    minHeight: PropTypes.number.isRequired
  })).isRequired,

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
  indexIframe: PropTypes.number.isRequired,
  loadIframes: PropTypes.func.isRequired,
  removeIframe: PropTypes.func.isRequired,
  setCurrentIframe: PropTypes.func.isRequired,
  setIframePosition: PropTypes.func.isRequired,
  setIframeSize: PropTypes.func.isRequired,
  setIframeURL: PropTypes.func.isRequired,

  addTextEditor: PropTypes.func.isRequired,
  currentTextEditorId: PropTypes.string.isRequired,
  currentTextEditorState: PropTypes.shape.isRequired,
  indexTextEditor: PropTypes.number.isRequired,
  loadTextEditors: PropTypes.func.isRequired,
  removeTextEditor: PropTypes.func.isRequired,
  setCurrentTextEditor: PropTypes.func.isRequired,
  setTextEditorSize: PropTypes.func.isRequired,
  setTextEditorPosition: PropTypes.func.isRequired,
  updateTextChange: PropTypes.func.isRequired,

  setPageTitle: PropTypes.func.isRequired,
  submitPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  loadPage: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  setAllPages: PropTypes.func.isRequired,
  setEditAccess: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  setUnsavedChanges: PropTypes.func.isRequired,
  unsavedChanges: PropTypes.bool.isRequired,

  isPagesModalOpen: PropTypes.bool.isRequired,
  viewPagesModal: PropTypes.func.isRequired,
  closePagesModal: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  isLoginModalOpen: PropTypes.bool.isRequired,
  isSignUpModalOpen: PropTypes.bool.isRequired,
  isFileDropdownOpen: PropTypes.bool.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,

  name: PropTypes.string.isRequired,
  loginName: PropTypes.string.isRequired,
  loginPassword: PropTypes.string.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired,
  signUserUp: PropTypes.func.isRequired
};

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

    pageTitle: state.page.pageTitle,
    id: state.page.id,
    pages: state.page.pages,
    unsavedChanges: state.page.unsavedChanges,

    canEdit: state.user.canEdit,
    loginName: state.user.loginName,
    loginPassword: state.user.loginPassword,
    name: state.user.name,

    isFileDropdownOpen: state.mainToolbar.isFileDropdownOpen,
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
    pageActions,
    textEditorActions,
    userActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(App));
