import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DocumentsView from '../../Shared/DocumentsView/DocumentsView';
import {
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders
} from '../../../action/page';

import './documents.scss';

class Documents extends React.Component {
  static defaultProps = {
    folderShortId: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userName !== this.props.userName) {
      this.props.fetchAllPages(this.props.userName)
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
  const folders = state.page.folders;
  const pages = state.page.pages;
  const folder = state.page.folders.byId[ownProps.folderId];
  const selectedFolderIds = state.page.selectedFolderIds;
  let parentFolderShortId;
  if (folder && folder.parent) {
    parentFolderShortId = state.page.folders.byId[folder.parent].shortId;
  }
  return {
    folder,
    folders,
    pages,
    parentFolderShortId,
    selectedFolderIds,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  clearSelectedFolders,
  fetchAllPages,
  jumpToFolderByShortId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
