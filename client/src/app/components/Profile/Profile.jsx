import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Documents from '../Shared/Documents/Documents';

import {
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders,
  fetchProfile
} from '../../action/profile';

class Profile extends React.Component {
  componentWillMount() {
    this.props.fetchProfile(this.props.match.params.userName);
  }

  render() {
    return (
      <div>
        <Documents
          userName={this.props.match.params.userName}
          folderShortId={this.props.match.params.folderShortId}
          fetchAllPages={this.props.fetchAllPages}
          jumpToFolderByShortId={this.props.jumpToFolderByShortId}
          clearSelectedFolders={this.props.clearSelectedFolders}
          folders={this.props.folders}
          pages={this.props.pages}
          selectedFolderIds={this.props.selectedFolderIds}
          container="profile"
        />
      </div>
    );
  }
}

Profile.propTypes = {
  blurb: PropTypes.string.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      folderShortId: PropTypes.string
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  setUserBlurb: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    image: state.profile.image,
    name: state.profile.name,
    blurb: state.profile.blurb,
    folders: state.profile.folders,
    pages: state.profile.pages,
    selectedFolderIds: state.profile.selectedFolderIds,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSelectedFolders,
    fetchAllPages,
    jumpToFolderByShortId,
    fetchProfile
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(Profile));
