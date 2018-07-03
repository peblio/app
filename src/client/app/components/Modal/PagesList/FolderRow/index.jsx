import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import ItemTypes from '../itemTypes';
import formatDate from '../../../../utils/format-date.js';
import {
  deleteFolder,
  moveFolderToFolder,
  movePageToFolder
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
      props.moveFolderToFolder(folderId, props.folder._id);
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

  render() {
    const { connectDragSource, connectDropTarget, folder } = this.props;
    return connectDragSource(connectDropTarget(
      <tr className="pages__row">
        <td className="pages__col pages__col_title">{folder.title}</td>
        <td className="pages__col">{formatDate(folder.createdAt)}</td>
        <td className="pages__col">{formatDate(folder.updatedAt)}</td>
        <td className="pages__col">
          <button className="pages__delete" onClick={this.deleteFolder}>
            <DeleteIcon alt="delete page" />
          </button>
        </td>
      </tr>
    ));
  }
}

FolderRow.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  folder: PropTypes.shape({ _id: PropTypes.string }).isRequired,
  /* eslint-disable react/no-unused-prop-types */
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  moveFolderToFolder: PropTypes.func.isRequired,
  movePageToFolder: PropTypes.func.isRequired
  /* eslint-enable react/no-unused-prop-types */
};

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteFolder,
  moveFolderToFolder,
  movePageToFolder
}, dispatch);

const DraggableFolderRow = DragSource(ItemTypes.FOLDER, folderSource, collectDragSource)(FolderRow);
/* eslint-disable max-len */
const DroppableFolderRow = DropTarget([ItemTypes.PAGE, ItemTypes.FOLDER], folderTarget, collectDropTarget)(DraggableFolderRow);
/* eslint-enable max-len */

export default connect(null, mapDispatchToProps)(DroppableFolderRow);
