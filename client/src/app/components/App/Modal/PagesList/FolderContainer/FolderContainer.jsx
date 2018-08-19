import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FoldersTable from '../FoldersTable/FoldersTable.jsx';
import PagesTable from '../PagesTable/PagesTable.jsx';
import { clearSelectedFolders, createFolder, createPage } from '../../../../../action/page';
import compareTimestamps from '../../../../../utils/compare-timestamps';
import PlusIcon from '../../../../../images/plus.svg';

class FolderContainer extends Component {
  static defaultProps = {
    folderDepth: 0,
    folderId: undefined,
    folder: {}
  }

  constructor(props) {
    super(props);
    this.state = { newFolderDropdownIsOpen: false };
  }

  clearSelectedFolders = () => {
    this.props.clearSelectedFolders(this.props.folderDepth);
  }

  createFolder = (e) => {
    e.stopPropagation();
    this.props.createFolder('New Folder', this.props.folderId);
    this.hideNewFolderDropdown();
  }

  createPage = (e) => {
    e.stopPropagation();
    this.props.createPage('New Page', this.props.folderId);
    this.hideNewFolderDropdown();
  }

  handleClick = () => {
    this.hideNewFolderDropdown();
    this.clearSelectedFolders();
  }

  hideNewFolderDropdown = () => {
    this.setState({ newFolderDropdownIsOpen: false });
  }

  toggleNewFolderDropdown = (e) => {
    e.stopPropagation();
    this.setState(prevState => ({
      newFolderDropdownIsOpen: !prevState.newFolderDropdownIsOpen
    }));
  }

  render() {
    const { childFolders, childPages, folderDepth, folderId, folder } = this.props;
    const { newFolderDropdownIsOpen } = this.state;
    const title = folderId ? folder.title : 'My Files';
    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div className="pages__folder-container" onClick={this.handleClick}>
        <div className="pages__folder-container-header">
          <span className="pages__folder-title">{title}</span>
          <div className="pages__new-folder-wrapper">
            <button className="pages__new-folder" onClick={this.toggleNewFolderDropdown}>
              <PlusIcon />
              &nbsp;
              New
            </button>
            {newFolderDropdownIsOpen && (
              <ul className="pages__new-folder-dropdown">
                <li className="pages__new-folder-dropdown-item" onClick={this.createFolder}>
                  Folder
                </li>
                <li className="pages__new-folder-dropdown-item" onClick={this.createPage}>
                  Page
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="pages__table-container">
          {childFolders.length > 0 &&
            <FoldersTable folders={childFolders} folderId={folderId} folderDepth={folderDepth} />
          }
          <PagesTable pages={childPages} folderId={folderId} />
        </div>
      </div>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );
  }
}

FolderContainer.propTypes = {
  childFolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  childPages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  clearSelectedFolders: PropTypes.func.isRequired,
  createFolder: PropTypes.func.isRequired,
  createPage: PropTypes.func.isRequired,
  folderDepth: PropTypes.number,
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
  clearSelectedFolders,
  createFolder,
  createPage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FolderContainer);
