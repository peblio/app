import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageRow from './PageRow.jsx';
import Modal from '../Modal.jsx';
import { fetchAllPages } from '../../../action/page.js';

require('./pagesList.scss');

class PagesList extends React.Component {
  componentDidMount() {
    this.props.fetchAllPages();
  }

  render() {
    const { closeModal, isOpen, topLevelPageIds } = this.props;
    return (
      <Modal size="large" isOpen={isOpen} closeModal={closeModal}>
        <div className="pages_list">
          <p className="pages_title">Title</p>
          <ol>
            {topLevelPageIds.map(pageId => (
              <PageRow id={pageId} />
            ))}
          </ol>
        </div>
      </Modal>
    );
  }
}

PagesList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  topLevelFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  topLevelPageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchAllPages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  topLevelFolderIds: Object.values(state.page.folders.allIds).filter(folderId => !state.page.folders.byId[folderId].parent),
  topLevelPageIds: Object.values(state.page.pages.allIds).filter(pageId => !state.page.pages.byId[pageId].folder)
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAllPages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PagesList);
