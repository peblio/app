import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Documents from '../Shared/Documents/Documents';
import Nav from '../Shared/Nav/Nav';

import {
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders,
  fetchProfile
} from '../../action/profile';

import './profile.scss';

class Profile extends React.Component {
  componentWillMount() {
    this.props.fetchProfile(this.props.match.params.userName);
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="profile__container">
          <div className="profile__user-container">
            <div className="profile__image-container">
              <img className="profile__image" src={this.props.image} alt="profile" />
            </div>
            <h1 className="profile__name">
              {this.props.name}
            </h1>
            <p className="profile__blurb">
              {this.props.blurb}
            </p>
          </div>
          <div className="profile__documents">
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
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  blurb: PropTypes.string.isRequired,
  clearSelectedFolders: PropTypes.func.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  jumpToFolderByShortId: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      folderShortId: PropTypes.string,
      userName: PropTypes.string
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,

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
