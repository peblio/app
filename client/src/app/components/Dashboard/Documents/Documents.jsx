import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfileLevel from './ProfileLevel/ProfileLevel';
import {
  fetchAllPages,
  jumpToFolderByShortId
} from '../../../action/page';

import './documents.scss';

class Documents extends React.Component {
  static defaultProps = {
    folderShortId: null
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.selectedFolderIds);
    if (prevProps.userName !== this.props.userName) {
      this.props.fetchAllPages(this.props.userName)
        .then(() => {
          console.log('*****');
          console.log(this.props.folderShortId);
          console.log('*****');
          if (this.props.folderShortId) {
            this.props.jumpToFolderByShortId(this.props.folderShortId);
          }
        })
        .catch((err) => {
          console.log('*****');
          console.log(err);
        });
    }
    if (this.containerEl && this.props.selectedFolderIds.length >= 2) {
      this.containerEl.scrollLeft = this.containerEl.scrollWidth - this.containerEl.clientWidth;
    }
  }

  render() {
    const { userName, selectedFolderIds } = this.props;
    let folderContainer;
    console.log(selectedFolderIds);
    if (selectedFolderIds.length === 0) {
      folderContainer = <ProfileLevel userName={userName} />;
    } else {
      const selectedFolderId = selectedFolderIds[selectedFolderIds.length - 1];
      const folderDepth = selectedFolderIds.length;
      console.log(selectedFolderIds);
      folderContainer = (
        <ProfileLevel
          folderId={selectedFolderId}
          folderDepth={folderDepth}
          profileName={userName}
        />
      );
    }
    return (
      <div className="profile-pebls__container" ref={(el) => { this.containerEl = el; }}>
        {folderContainer}
      </div>
    );
  }
}

Documents.propTypes = {
  folderShortId: PropTypes.string,
  userName: PropTypes.string.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  jumpToFolderByShortId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedFolderIds: state.page.selectedFolderIds,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  jumpToFolderByShortId,
  fetchAllPages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
