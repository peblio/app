import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Folders from './Folders/Folders';
import Pages from './Pages/Pages';
import history from '../../../../utils/history';

class DocumentsView extends Component {
  static defaultProps = {
    folderDepth: 0,
    folderId: undefined,
    folder: {},
    parentFolderShortId: undefined
  }

  handleClick = () => {
    this.props.clearSelectedFolders(this.props.folderDepth - 1);
    if (this.props.folder.parent) {
      this.props.jumpToFolderByShortId(this.props.parentFolderShortId);
      history.push(`/${this.props.container}/${this.props.profileName}/folder/${this.props.parentFolderShortId}`);
    } else {
      history.push(`/${this.props.container}/${this.props.profileName}`);
    }
  }

  render() {
    const { childFolders, childPages, documentView, folderId, folder, profileName } = this.props;
    const title = folderId ? folder.title : '';
    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div className="profile-pebls__level">
        <h1 className="profile-pebls__heading">
          {title}
        </h1>

        {this.props.folderDepth > 0 && (
          <button
            className="profile-pebls__back"
            onClick={this.handleClick}
          >
           &#9664; Back
          </button>
        )}
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
          />
        )}
        <h2 className="profile-pebls__sub-heading">files</h2>
        <Pages
          pages={childPages}
          folderId={folderId}
          container={this.props.container}
        />
      </div>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );
  }
}

DocumentsView.propTypes = {
  childFolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  childPages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  clearSelectedFolders: PropTypes.func.isRequired,
  container: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  documentView: PropTypes.string.isRequired,
  folderDepth: PropTypes.number,
  folderId: PropTypes.string,
  folder: PropTypes.shape({ parent: PropTypes.string }),
  jumpToFolderByShortId: PropTypes.func.isRequired,
  parentFolderShortId: PropTypes.string,
  profileName: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const folder = ownProps.folders.byId[ownProps.folderId];
  let parentFolderShortId;
  if (folder && folder.parent) {
    parentFolderShortId = ownProps.folders.byId[folder.parent].shortId;
  }
  const pagesById = (ownProps.container == 'profile') ? state.profile.pages : state.page.pages;
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

export default connect(mapStateToProps, null)(DocumentsView);
