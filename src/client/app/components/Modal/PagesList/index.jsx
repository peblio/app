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
  }

  render() {
    const { closeModal, isOpen } = this.props;
    const modalStyle = {
      content: {
        background: '#EAE8E8',
        padding: '30px'
      }
    };
    return (
      <Modal size="large" isOpen={isOpen} closeModal={closeModal} style={modalStyle}>
        <div className="pages__list">
          <FolderContainer />
        </div>
      </Modal>
    );
  }
}

PagesList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchAllPages: PropTypes.func.isRequired
};

const DragDropPagesList = DragDropContext(HTML5Backend)(PagesList);

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAllPages }, dispatch);

export default connect(null, mapDispatchToProps)(DragDropPagesList);
