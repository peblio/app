import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FolderContainer from './FolderContainer/FolderContainer.jsx';
import { fetchAllPages } from '../../../action/page';

require('./pagesList.scss');

class PagesList extends React.Component {
  componentDidMount() {
    this.props.fetchAllPages();
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

PagesList.propTypes = {
  fetchAllPages: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

const DragDropPagesList = DragDropContext(HTML5Backend)(PagesList);

const mapStateToProps = state => ({
  selectedFolderIds: state.page.selectedFolderIds
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAllPages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DragDropPagesList);
