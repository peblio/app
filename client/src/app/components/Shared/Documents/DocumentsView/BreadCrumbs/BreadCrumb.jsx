import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import history from '../../../../../utils/history';

import {
  jumpToFolderByShortId,
  moveFolderToFolder,
  movePageToFolder,
  clearSelectedFolders
} from '../../../../../action/page';

const ItemTypes = {
  PAGE: 'PAGE',
  FOLDER: 'FOLDER'
};

const folderTarget = {
  drop(props, monitor) {
    const itemType = monitor.getItemType();
    const item = monitor.getItem();
    if (itemType === ItemTypes.PAGE) {
      const { pageId } = item;
      props.movePageToFolder(pageId, props.folder._id);
    } else if (itemType === ItemTypes.FOLDER) {
      const { folderId } = item;
      if (folderId !== props.folder._id) {
        props.moveFolderToFolder(folderId, props.folder._id);
      }
    }
  }
};

function collectDropTarget(_connect, monitor) {
  return {
    connectDropTarget: _connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true })
  };
}

class BreadCrumb extends Component {
  redirectToFolder = (e, shortId) => {
    e.stopPropagation();
    this.props.clearSelectedFolders(this.props.folderDepth - 1);
    if (shortId) {
      this.props.jumpToFolderByShortId(shortId);
      history.push(`/${this.props.container}/${this.props.profileName}/folder/${shortId}`);
    } else {
      history.push(`/${this.props.container}/${this.props.profileName}`);
    }
  }

  render() {
    const {
      connectDropTarget,
      folder,
      isOver,
    } = this.props;
    const breadCrumbClass = classNames('profile-breadcrumb', {
      'profile-breadcrumb--is-over': isOver
    });
    return connectDropTarget(
      <li className="profile-breadcrumb__container">
        <button
          className={classNames(breadCrumbClass)}
          onClick={e => this.redirectToFolder(e, folder.shortId)}
        >
          {folder.title}
        </button>
        <i className="profile-breadcrumb__icon fas fa-chevron-right"></i>
      </li>
    );
  }
}

BreadCrumb.propTypes = {
  clearSelectedFolders: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  container: PropTypes.string.isRequired,
  folder: PropTypes.shape({}).isRequired,
  folderDepth: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
  profileName: PropTypes.string.isRequired,
  jumpToFolderByShortId: PropTypes.string.isRequired,
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSelectedFolders,
    jumpToFolderByShortId,
    moveFolderToFolder,
    movePageToFolder
  }, dispatch);
}

const DroppableBreadCrumb = DropTarget([ItemTypes.PAGE, ItemTypes.FOLDER], folderTarget, collectDropTarget)(BreadCrumb);
/* eslint-enable max-len */

export default (connect(null, mapDispatchToProps)(DroppableBreadCrumb));
