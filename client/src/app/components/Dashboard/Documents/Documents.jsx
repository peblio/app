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
    console.log(this.props.selectedFolderIds);
    if (prevProps.userName !== this.props.userName) {
      this.props.fetchAllPages(this.props.userName)
        .then(() => {
          console.log('*****');
          console.log(this.props.folderShortId);
          console.log('*****');
          if (this.props.folderShortId) {
            this.props.jumpToFolderByShortId(this.props.folderShortId);
          }
        })
        .catch((err) => {
          console.log('*****');
          console.log(err);
        });
    }
    if (this.containerEl && this.props.selectedFolderIds.length >= 2) {
      this.containerEl.scrollLeft = this.containerEl.scrollWidth - this.containerEl.clientWidth;
    }
  }

  render() {
    console.log(this.props.childPages);
    const { userName, selectedFolderIds, folder, childFolders, childPages } = this.props;
    let folderContainer;
    console.log(selectedFolderIds);
    if (selectedFolderIds.length === 0) {
      folderContainer = (
        <DocumentsView
          profileName={userName}
          folder={folder}
          childFolders={childFolders}
          childPages={this.props.childPages}
          clearSelectedFolders={this.props.clearSelectedFolders}
        />
      );
    } else {
      const selectedFolderId = selectedFolderIds[selectedFolderIds.length - 1];
      const folderDepth = selectedFolderIds.length;
      console.log(selectedFolderIds);
      folderContainer = (
        <DocumentsView
          folderId={selectedFolderId}
          folderDepth={folderDepth}
          profileName={userName}
          folder={folder}
          childFolders={childFolders}
          childPages={this.props.childPages}
          clearSelectedFolders={this.props.clearSelectedFolders}
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
  childFolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  childPages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  folderShortId: PropTypes.string,
  userName: PropTypes.string.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  jumpToFolderByShortId: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const folder = state.page.folders.byId[ownProps.folderId];
  const selectedFolderIds = state.page.selectedFolderIds;
  let parentFolderShortId;
  if (folder && folder.parent) {
    parentFolderShortId = state.page.folders.byId[folder.parent].shortId;
  }
  return {
    childFolders: Object.values(state.page.folders.byId)
      .filter(f => f.parent === ownProps.folderId),
    childPages: Object.values(state.page.pages.byId)
      .filter(page => page.folder === ownProps.folderId),
    folder,
    parentFolderShortId,
    selectedFolderIds
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  clearSelectedFolders,
  jumpToFolderByShortId,
  fetchAllPages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
