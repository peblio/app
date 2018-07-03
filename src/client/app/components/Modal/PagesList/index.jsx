import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FolderContainer from './FolderContainer';
import Modal from '../Modal';
import { fetchAllPages } from '../../../action/page';

require('./pagesList.scss');

class PagesList extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.props.fetchAllPages();
    }
    if (this.containerEl && this.props.selectedFolderIds.length >= 2) {
      this.containerEl.scrollLeft = this.containerEl.scrollWidth - this.containerEl.clientWidth;
    }
  }

  render() {
    const { closeModal, isOpen, selectedFolderIds } = this.props;
    const modalStyle = {
      content: {
        background: '#EAE8E8',
        padding: '30px'
      }
    };
    return (
      <Modal size="xlarge" isOpen={isOpen} closeModal={closeModal} style={modalStyle}>
        <div className="pages__list" ref={(el) => { this.containerEl = el; }}>
          <FolderContainer />
          {selectedFolderIds.map((selectedFolderId, index) => (
            <FolderContainer key={selectedFolderId} folderId={selectedFolderId} folderDepth={index + 1} />
          ))}
        </div>
      </Modal>
    );
  }
}

PagesList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

const DragDropPagesList = DragDropContext(HTML5Backend)(PagesList);

const mapStateToProps = state => ({
  selectedFolderIds: state.page.selectedFolderIds
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAllPages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DragDropPagesList);
