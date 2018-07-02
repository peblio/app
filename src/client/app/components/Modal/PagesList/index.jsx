import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FoldersTable from './FoldersTable';
import PagesTable from './PagesTable';
import Modal from '../Modal';
import { fetchAllPages } from '../../../action/page';
import compareTimestamps from '../../../utils/compare-timestamps';

require('./pagesList.scss');

class PagesList extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.props.fetchAllPages();
    }
  }

  render() {
    const { closeModal, isOpen, topLevelFolders, topLevelPages } = this.props;
    return (
      <Modal size="large" isOpen={isOpen} closeModal={closeModal}>
        <div className="pages__list">
          {topLevelFolders.length > 0 &&
            <FoldersTable folders={topLevelFolders} />
          }
          <PagesTable pages={topLevelPages} />
        </div>
      </Modal>
    );
  }
}

PagesList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  topLevelFolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  topLevelPages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchAllPages: PropTypes.func.isRequired
};

const DragDropPagesList = DragDropContext(HTML5Backend)(PagesList);

const mapStateToProps = state => ({
  topLevelFolders: Object.values(state.page.folders.byId).filter(folder => !folder.parent).sort(compareTimestamps),
  topLevelPages: Object.values(state.page.pages.byId).filter(page => !page.folder).sort(compareTimestamps)
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAllPages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DragDropPagesList);
