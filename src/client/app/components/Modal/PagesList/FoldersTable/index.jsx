import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FolderRow from '../FolderRow';

class FoldersTable extends Component {
  render() {
    return (
      <table className="pages__table">
        <tbody>
          <tr className="pages__headrow">
            <th className="pages__header">Folders</th>
            <th className="pages__header">Created</th>
            <th className="pages__header">Updated</th>
            <th className="pages__header"></th>
          </tr>
        </tbody>
        {this.props.folders.map(folder => <FolderRow key={folder._id} folder={folder} />)}
      </table>
    );
  }
}

FoldersTable.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default FoldersTable;
