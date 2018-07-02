import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FolderRow from '../FolderRow';
import ItemTypes from '../itemTypes';
import { moveFolderToFolder } from '../../../../action/page.js';

const foldersTableTarget = {
  drop(props, monitor) {
    const { folderId } = monitor.getItem();
    props.moveFolderToFolder(folderId, props.folderId);
  }
};

function collect(_connect, monitor) {
  return {
    connectDropTarget: _connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true })
  };
}

class FoldersTable extends Component {
  static defaultProps = {
    folderId: null,
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <table className="pages__table">
        <tbody>
          <tr className="pages__headrow">
            <th className="pages__header">Folders</th>
            <th className="pages__header">Created</th>
            <th className="pages__header">Updated</th>
            <th className="pages__header"></th>
          </tr>
          {this.props.folders.map(folder => <FolderRow key={folder._id} folder={folder} />)}
        </tbody>
      </table>
    );
  }
}

FoldersTable.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  folderId: PropTypes.string,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isOver: PropTypes.bool.isRequired,
  moveFolderToFolder: PropTypes.func.isRequired
};

const DroppableFoldersTable = DropTarget(ItemTypes.FOLDER, foldersTableTarget, collect)(FoldersTable);

const mapDispatchToProps = dispatch => bindActionCreators({
  moveFolderToFolder
}, dispatch);

export default connect(null, mapDispatchToProps)(DroppableFoldersTable);
