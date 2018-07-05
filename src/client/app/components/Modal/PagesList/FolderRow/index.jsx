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
  viewFolder
} from '../../../../action/page.js';
import DeleteIcon from '../../../../images/trash.svg';

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
  deleteFolder = (e) => {
    e.stopPropagation();
    this.props.deleteFolder(this.props.folder._id);
  }

  editTitle = (e) => {
    if (this.props.isSelected) {
      // TODO: put the folder row into editing mode
    }
  }

  viewFolder = (e) => {
    e.stopPropagation();
    this.props.viewFolder(this.props.folder._id, this.props.folderDepth);
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
      'pages__col_selected-folder': isSelected,
      'pages__col_dragging': isDragging,
      'pages__col_drop-target': isOver
    });
    return connectDragSource(connectDropTarget(
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <tr className="pages__row" onClick={this.viewFolder}>
        <td className={classNames(colClassName, 'pages__col_title')} onClick={this.editTitle}>
          {folder.title}
        </td>
        {width > 350 &&
          <React.Fragment>
            <td className={colClassName}>{formatDate(folder.createdAt)}</td>
            <td className={colClassName}>{formatDate(folder.updatedAt)}</td>
          </React.Fragment>
        }
        <td className={colClassName}>
          <button className="pages__delete" onClick={this.deleteFolder}>
            <DeleteIcon alt="delete page" />
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
  folder: PropTypes.shape({ _id: PropTypes.string }).isRequired,
  folderDepth: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  /* eslint-disable react/no-unused-prop-types */
  moveFolderToFolder: PropTypes.func.isRequired,
  movePageToFolder: PropTypes.func.isRequired,
  /* eslint-enable react/no-unused-prop-types */
  viewFolder: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isSelected: state.page.selectedFolderIds.includes(ownProps.folder._id)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteFolder,
  moveFolderToFolder,
  movePageToFolder,
  viewFolder
}, dispatch);

const DraggableFolderRow = DragSource(ItemTypes.FOLDER, folderSource, collectDragSource)(FolderRow);
/* eslint-disable max-len */
const DroppableFolderRow = DropTarget([ItemTypes.PAGE, ItemTypes.FOLDER], folderTarget, collectDropTarget)(DraggableFolderRow);
/* eslint-enable max-len */

export default connect(mapStateToProps, mapDispatchToProps)(DroppableFolderRow);
