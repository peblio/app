import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames';

import ItemTypes from '../itemTypes';
import formatDate from '../../../../utils/format-date.js';
import {
  deleteFolder,
  moveFolderToFolder,
  movePageToFolder,
  renameFolder,
  viewFolder
} from '../../../../action/page.js';
import DeleteIcon from '../../../../images/trash.svg';
import RenameIcon from '../../../../images/rename.svg';

const folderSource = {
  beginDrag(props) {
    return { folderId: props.folder._id };
  }
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

class FolderRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canRenameFolder: false
    };
  }
  deleteFolder = (e) => {
    e.stopPropagation();
    this.props.deleteFolder(this.props.folder._id);
  }

  renameFolder = (e) => {
    e.stopPropagation();
    if (this.props.isSelected) {
      this.props.renameFolder(this.props.folder._id, e.target.value);
    }
  }

  viewFolder = (e) => {
    e.stopPropagation();
    this.props.viewFolder(this.props.folder._id, this.props.folderDepth);
  }

  startRenameFolder = () => {
    this.setState({ canRenameFolder: true });
    this.folderTitle.focus();
  }

  stopRenameFolder = () => {
    this.setState({ canRenameFolder: false });
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      folder,
      isDragging,
      isOver,
      isSelected,
      width
    } = this.props;
    const colClassName = classNames('pages__col', {
      'pages__col--selected-folder': isSelected,
      'pages__co--dragging': isDragging,
      'pages__col--drop-target': isOver
    });
    return connectDragSource(connectDropTarget(
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <tr className="pages__row" onClick={this.viewFolder}>
        <td className={classNames(colClassName, 'folders__col_title')}>
          <input
            className="pages__input"
            ref={(input) => { this.folderTitle = input; }}
            type="text"
            defaultValue={folder.title}
            onBlur={(e) => {
              this.renameFolder(e);
              this.stopRenameFolder();
            }}
            readOnly={!this.state.canRenameFolder}
          ></input>
        </td>

        {width > 350 &&
          <React.Fragment>
            <td className={colClassName}>{formatDate(folder.createdAt)}</td>
            <td className={colClassName}>{formatDate(folder.updatedAt)}</td>
          </React.Fragment>
        }
        <td className={colClassName}>
          <button className="pages__icon" onClick={this.deleteFolder}>
            <DeleteIcon alt="delete page" />
          </button>
          <button className="pages__icon" onClick={this.startRenameFolder}>
            <RenameIcon alt="rename folder" />
          </button>
        </td>
      </tr>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    ));
  }
}

FolderRow.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  folder: PropTypes.shape({ _id: PropTypes.string, title: PropTypes.string }).isRequired,
  folderDepth: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  /* eslint-disable react/no-unused-prop-types */
  moveFolderToFolder: PropTypes.func.isRequired,
  movePageToFolder: PropTypes.func.isRequired,
  renameFolder: PropTypes.func.isRequired,
  /* eslint-enable react/no-unused-prop-types */
  viewFolder: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isSelected: state.page.selectedFolderIds.includes(ownProps.folder._id)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteFolder,
  renameFolder,
  moveFolderToFolder,
  movePageToFolder,
  viewFolder
}, dispatch);

const DraggableFolderRow = DragSource(ItemTypes.FOLDER, folderSource, collectDragSource)(FolderRow);
/* eslint-disable max-len */
const DroppableFolderRow = DropTarget([ItemTypes.PAGE, ItemTypes.FOLDER], folderTarget, collectDropTarget)(DraggableFolderRow);
/* eslint-enable max-len */

export default connect(mapStateToProps, mapDispatchToProps)(DroppableFolderRow);
