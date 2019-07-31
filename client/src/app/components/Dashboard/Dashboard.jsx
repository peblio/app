import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Account from './Account/Account';
import Trash from './Trash/Trash';
import Documents from '../Shared/Documents/Documents';
import Nav from '../Shared/Nav/Nav';
import TopNav from '../Shared/Nav/TopNav';
import Modal from '../App/Modal/Modal';
import ShareModal from '../App/Modal/ShareModal/ShareModal';

import {
  deleteFolder,
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders,
  renameFolder,
  renamePage
} from '../../action/page';

import {
  setShareURL,
  viewShareModal,
  closeShareModal
} from '../../action/mainToolbar';


import * as userActions from '../../action/user';

import './dashboard.scss';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchCurrentUser()
      .then(() => {
        this.props.fetchUserProfile(this.props.name);
      });
  }

  renderDashboardView=(dashboardView) => {
    switch (dashboardView) {
      case 'documents':
        return (
          <Documents
            userName={this.props.name}
            folderShortId={this.props.match.params.folderShortId}
            fetchAllPages={this.props.fetchAllPages}
            deleteFolder={this.props.deleteFolder}
            jumpToFolderByShortId={this.props.jumpToFolderByShortId}
            clearSelectedFolders={this.props.clearSelectedFolders}
            folders={this.props.folders}
            pages={this.props.pages}
            selectedFolderIds={this.props.selectedFolderIds}
            setShareURL={this.props.setShareURL}
            viewShareModal={this.props.viewShareModal}
            renameFolder={this.props.renameFolder}
            renamePage={this.props.renamePage}
            container="dashboard"
          />
        );
      case 'account': return (
        <Account
          name={this.props.name}
          image={this.props.image}
          blurb={this.props.blurb}
          updateUserProfileImage={this.props.updateUserProfileImage}
          updateProfileBlurb={this.props.updateProfileBlurb}
          setUserBlurb={this.props.setUserBlurb}
        />
      );
      case 'trash': return (
        <Trash
          name={this.props.name}
        />
      );
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <TopNav
          container="dashboard"
        />
        {this.props.name && (
          <div className="dashboard__container">
            <Nav
              container="dashboard"
            />
            {this.renderDashboardView(this.props.dashboardView)}
          </div>
        )}
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

Dashboard.propTypes = {
  blurb: PropTypes.string.isRequired,
  clearSelectedFolders: PropTypes.func.isRequired,
  closeShareModal: PropTypes.func.isRequired,
  dashboardView: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  jumpToFolderByShortId: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  isShareModalOpen: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      folderShortId: PropTypes.string
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renameFolder: PropTypes.func.isRequired,
  renamePage: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShareURL: PropTypes.func.isRequired,
  setUserBlurb: PropTypes.func.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  updateUserProfileImage: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    image: state.user.image,
    isShareModalOpen: state.mainToolbar.isShareModalOpen,
    name: state.user.name,
    blurb: state.user.blurb,
    dashboardView: state.dashboard.dashboardView,
    folders: state.page.folders,
    pages: state.page.pages,
    selectedFolderIds: state.page.selectedFolderIds,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSelectedFolders,
    deleteFolder,
    fetchAllPages,
    jumpToFolderByShortId,
    setShareURL,
    viewShareModal,
    closeShareModal,
    renameFolder,
    renamePage,
    ...userActions
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard));
