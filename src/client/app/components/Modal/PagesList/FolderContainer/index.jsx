import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FoldersTable from '../FoldersTable';
import PagesTable from '../PagesTable';
import compareTimestamps from '../../../../utils/compare-timestamps';
import PlusIcon from '../../../../images/plus.svg';

class FolderContainer extends Component {
  static defaultProps = {
    folderId: undefined,
    folder: {}
  }

  render() {
    const { childFolders, childPages, folderId, folder } = this.props;
    const title = folderId ? folder.title : 'My files';
    return (
      <div className="pages__folder-container">
        <div className="pages__folder-container-header">
          <span className="pages__folder-container-title">{title}</span>
          <button className="pages__folder-container-new">
            <PlusIcon />
            &nbsp;
            New
          </button>
        </div>
        <div className="pages__table-container">
          {childFolders.length > 0 && <FoldersTable folders={childFolders} folderId={folderId} />}
          <PagesTable pages={childPages} folderId={folderId} />
        </div>
      </div>
    );
  }
}

FolderContainer.propTypes = {
  childFolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  childPages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  folderId: PropTypes.string,
  folder: PropTypes.shape({})
};

const mapStateToProps = (state, ownProps) => ({
  childFolders: Object.values(state.page.folders.byId)
    .filter(folder => folder.parent === ownProps.folderId)
    .sort(compareTimestamps),
  childPages: Object.values(state.page.pages.byId)
    .filter(page => page.folder === ownProps.folderId)
    .sort(compareTimestamps),
  folder: state.page.folders.byId[ownProps.folderId]
});

export default connect(mapStateToProps, null)(FolderContainer);
