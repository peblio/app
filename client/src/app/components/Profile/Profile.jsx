import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Account from './Account/Account';
import ProfileLevel from '../Dashboard/Documents/ProfileLevel/ProfileLevel';
import {
  fetchAllPages,
  jumpToFolderByShortId
} from '../../action/page';

class Profile extends React.Component {
  static defaultProps = {
    folderShortId: null
  }

  componentWillMount() {
    this.props.fetchAllPages(this.props.profileName)
      .then(() => {
        if (this.props.folderShortId) {
          this.props.jumpToFolderByShortId(this.props.folderShortId);
        }
      });
  }

  componentDidUpdate() {
    if (this.containerEl && this.props.selectedFolderIds.length >= 2) {
      this.containerEl.scrollLeft = this.containerEl.scrollWidth - this.containerEl.clientWidth;
    }
  }

  render() {
    const { profileName, selectedFolderIds } = this.props;
    let folderContainer;
    if (selectedFolderIds.length === 0) {
      console.log(selectedFolderIds);
      folderContainer = <ProfileLevel profileName={profileName} />;
    } else {
      const selectedFolderId = selectedFolderIds[selectedFolderIds.length - 1];
      const folderDepth = selectedFolderIds.length;
      console.log(selectedFolderIds);
      folderContainer = (
        <ProfileLevel
          folderId={selectedFolderId}
          folderDepth={folderDepth}
          profileName={profileName}
        />
      );
    }
    return (
      <div className="profile-pebls__container" ref={(el) => { this.containerEl = el; }}>
        <Account />
        {folderContainer}
      </div>
    );
  }
}

Profile.propTypes = {
  folderShortId: PropTypes.string,
  profileName: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
