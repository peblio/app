import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FoldersTable from '../FoldersTable';
import PagesTable from '../PagesTable';
import { createFolder, createPage } from '../../../../action/page';
import compareTimestamps from '../../../../utils/compare-timestamps';
import PlusIcon from '../../../../images/plus.svg';

class FolderContainer extends Component {
  static defaultProps = {
    folderId: undefined,
    folder: {}
  }

  constructor(props) {
    super(props);
    this.state = { newFolderDropdownIsOpen: false };
  }

  createFolder = (e) => {
    e.preventDefault();
    this.props.createFolder('New Folder', this.props.folderId);
    this.hideNewFolderDropdown();
  }

  createPage = (e) => {
    e.preventDefault();
    this.props.createPage('New Page', this.props.folderId);
    this.hideNewFolderDropdown();
  }

  hideNewFolderDropdown = () => {
    this.setState({ newFolderDropdownIsOpen: false });
  }

  toggleNewFolderDropdown = () => {
    this.setState(prevState => ({
      newFolderDropdownIsOpen: !prevState.newFolderDropdownIsOpen
    }));
  }

  render() {
    const { childFolders, childPages, folderId, folder } = this.props;
    const { newFolderDropdownIsOpen } = this.state;
    const title = folderId ? folder.title : 'My files';
    return (
      <div className="pages__folder-container">
        <div className="pages__folder-container-header">
          <span className="pages__folder-title">{title}</span>
          <div className="pages__new-folder-wrapper">
            <button className="pages__new-folder" onClick={this.toggleNewFolderDropdown}>
              <PlusIcon />
              &nbsp;
              New
            </button>
            {newFolderDropdownIsOpen &&
              <ul className="pages__new-folder-dropdown">
                {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                <li className="pages__new-folder-dropdown-item">
                  <a onClick={this.createFolder}>Folder</a>
                </li>
                <li className="pages__new-folder-dropdown-item">
                  <a onClick={this.createPage}>Page</a>
                </li>
                {/* eslint-enable jsx-a11y/no-static-element-interactions */}
              </ul>
            }
          </div>
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
  createFolder: PropTypes.func.isRequired,
  createPage: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => bindActionCreators({
  createFolder,
  createPage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FolderContainer);
