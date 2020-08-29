import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Filters from './Filters/Filters';
import DashboardView from '../DashboardBase/DashboardBase';
import DocumentsComponent from './DocumentsComponent/DocumentsComponent';

// actions
import {
  deleteFolder,
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders,
  renameFolder,
  renamePage
} from '../../action/page';
import {
  setShareURL,
  viewShareModal,
  closeShareModal
} from '../../action/mainToolbar';

import './documents.scss';

const Documents = props => (
  <DashboardView>
    <Filters />
    <DocumentsComponent
      userName={props.name}
      folders={props.folders}
      pages={props.pages}
      deleteFolder={props.deleteFolder}
      fetchAllPages={props.fetchAllPages}
      jumpToFolderByShortId={props.jumpToFolderByShortId}
      clearSelectedFolders={props.clearSelectedFolders}
      renameFolder={props.renameFolder}
      renamePage={props.renamePage}
      folderShortId={props.match.params.folderShortId}
      selectedFolderIds={props.selectedFolderIds}
      setShareURL={props.setShareURL}
      viewShareModal={props.viewShareModal}
      container="dashboard"
    />
  </DashboardView>
);

Documents.propTypes = {
  clearSelectedFolders: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  jumpToFolderByShortId: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      folderShortId: PropTypes.string
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renameFolder: PropTypes.func.isRequired,
  renamePage: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShareURL: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  name: state.user.name,
  folders: state.page.folders,
  pages: state.page.pages,
  selectedFolderIds: state.page.selectedFolderIds,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteFolder,
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders,
  renameFolder,
  renamePage,
  setShareURL,
  viewShareModal,
  closeShareModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
