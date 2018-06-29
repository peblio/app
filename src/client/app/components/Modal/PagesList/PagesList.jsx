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
        <div className="pages__list">
          <table className="pages__table">
            <tbody>
              <tr className="pages__headrow">
                <th className="pages__header">Title</th>
                <th className="pages__header">Date Created</th>
                <th className="pages__header">Date Updated</th>
                <th className="pages__header"></th>
              </tr>
              {topLevelPageIds.map(pageId => (
                <PageRow key={pageId} id={pageId} />
              ))}
            </tbody>
          </table>
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
