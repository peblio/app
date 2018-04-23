import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Canvas from './Canvas.jsx';
import ExamplesModal from './ExamplesModal.jsx';
import Login from './Login.jsx';
import MainToolbar from './MainToolbar.jsx';
import Modal from './Modal.jsx';
import PagesList from './PagesList.jsx';
import ShareModal from './ShareModal.jsx';
import SignUp from './SignUp.jsx';

import * as editorActions from '../action/editors.jsx';
import * as mainToolbarActions from '../action/mainToolbar.jsx';
import * as pageActions from '../action/page.jsx';
import * as userActions from '../action/user.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authAndLoadPage = this.authAndLoadPage.bind(this);
    this.authLoadedPage = this.authLoadedPage.bind(this);
    this.projectID = this.projectID.bind(this);
    this.savePage = this.savePage.bind(this);
  }

  componentDidMount() {
    this.authAndLoadPage();
  }

  onKeyPressed(e) {
    if (e.metaKey || e.ctrlKey) {
      switch (e.keyCode) {
        case 78: // n,N
          // new
          break;
        case 79: // o,O
          this.props.viewPagesModal();
          e.preventDefault();
          break;
        case 83: // s,S
          this.savePage();
          e.preventDefault();
          break;
        default:
          break;
      }
    }
  }

  projectID() {
    const location = this.props.location.pathname;
    const projectID = location.match(/\/pebl\/([\w-].*)/);
    return projectID ? projectID[1] : null;
  }

  authAndLoadPage() {
    if (this.projectID()) {
      this.props.setEditAccess(false);
      const projectID = this.projectID();
      axios.get(`/api/page/${this.projectID()}`)
        .then((res) => {
          this.props.loadPage(res.data[0].id, res.data[0].title, res.data[0].preview, res.data[0].layout);
          this.props.loadEditors(res.data[0].editors, res.data[0].editorIndex);
          axios.get('/api/user')
            .then((res1) => {
              if (res1.data.pages && res1.data.pages.includes(projectID)) {
                this.props.setEditAccess(true);
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

  authLoadedPage() {
    if (this.projectID()) {
      this.props.setEditAccess(false);
      const projectID = this.projectID();
      axios.get('/api/user')
        .then((res1) => {
          if (res1.data.pages && res1.data.pages.includes(projectID)) {
            this.props.setEditAccess(true);
          }
        });
    }
  }

  savePage() {
    if (this.props.name) {
      if (this.props.id.length === 0) {
        this.props.submitPage(
          '',
          this.props.pageTitle,
          this.props.preview,
          this.props.editors,
          this.props.editorIndex,
          this.props.layout
        );
      } else if (this.props.canEdit) {
        this.props.updatePage(
          this.props.id,
          this.props.pageTitle,
          this.props.preview,
          this.props.editors,
          this.props.editorIndex,
          this.props.layout
        );
      } else {
        // this is for fork and save
        this.props.submitPage(
          this.props.id,
          `${this.props.pageTitle}-copy`,
          this.props.preview,
          this.props.editors,
          this.props.editorIndex,
          this.props.layout
        );
      }
    } else {
      this.props.viewLoginModal();
    }
  }

  render() {
    return (
      <div // eslint-disable-line
        tabIndex="0"
        onKeyDown={this.onKeyPressed}
      >
        <nav className="main-nav">
          <MainToolbar
            addCodeEditor={this.props.addCodeEditor}
            addTextEditor={this.props.addTextEditor}
            addQuestionEditor={this.props.addQuestionEditor}
            addIframe={this.props.addIframe}
            addImage={this.props.addImage}
            canEdit={this.props.canEdit}
            isFileDropdownOpen={this.props.isFileDropdownOpen}
            isAccountDropdownOpen={this.props.isAccountDropdownOpen}
            name={this.props.name}
            pageTitle={this.props.pageTitle}
            preview={this.props.preview}
            projectID={this.projectID}
            setPageTitle={this.props.setPageTitle}
            savePage={this.savePage}
            toggleFileDropdown={this.props.toggleFileDropdown}
            toggleAccountDropdown={this.props.toggleAccountDropdown}
            togglePreviewMode={this.props.togglePreviewMode}
            unsavedChanges={this.props.unsavedChanges}
            viewExamplesModal={this.props.viewExamplesModal}
            viewPagesModal={this.props.viewPagesModal}
            viewLoginModal={this.props.viewLoginModal}
            viewShareModal={this.props.viewShareModal}
            viewSignUpModal={this.props.viewSignUpModal}
          />
        </nav>
        <Canvas
          layout={this.props.layout}
          name={this.props.name}
          preview={this.props.preview}
          rgl={this.props.rgl}
          setPageLayout={this.props.setPageLayout}
          editorIndex={this.props.editorIndex}

          updateFile={this.props.updateFile}
          editors={this.props.editors}
          setCurrentEditor={this.props.setCurrentEditor}
          removeEditor={this.props.removeEditor}
          duplicateEditor={this.props.duplicateEditor}
          setEditorSize={this.props.setEditorSize}
          setEditorPosition={this.props.setEditorPosition}
          setCurrentFile={this.props.setCurrentFile}

          playCode={this.props.playCode}
          stopCode={this.props.stopCode}
          startCodeRefresh={this.props.startCodeRefresh}
          stopCodeRefresh={this.props.stopCodeRefresh}
          clearConsoleOutput={this.props.clearConsoleOutput}
          updateConsoleOutput={this.props.updateConsoleOutput}
          setEditorMode={this.props.setEditorMode}
          setInnerWidth={this.props.setInnerWidth}
          setInnerHeight={this.props.setInnerHeight}

          updateTextChange={this.props.updateTextChange}
          updateImageChange={this.props.updateImageChange}

          setIframeURL={this.props.setIframeURL}

          setQuestionInnerHeight={this.props.setQuestionInnerHeight}
          updateQuestionChange={this.props.updateQuestionChange}
          updateAnswerChange={this.props.updateAnswerChange}

          setImageURL={this.props.setImageURL}
        />
        <Modal
          size="large"
          isOpen={this.props.isPagesModalOpen}
          closeModal={this.props.closePagesModal}
        >
          <PagesList
            pages={this.props.pages}
            deletePage={this.props.deletePage}
            setAllPages={this.props.setAllPages}
          />
        </Modal>

        <Modal
          size="large"
          isOpen={this.props.isExamplesModalOpen}
          closeModal={this.props.closeExamplesModal}
        >
          <ExamplesModal />
        </Modal>

        <Modal
          size="large"
          isOpen={this.props.isLoginModalOpen}
          closeModal={this.props.closeLoginModal}
        >
          <Login
            authLoadedPage={this.authLoadedPage}
            loginName={this.props.loginName}
            loginPassword={this.props.loginPassword}
            updateUserName={this.props.updateUserName}
            updateUserPassword={this.props.updateUserPassword}
            setUserName={this.props.setUserName}
            closeLoginModal={this.props.closeLoginModal}
          />
        </Modal>
        <Modal
          size="large"
          isOpen={this.props.isSignUpModalOpen}
          closeModal={this.props.closeSignUpModal}
        >
          <SignUp
            authLoadedPage={this.authLoadedPage}
            loginName={this.props.loginName}
            loginPassword={this.props.loginPassword}
            updateUserName={this.props.updateUserName}
            updateUserPassword={this.props.updateUserPassword}
            signUserUp={this.props.signUserUp}
            setUserName={this.props.setUserName}
            closeSignUpModal={this.props.closeSignUpModal}
          />
        </Modal>
        <Modal
          size="small"
          isOpen={this.props.isShareModalOpen}
          closeModal={this.props.closeShareModal}
        >
          <ShareModal />
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  editors: PropTypes.shape.isRequired,
  editorIndex: PropTypes.number.isRequired,

  pageTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  layout: PropTypes.arrayOf(PropTypes.shape).isRequired,
  rgl: PropTypes.shape.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape).isRequired,
  preview: PropTypes.bool.isRequired,
  unsavedChanges: PropTypes.bool.isRequired,

  canEdit: PropTypes.bool.isRequired,
  loginName: PropTypes.string.isRequired,
  loginPassword: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  isFileDropdownOpen: PropTypes.bool.isRequired,
  isAccountDropdownOpen: PropTypes.bool.isRequired,
  isPagesModalOpen: PropTypes.bool.isRequired,
  isLoginModalOpen: PropTypes.bool.isRequired,
  isSignUpModalOpen: PropTypes.bool.isRequired,

  isExamplesModalOpen: PropTypes.bool.isRequired,
  viewExamplesModal: PropTypes.func.isRequired,
  closeExamplesModal: PropTypes.func.isRequired,

  setCurrentEditor: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired,
  duplicateEditor: PropTypes.func.isRequired,
  loadEditors: PropTypes.func.isRequired,
  setEditorPosition: PropTypes.func.isRequired,
  setEditorSize: PropTypes.func.isRequired,
  addCodeEditor: PropTypes.func.isRequired,
  playCode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  clearConsoleOutput: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  addQuestionEditor: PropTypes.func.isRequired,
  updateTextChange: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  setIframeURL: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setInnerWidth: PropTypes.func.isRequired,
  setInnerHeight: PropTypes.func.isRequired,
  setQuestionInnerHeight: PropTypes.func.isRequired,
  updateQuestionChange: PropTypes.func.isRequired,
  updateAnswerChange: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  setImageURL: PropTypes.func.isRequired,
  updateImageChange: PropTypes.func.isRequired,

  togglePreviewMode: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  setPageLayout: PropTypes.func.isRequired,
  submitPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  loadPage: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  setAllPages: PropTypes.func.isRequired,
  setEditAccess: PropTypes.func.isRequired,

  viewPagesModal: PropTypes.func.isRequired,
  closePagesModal: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  viewSignUpModal: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  toggleAccountDropdown: PropTypes.func.isRequired,
  isShareModalOpen: PropTypes.bool.isRequired,
  closeShareModal: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,

  updateUserName: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired,
  signUserUp: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    editors: state.editorsReducer.editors,
    editorIndex: state.editorsReducer.editorIndex,

    layout: state.page.layout,
    rgl: state.page.rgl,
    pageTitle: state.page.pageTitle,
    id: state.page.id,
    pages: state.page.pages,
    preview: state.page.preview,
    unsavedChanges: state.page.unsavedChanges,

    canEdit: state.user.canEdit,
    loginName: state.user.loginName,
    loginPassword: state.user.loginPassword,
    name: state.user.name,

    isAccountDropdownOpen: state.mainToolbar.isAccountDropdownOpen,
    isExamplesModalOpen: state.mainToolbar.isExamplesModalOpen,
    isFileDropdownOpen: state.mainToolbar.isFileDropdownOpen,
    isPagesModalOpen: state.mainToolbar.isPagesModalOpen,
    isShareModalOpen: state.mainToolbar.isShareModalOpen,
    isLoginModalOpen: state.mainToolbar.isLoginModalOpen,
    isSignUpModalOpen: state.mainToolbar.isSignUpModalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    editorActions,
    mainToolbarActions,
    pageActions,
    userActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(App));
