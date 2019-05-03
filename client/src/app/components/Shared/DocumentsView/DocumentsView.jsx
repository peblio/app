import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import Folders from './Folders/Folders';
import Pages from './Pages/Pages';
import history from '../../../utils/history';

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
      history.push(`/user/${this.props.profileName}/folder/${this.props.parentFolderShortId}`);
    } else {
      history.push(`/user/${this.props.profileName}`);
    }
  }

  render() {
    console.log(this.props);
    const { childFolders, childPages, folderId, folder, profileName } = this.props;
    const title = folderId ? folder.title : 'All Work';
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
            folders={childFolders}
            folderId={folderId}
            profileName={profileName}
          />
        )}
        <h2 className="profile-pebls__sub-heading">files</h2>
        <Pages
          pages={childPages}
          folderId={folderId}
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
  folderDepth: PropTypes.number,
  folderId: PropTypes.string,
  folder: PropTypes.shape({ parent: PropTypes.string }),
  jumpToFolderByShortId: PropTypes.string.isRequired,
  parentFolderShortId: PropTypes.string,
  profileName: PropTypes.string.isRequired
};


export default DocumentsView;
