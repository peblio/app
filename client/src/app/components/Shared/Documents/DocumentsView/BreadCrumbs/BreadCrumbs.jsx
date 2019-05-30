import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import BreadCrumb from './BreadCrumb';
import history from '../../../../../utils/history';

class BreadCrumbs extends Component {
  render() {
    const breadCrumbClass = classNames('profile-breadcrumb');
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
  deleteFolder: PropTypes.func.isRequired,
  folder: PropTypes.shape({}).isRequired,
  keyId: PropTypes.number.isRequired,
  profileName: PropTypes.string.isRequired,
  jumpToFolderByShortId: PropTypes.string.isRequired,
  renameFolder: PropTypes.func.isRequired,
  setShareURL: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
};

export default BreadCrumbs;
