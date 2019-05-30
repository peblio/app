import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../../../../utils/history';
import DeleteIcon from '../../../../../images/trash.svg';
import ShareIcon from '../../../../../images/share.svg';
import RenameIcon from '../../../../../images/rename.svg';

import {
  moveFolderToFolder,
  movePageToFolder
} from '../../../../../action/page';

const ItemTypes = {
  PAGE: 'PAGE',
  FOLDER: 'FOLDER'
};

const folderSource = {
  beginDrag(props) {
    return { folderId: props.folder._id };
  }
};

const folderTarget = {
  drop(props, monitor) {
    console.log(props);
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

function collectDragSource(_connect, monitor) {
  return {
    connectDragSource: _connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function collectDropTarget(_connect, monitor) {
  return {
    connectDropTarget: _connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true })
  };
}

class Folder extends Component {
  redirectToFolder = (e, shortId) => {
    e.stopPropagation();
    this.props.jumpToFolderByShortId(shortId);
    history.push(`/${this.props.container}/${this.props.profileName}/folder/${shortId}`);
  }

  deleteFolder = (e, id) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this folder?')) { // eslint-disable-line no-restricted-globals
      this.props.deleteFolder(id);
    }
  }

  shareFolder = (e, shortId) => {
    e.stopPropagation();
    const url = `${window.location.origin}/profile/${this.props.profileName}/folder/${shortId}`;
    this.props.setShareURL(url);
    this.props.viewShareModal();
  }

  renameFolder = (e, id) => {
    e.stopPropagation();
    this.props.renameFolder(id, e.target.value);
  }

  startRenameFolder = (e, key) => {
    const title = document.getElementById(`folderTitle-${key}`);
    title.focus();
    e.stopPropagation();
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      folder,
      isDragging,
      isOver,
      isSelected,
    } = this.props;
    const key = this.props.keyId;
    return connectDragSource(connectDropTarget(
      <li // eslint-disable-line
        key={folder._id}
        className="profile-folders__list-item"
        onClick={e => this.redirectToFolder(e, folder.shortId)}
      >
        <h3
          className="profile-folders__title"
        >
          <input
            className="pages__input"
            ref={(input) => { this.folderTitle = input; }}
            type="text"
            defaultValue={folder.title}
            id={`folderTitle-${key}`}
            onBlur={e => this.renameFolder(e, folder._id)}
            onClick={e => this.startRenameFolder(e, key)}
          />
        </h3>
        <h3
          className="profile-folders__line-title"
        >
          {moment(folder.updatedAt).format('DD/MMM/YYYY')}
        </h3>
        <div className="profile-folders__info">
          <p className="profile-folders__sub-info">
            {folder.files && folder.files.length}
            {' '}
            files
          </p>
          {this.props.container === 'dashboard' && (
            <div className="profile-folders__sub-info">
              <button
                className="profile-pebl__icon"
                onClick={e => this.deleteFolder(e, folder._id)}
                data-test="delete-pebl"
              >
                <DeleteIcon alt="delete page" />
              </button>
              <button
                className="profile-pebl__icon"
                onClick={e => this.shareFolder(e, folder.shortId)}
                data-test="share-folder"
              >
                <ShareIcon alt="share page" />
              </button>
              <button
                className="profile-pebl__icon"
                onClick={e => this.startRenameFolder(e, key)}
                data-test="share-folder"
              >
                <RenameIcon alt="rename folder" />
              </button>
            </div>
          )}
        </div>
      </li>
    ));
  }
}

Folder.propTypes = {
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


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveFolderToFolder,
    movePageToFolder
  }, dispatch);
}

const DraggableFolder = DragSource(ItemTypes.FOLDER, folderSource, collectDragSource)(Folder);
/* eslint-disable max-len */
const DroppableFolder = DropTarget([ItemTypes.PAGE, ItemTypes.FOLDER], folderTarget, collectDropTarget)(DraggableFolder);
/* eslint-enable max-len */

export default (connect(null, mapDispatchToProps)(DroppableFolder));
