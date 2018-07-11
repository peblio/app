import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FolderContainer from './FolderContainer/FolderContainer.jsx';
import { fetchAllPages } from '../../../action/page';

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
    return (
      <div className="pages__list" ref={(el) => { this.containerEl = el; }}>
        <FolderContainer />
        {selectedFolderIds.map((selectedFolderId, index) => (
          <FolderContainer key={selectedFolderId} folderId={selectedFolderId} folderDepth={index + 1} />
        ))}
      </div>
    );
  }
}

Pebls.propTypes = {
  fetchAllPages: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  selectedFolderIds: state.page.selectedFolderIds
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAllPages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pebls);


/*
  <div className="pebls__content">
    <div className="pebls__heading">
      <p> All Work </p>
    </div>

    <div className="pebls__subheading">
      <p> FOLDERS </p>
    </div>
    <div className="pebls__subheading">
      <p> FILES </p>
    </div>
    <ol className="pebls__files">
      {Pebls}
    </ol>
  </div>
  */
