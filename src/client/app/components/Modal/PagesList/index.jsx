import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FolderRow from './FolderRow';
import PageRow from './PageRow';
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
            <table className="pages__table">
              <tbody>
                <tr className="pages__headrow">
                  <th className="pages__header">Folders</th>
                  <th className="pages__header">Created</th>
                  <th className="pages__header">Updated</th>
                  <th className="pages__header"></th>
                </tr>
                {topLevelFolders.map(folder => (
                  <FolderRow key={folder._id} folder={folder} />
                ))}
              </tbody>
            </table>
          }
          <table className="pages__table">
            <tbody>
              <tr className="pages__headrow">
                <th className="pages__header">Files</th>
                <th className="pages__header">Created</th>
                <th className="pages__header">Updated</th>
                <th className="pages__header"></th>
              </tr>
              {topLevelPages.map(page => (
                <PageRow key={page._id} page={page} />
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
  topLevelFolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  topLevelPages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchAllPages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  topLevelFolders: Object.values(state.page.folders.byId).filter(folder => !folder.parent).sort(compareTimestamps),
  topLevelPages: Object.values(state.page.pages.byId).filter(page => !page.folder).sort(compareTimestamps)
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAllPages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PagesList);
