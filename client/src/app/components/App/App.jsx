import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import initHelpHero from 'helphero';

import Websocket from 'react-websocket';
import WEBSOCKET_HOST from '../../utils/webSockets';
import * as pageDefaults from '../../constants/pageConstants';
import { buildPageDataForSave, buildPageDataForUpdate, buildPageDataForRemixing } from '../../utils/page-builder';

import AddDescription from './Modal/AddDescription/AddDescription.jsx';
import ConfirmUser from './Modal/ConfirmUser/ConfirmUser.jsx';
import ExamplesModal from './Modal/ExamplesModal/ExamplesModal.jsx';
import ForkPrompt from './Modal/ForkPrompt/ForkPrompt.jsx';
import Modal from './Modal/Modal.jsx';
import PasswordForgot from './Modal/PasswordForgot/PasswordForgot.jsx';
import ShareModal from './Modal/ShareModal/ShareModal.jsx';
import RemixProgress from './Modal/RemixProgress/RemixProgress.jsx';
import PagesList from './Modal/PagesList/PagesList.jsx';
import PasswordReset from './Modal/PasswordReset/PasswordReset.jsx';
import Welcome from './Modal/Welcome/Welcome.jsx';
import LiveRefreshPage from './Modal/LiveRefreshPage/LiveRefreshPage.jsx';

import Canvas from './Canvas/Canvas.jsx';
import MainToolbar from './MainToolbar/MainToolbar.jsx';
import Navigation from './Navigation/Navigation.jsx';
import Workspace from './Workspace/Workspace.jsx';

import * as editorActions from '../../action/editors.js';
import * as mainToolbarActions from '../../action/mainToolbar.js';
import * as navigationActions from '../../action/navigation.js';
import * as pageActions from '../../action/page.js';
import * as preferencesActions from '../../action/preferences.js';
import * as userActions from '../../action/user.js';

import axios from '../../utils/axios';
import PageVersion from './Navigation/PageVersion';

require('./app.scss');

let refWebSocket;
let hasSocketBeenConnected = false;

class App extends React.Component {
  componentWillMount() {
    this.onUserVisit();
    if (performance.navigation.type === 2) {
      location.reload(true);
    }
  }

  componentDidMount() {
    this.authAndLoadPage();
    if (this.projectID() === 'QJSEsqTOS') {
      const hlp = initHelpHero('1Dyo05WliMY');
      hlp.anonymous();
    }
    this.props.createNavigationContent(this.props.layout);
    document.title = this.props.pageTitle;
  }

  componentDidUpdate(prevProps) {
    document.title = this.props.pageTitle;
    if (prevProps.match.params.id !== this.props.match.params.id) {
      window.location.reload(true);
    }
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

  onUserVisit =() => {
    const isUserFirstVisit = localStorage.getItem(process.env.LOCALSTORAGE_VARIABLE);
    // check if it is the first visit
    if (isUserFirstVisit === null || isUserFirstVisit === '') {
    // set variable to 1
      localStorage.setItem(process.env.LOCALSTORAGE_VARIABLE, 1);
      this.props.viewWelcomeModal();
    }
  }

  resetPage = () => {
    const location = this.props.location.pathname;
    const tokenID = location.match(/\/reset\/([\w-].*)/);
    return tokenID ? tokenID[1] : null;
  }

  userConfirmation = () => {
    const location = this.props.location.pathname;
    const tokenID = location.match(/\/confirmation/);
    return tokenID ? true : null;
  }

  authAndLoadPage = () => {
    if (this.userConfirmation()) {
      this.props.viewConfirmUserModal();
    } else if (this.resetPage()) {
      this.props.viewResetModal();
    } else if (this.projectID()) {
      this.getPage();
    }
    this.props.fetchCurrentUser()
      .then(() => {
        this.props.fetchUserPreferences();
      });
  }

  getPageTitle = () => {
    if (this.props.pageHeading !== '' && this.props.pageTitle === pageDefaults.DEFAULT_PAGE_TITLE) {
      return this.props.pageHeading;
    }
    return this.props.pageTitle;
  }


  buildPageDataAndSavePage = () => {
    if (this.props.name) {
      if (this.props.id.length === 0) {
        this.props.submitPage(buildPageDataForSave(this.props), true, this.props.name, false);
      } else if (this.props.canEdit) {
        this.props.updatePage(buildPageDataForUpdate(this.props), this.props.canEdit, this.props.name);
        this.sendMessage('SendingUpdate');
      }
    } else {
      this.props.viewLoginModal();
    }
  }

  buildPageDataAndRemixPage = () => {
    if (this.props.name) {
      const page = buildPageDataForRemixing(this.props);
      this.props.remixPage(page);
    } else {
      this.props.viewLoginModal();
    }
  }

  showForkPromptPreference = () => {
    const getForkPromptPreference = localStorage.getItem(process.env.LOCALSTORAGE_FORK_PROMPT);
    return !(getForkPromptPreference === 'suppress');
  }

  clearValuesAndCloseSignUpModal = () => {
    this.props.clearSignupSelectedValues();
    this.props.closeSignUpModal();
  }

  handleData = (pageId) => {
    this.props.viewLivePageRefreshModal();
  }

  handleOpen = () => {
    hasSocketBeenConnected = true;
  }

  handleClose = () => {
    hasSocketBeenConnected = false;
  }

  sendMessage = (message) => {
    if (this.props.id && hasSocketBeenConnected) {
      // this.refWebSocket.sendMessage(message);
    }
  }

  getPage = () => {
    const projectID = this.projectID();
    this.props.loadCurrentPage(projectID);
    this.props.setPreviewMode(true);
  }

  projectID = () => {
    const location = this.props.location.pathname;
    const projectID = location.match(/\/pebl\/([\w-].*)/);
    if (projectID) {
      if (projectID[1] !== this.props.id) {
        this.props.setPageId(projectID[1]);
      }
      return projectID[1];
    }
    this.props.setPageId('');
    return null;
  }

  renderNotificationModal = () => (
    <React.Fragment>
      <Modal size="xlarge" isOpen={this.props.isPagesModalOpen} closeModal={this.props.closePagesModal}>
        <PagesList />
      </Modal>

      <Modal size="xlarge" isOpen={this.props.isExamplesModalOpen} closeModal={this.props.closeExamplesModal}>
        <ExamplesModal />
      </Modal>

      <Modal size="small" isOpen={this.props.isLiveRefreshPageModalOpen} closeModal={this.props.closeLiveRefreshPageModal}>
        <LiveRefreshPage allowLiveRefresh={this.getPage} closeLiveRefreshPageModal={this.props.closeLiveRefreshPageModal} showMessageForAuthor={this.props.canEdit} />
      </Modal>

      <Modal size="large" isOpen={this.props.isForgotModalOpen} closeModal={this.props.closeForgotModal}>
        <PasswordForgot isForgotModalOpen={this.props.isForgotModalOpen} />
      </Modal>

      <Modal size="large" isOpen={this.props.isResetModalOpen} closeModal={this.props.closeResetModal}>
        <PasswordReset isResetModalOpen={this.props.isResetModalOpen} location={this.props.location} />
      </Modal>

      <Modal size="large" isOpen={this.props.isRemixInProgress}>
        <RemixProgress />
      </Modal>

      <Modal size="small" isOpen={this.props.isConfirmUserModalOpen} closeModal={this.props.closeConfirmUserModal}>
        <ConfirmUser location={this.props.location} />
      </Modal>
      <Modal size="small" isOpen={this.props.isShareModalOpen} closeModal={this.props.closeShareModal}>
        <ShareModal pageTitle={this.props.pageTitle} />
      </Modal>

      <Modal size="small" isOpen={this.props.isAddDescriptionModalOpen} closeModal={this.props.closeAddDescriptionModal}>
        <AddDescription savePage={this.buildPageDataAndSavePage} closeModal={this.props.closeAddDescriptionModal} />
      </Modal>

      <Modal size="auto" isOpen={this.props.isWelcomeModalOpen} closeModal={this.props.closeWelcomeModal}>
        <Welcome />
      </Modal>

      {(this.showForkPromptPreference() && !this.props.isBrowsingPebl && !this.props.canEdit) && (
        <Modal size="auto" isOpen={this.props.isForkPromptOpen} closeModal={this.props.closeForkPrompt}>
          <ForkPrompt savePage={this.buildPageDataAndSavePage} />
        </Modal>
      )}
    </React.Fragment>
  )

  renderToolBar = () => (
    <nav className="main-nav">
      <MainToolbar
        projectID={this.projectID}
        savePage={this.buildPageDataAndSavePage}
        location={this.props.location}
        buildPageDataAndRemixPage={this.buildPageDataAndRemixPage}
      />
    </nav>
  )

  attachWebsocket = () => {
    const webSocketUrl = `${WEBSOCKET_HOST}/api/live/page/${this.props.id}`;
    return this.props.id && (
      <Websocket
        url={webSocketUrl}
        onMessage={this.handleData}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        reconnect
        debug
        ref={(socket) => {
          this.refWebSocket = socket;
        }}
      />
    );
  }

  render() {
    return (
      <div
        role="presentation"
        tabIndex="0" // eslint-disable-line
        onKeyDown={e => this.onKeyPressed(e)}
        className="app__container"
      >
        {this.attachWebsocket()}
        {this.renderToolBar()}
        <Canvas savePage={this.buildPageDataAndSavePage} />
        {this.renderNotificationModal()}
        <Navigation />
        <PageVersion savePage={this.buildPageDataAndSavePage} />
        <Workspace />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  editors: PropTypes.shape({}).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  editorIndex: PropTypes.number.isRequired,

  workspace: PropTypes.shape({}).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,

  // pebl
  pageTitle: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  layout: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rgl: PropTypes.shape({}).isRequired,
  textHeights: PropTypes.shape({}).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  isPeblPublished: PropTypes.bool.isRequired,

  canEdit: PropTypes.bool.isRequired,

  // user
  name: PropTypes.string.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  isBrowsingPebl: PropTypes.bool.isRequired,
  isRemixInProgress: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  userType: PropTypes.string.isRequired,

  isAddDescriptionModalOpen: PropTypes.bool.isRequired,
  isPagesModalOpen: PropTypes.bool.isRequired,
  isForgotModalOpen: PropTypes.bool.isRequired,
  isResetModalOpen: PropTypes.bool.isRequired,

  isExamplesModalOpen: PropTypes.bool.isRequired,
  closeExamplesModal: PropTypes.func.isRequired,

  submitPage: PropTypes.func.isRequired,
  remixPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  setPageId: PropTypes.func.isRequired,

  setPreviewMode: PropTypes.func.isRequired,

  viewPagesModal: PropTypes.func.isRequired,
  closePagesModal: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  viewLivePageRefreshModal: PropTypes.func.isRequired,
  closeLiveRefreshPageModal: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  clearSignupSelectedValues: PropTypes.func.isRequired,
  isShareModalOpen: PropTypes.bool.isRequired,
  closeShareModal: PropTypes.func.isRequired,
  closeForgotModal: PropTypes.func.isRequired,
  closeResetModal: PropTypes.func.isRequired,
  viewResetModal: PropTypes.func.isRequired,
  closeConfirmUserModal: PropTypes.func.isRequired,
  viewConfirmUserModal: PropTypes.func.isRequired,
  isConfirmUserModalOpen: PropTypes.bool.isRequired,
  isWelcomeModalOpen: PropTypes.bool.isRequired,
  viewWelcomeModal: PropTypes.func.isRequired,
  closeWelcomeModal: PropTypes.func.isRequired,
  isForkPromptOpen: PropTypes.bool.isRequired,
  isLiveRefreshPageModalOpen: PropTypes.bool.isRequired,
  closeForkPrompt: PropTypes.func.isRequired,
  closeAddDescriptionModal: PropTypes.func.isRequired,

  // preferences
  fetchUserPreferences: PropTypes.func.isRequired,
  loadCurrentPage: PropTypes.func.isRequired,

  // navigation
  pageHeading: PropTypes.string.isRequired,
  createNavigationContent: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    editors: state.editorsReducer.editors,
    editorIndex: state.editorsReducer.editorIndex,

    workspace: state.workspace.workspace,

    layout: state.page.layout,
    rgl: PropTypes.shape({}).isRequired,
    pageHeading: state.page.pageHeading,
    pageTitle: state.page.pageTitle,
    id: state.page.id,
    textHeights: state.page.textHeights,
    tags: state.page.tags,
    description: state.page.description,
    isRemixInProgress: state.page.isRemixInProgress,
    isPeblPublished: state.page.isPublished,
    isLiveRefreshPageModalOpen: state.page.isLiveRefreshPageModalOpen,

    isOldVersionShowing: state.pageVersion.isOldVersionShowing,

    canEdit: state.user.canEdit,
    name: state.user.name,
    userType: state.user.type,
    isBrowsingPebl: state.user.isBrowsingPebl,

    isAccountDropdownOpen: state.mainToolbar.isAccountDropdownOpen,
    isAddDescriptionModalOpen: state.mainToolbar.isAddDescriptionModalOpen,
    isExamplesModalOpen: state.mainToolbar.isExamplesModalOpen,
    isFileDropdownOpen: state.mainToolbar.isFileDropdownOpen,
    isHelpDropdownOpen: state.mainToolbar.isHelpDropdownOpen,
    isPagesModalOpen: state.mainToolbar.isPagesModalOpen,
    isShareModalOpen: state.mainToolbar.isShareModalOpen,
    isWelcomeModalOpen: state.mainToolbar.isWelcomeModalOpen,

    isLoginModalOpen: state.mainToolbar.isLoginModalOpen,
    isSignUpModalOpen: state.mainToolbar.isSignUpModalOpen,
    isForgotModalOpen: state.mainToolbar.isForgotModalOpen,
    isResetModalOpen: state.mainToolbar.isResetModalOpen,
    isConfirmUserModalOpen: state.mainToolbar.isConfirmUserModalOpen,
    isForkPromptOpen: state.mainToolbar.isForkPromptOpen,
    navigationContent: state.navigation.navigationContent
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...editorActions,
    ...mainToolbarActions,
    ...navigationActions,
    ...pageActions,
    ...preferencesActions,
    ...userActions,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
