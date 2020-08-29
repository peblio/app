import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DocumentsView from './DocumentsView/DocumentsView';

import './documentsComponent.scss';

class DocumentsComponent extends React.Component {
  static defaultProps = {
    folderShortId: null
  }

  componentWillMount() {
    if (this.props.userName) {
      this.props.fetchAllPages(this.props.userName, this.props.documentSort, this.props.container)
        .then(() => {
          if (this.props.folderShortId) {
            this.props.jumpToFolderByShortId(this.props.folderShortId);
          }
        })
        .catch((err) => {
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userName !== this.props.userName || prevProps.documentSort !== this.props.documentSort) {
      this.props.fetchAllPages(this.props.userName, this.props.documentSort, this.props.container)
        .then(() => {
          if (this.props.folderShortId) {
            this.props.jumpToFolderByShortId(this.props.folderShortId);
          }
        })
        .catch((err) => {
        });
    }
    if (this.containerEl && this.props.selectedFolderIds.length >= 2) {
      this.containerEl.scrollLeft = this.containerEl.scrollWidth - this.containerEl.clientWidth;
    }
  }

  render() {
    const { userName, selectedFolderIds, folder, folders, pages, documentView } = this.props;
    let folderContainer;
    if (selectedFolderIds.length === 0) {
      folderContainer = (
        <DocumentsView
          container={this.props.container}
          documentView={documentView}
          profileName={userName}
          folder={folder}
          folders={folders}
          pages={pages}
          setShareURL={this.props.setShareURL}
          deleteFolder={this.props.deleteFolder}
          clearSelectedFolders={this.props.clearSelectedFolders}
          jumpToFolderByShortId={this.props.jumpToFolderByShortId}
          viewShareModal={this.props.viewShareModal}
          renameFolder={this.props.renameFolder}
          renamePage={this.props.renamePage}
        />
      );
    } else {
      const selectedFolderId = selectedFolderIds[selectedFolderIds.length - 1];
      const folderDepth = selectedFolderIds.length;
      folderContainer = (
        <DocumentsView
          container={this.props.container}
          deleteFolder={this.props.deleteFolder}
          documentView={documentView}
          folderId={selectedFolderId}
          folderDepth={folderDepth}
          profileName={userName}
          folder={folder}
          folders={folders}
          pages={pages}
          setShareURL={this.props.setShareURL}
          clearSelectedFolders={this.props.clearSelectedFolders}
          jumpToFolderByShortId={this.props.jumpToFolderByShortId}
          viewShareModal={this.props.viewShareModal}
          renameFolder={this.props.renameFolder}
          renamePage={this.props.renamePage}
          selectedFolderIds={this.props.selectedFolderIds}
        />
      );
    }
    return (
      <div className="profile-pebls__container" ref={(el) => { this.containerEl = el; }}>
        {folderContainer}
      </div>
    );
  }
}

DocumentsComponent.propTypes = {
  clearSelectedFolders: PropTypes.func.isRequired,
  container: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  documentSort: PropTypes.string.isRequired,
  documentView: PropTypes.string.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  folder: PropTypes.shape({}).isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  folderShortId: PropTypes.string,
  jumpToFolderByShortId: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renameFolder: PropTypes.func.isRequired,
  renamePage: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShareURL: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  viewShareModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const folders = ownProps.folders;
  const pages = ownProps.pages;
  const folder = ownProps.folders.byId[ownProps.folderId];
  const selectedFolderIds = ownProps.selectedFolderIds;
  let parentFolderShortId;
  if (folder && folder.parent) {
    parentFolderShortId = ownProps.folders.byId[folder.parent].shortId;
  }
  const documentSort = state.dashboard.documentSort;
  const documentView = state.dashboard.documentView;
  return {
    documentSort,
    documentView,
    folder,
    folders,
    pages,
    parentFolderShortId,
    selectedFolderIds,
  };
};

export default connect(mapStateToProps, null)(DocumentsComponent);
