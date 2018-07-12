import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FolderContainer from './FolderContainer/FolderContainer.jsx';
import {
  fetchAllPages,
  viewFolder,
  clearSelectedFolders
} from '../../../action/page';

require('./pebls.scss');

class Pebls extends React.Component {
  componentDidMount() {
    this.props.fetchAllPages(this.props.profileName);
  }

  componentDidUpdate() {
    if (this.containerEl && this.props.selectedFolderIds.length >= 2) {
      this.containerEl.scrollLeft = this.containerEl.scrollWidth - this.containerEl.clientWidth;
    }
  }

  render() {
    const { selectedFolderIds } = this.props;
    const folderObjects = {};
    if (this.props.folders.length > 0) {
      this.props.folders.map((folder) => {
        folderObjects[folder.id] = folder;
      });
    }
    const currentFolderIndex = selectedFolderIds ? selectedFolderIds.length - 1 : -1;
    const currentFolderId = selectedFolderIds ? selectedFolderIds[currentFolderIndex] : null;
    console.log(currentFolderIndex);
    console.log(currentFolderId);
    return (
      <div className="profile-pebls__container" ref={(el) => { this.containerEl = el; }}>
        Breadcrumbs
        <button
          onClick={() => this.props.clearSelectedFolders(0)}
        >
        Home
        </button>
        {
          selectedFolderIds.map((selectedFolderId, index) => {
            const crumbTitle = folderObjects[selectedFolderId].title;
            return (
              <button
                onClick={() => this.props.viewFolder(selectedFolderId, index)}
              >
                {crumbTitle} >
              </button>
            );
          }
        )
        }
        <FolderContainer />
        {selectedFolderIds.map((selectedFolderId, index) => (
          <FolderContainer key={selectedFolderId} folderId={selectedFolderId} folderDepth={index + 1} />
          ))}

      </div>
    );
  }
}

Pebls.propTypes = {
  clearSelectedFolders: PropTypes.func.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  selectedFolderIds: state.page.selectedFolderIds
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clearSelectedFolders,
  viewFolder,
  fetchAllPages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pebls);
