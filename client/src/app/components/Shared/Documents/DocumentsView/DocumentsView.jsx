import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Folders from './Folders/Folders';
import Pages from './Pages/Pages';
import BreadCrumbs from './BreadCrumbs/BreadCrumbs';

class DocumentsView extends Component {
  static defaultProps = {
    folderDepth: 0,
    folderId: undefined,
    folder: {},
    parentFolderShortId: undefined
  }

  render() {
    const { childFolders, childPages, documentView, folderId, folder, profileName } = this.props;
    const title = folderId ? folder.title : '';
    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div className="profile-pebls__level">
        {this.props.folderDepth > 0 && (
          <div>
            <BreadCrumbs
              selectedFolderIds={this.props.selectedFolderIds}
              folders={this.props.folders}
              container={this.props.container}
              profileName={profileName}
              folderDepth={this.props.folderDepth}
            />
          </div>
        )}
        <h1 className="profile-pebls__heading">
          {title}
        </h1>
        <h2 className="profile-pebls__sub-heading">folders</h2>
        {childFolders && childFolders.length > 0 && (
          <Folders
            deleteFolder={this.props.deleteFolder}
            documentView={documentView}
            folders={childFolders}
            folderId={folderId}
            profileName={profileName}
            jumpToFolderByShortId={this.props.jumpToFolderByShortId}
            container={this.props.container}
            setShareURL={this.props.setShareURL}
            viewShareModal={this.props.viewShareModal}
            renameFolder={this.props.renameFolder}
          />
        )}
        <h2 className="profile-pebls__sub-heading">files</h2>
        <Pages
          pages={childPages}
          folderId={folderId}
          container={this.props.container}
          setShareURL={this.props.setShareURL}
          viewShareModal={this.props.viewShareModal}
          renamePage={this.props.renamePage}
        />
      </div>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );
  }
}

DocumentsView.propTypes = {
  childFolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  childPages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  container: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  documentView: PropTypes.string.isRequired,
  folderDepth: PropTypes.number,
  folderId: PropTypes.string,
  folder: PropTypes.shape({ parent: PropTypes.string }),
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  jumpToFolderByShortId: PropTypes.func.isRequired,
  parentFolderShortId: PropTypes.string, //eslint-disable-line
  profileName: PropTypes.string.isRequired,
  renameFolder: PropTypes.func.isRequired,
  renamePage: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShareURL: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const folder = ownProps.folders.byId[ownProps.folderId];
  let parentFolderShortId;
  if (folder && folder.parent) {
    parentFolderShortId = ownProps.folders.byId[folder.parent].shortId;
  }
  const pagesById = (ownProps.container === 'profile')
    ? state.profile.pages
    : state.page.pages;
  return {
    childFolders: Object.values(ownProps.folders.byId)
      .filter(f => f.parent === ownProps.folderId),
    childPages: Object.values(pagesById.byId)
      .filter((page) => {
        // this is to make sure that folderId is null, and not undefined
        const folderId = ownProps.folderId ? ownProps.folderId : null;
        const pageFolderId = page.folder ? page.folder : null;
        return (pageFolderId === folderId);
      }),
    parentFolderShortId,
    folder
  };
};

const DragDropDocumentsView = DragDropContext(HTML5Backend)(DocumentsView);
export default connect(mapStateToProps, null)(DragDropDocumentsView);
