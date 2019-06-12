import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from './BreadCrumb';

class BreadCrumbs extends Component {
  render() {
    const { folders, selectedFolderIds } = this.props;
    const homeFolder = {
      title: 'Home'
    };
    const breadCrumbFolders = [...selectedFolderIds];
    breadCrumbFolders.pop();
    return (
      <ul className="profile-breadcrumbs">
        <BreadCrumb
          folder={homeFolder}
          container={this.props.container}
          profileName={this.props.profileName}
          folderDepth={this.props.folderDepth}
        />
        {breadCrumbFolders.map((folderId) => {
          const folder = folders.byId[folderId];
          return (
            <BreadCrumb
              folder={folder}
              container={this.props.container}
              profileName={this.props.profileName}
              folderDepth={this.props.folderDepth}
            />
          );
        })
        }
      </ul>
    );
  }
}

BreadCrumbs.propTypes = {
  container: PropTypes.string.isRequired,
  folder: PropTypes.shape({}).isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  folderDepth: PropTypes.number.isRequired,
  profileName: PropTypes.string.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BreadCrumbs;
