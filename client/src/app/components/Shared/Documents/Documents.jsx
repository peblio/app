import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DocumentsView from './DocumentsView/DocumentsView';

import './documents.scss';

class Documents extends React.Component {
  static defaultProps = {
    folderShortId: null
  }

  componentWillMount() {
    if (this.props.userName) {
      this.props.fetchAllPages(this.props.userName, this.props.documentSort)
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
      this.props.fetchAllPages(this.props.userName, this.props.documentSort)
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
    const { userName, selectedFolderIds, folder, folders, pages } = this.props;
    let folderContainer;
    if (selectedFolderIds.length === 0) {
      folderContainer = (
        <DocumentsView
          profileName={userName}
          folder={folder}
          folders={folders}
          pages={pages}
          clearSelectedFolders={this.props.clearSelectedFolders}
          jumpToFolderByShortId={this.props.jumpToFolderByShortId}
          container={this.props.container}
        />
      );
    } else {
      const selectedFolderId = selectedFolderIds[selectedFolderIds.length - 1];
      const folderDepth = selectedFolderIds.length;
      folderContainer = (
        <DocumentsView
          folderId={selectedFolderId}
          folderDepth={folderDepth}
          profileName={userName}
          folder={folder}
          folders={folders}
          pages={pages}
          clearSelectedFolders={this.props.clearSelectedFolders}
          jumpToFolderByShortId={this.props.jumpToFolderByShortId}
          container={this.props.container}
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

Documents.propTypes = {
  clearSelectedFolders: PropTypes.func.isRequired,
  container: PropTypes.string.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  folder: PropTypes.shape({}).isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  folderShortId: PropTypes.string,
  jumpToFolderByShortId: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  userName: PropTypes.string.isRequired,
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
  return {
    documentSort,
    folder,
    folders,
    pages,
    parentFolderShortId,
    selectedFolderIds,
  };
};

export default connect(mapStateToProps, null)(Documents);
