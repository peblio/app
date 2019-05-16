import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Account from './Account/Account';
import Trash from './Trash/Trash';
import Documents from '../Shared/Documents/Documents';
import Nav from './Nav/Nav';

import {
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders
} from '../../action/page';


import * as userActions from '../../action/user';

import './dashboard.scss';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchCurrentUser()
      .then(() => {
        this.props.fetchUserProfile(this.props.name);
      });
  }

  renderDashboardView=(dashboardView) => {
    switch (dashboardView) {
      case 'documents':
        return (
          <Documents
            userName={this.props.name}
            folderShortId={this.props.match.params.folderShortId}
            fetchAllPages={this.props.fetchAllPages}
            jumpToFolderByShortId={this.props.jumpToFolderByShortId}
            clearSelectedFolders={this.props.clearSelectedFolders}
            folders={this.props.folders}
            pages={this.props.pages}
            selectedFolderIds={this.props.selectedFolderIds}
            container="dashboard"
          />
        );
      case 'account': return (
        <Account
          name={this.props.name}
          image={this.props.image}
          blurb={this.props.blurb}
          updateUserProfileImage={this.props.updateUserProfileImage}
          updateProfileBlurb={this.props.updateProfileBlurb}
          setUserBlurb={this.props.setUserBlurb}
        />
      );
      case 'trash': return (
        <Trash
          name={this.props.name}
        />
      );
      case 'profile': {
        const url = `${window.location.origin}/profile/${this.props.name}`;
        return (
          <div className="dashboard__profile">
            <iframe
              title="preview user profile"
              className="dashboard__iframe"
              src={url}
            />
          </div>
        ); }
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <div className="dashboard__container">
          <Nav />

          {this.renderDashboardView(this.props.dashboardView)}

        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  blurb: PropTypes.string.isRequired,
  clearSelectedFolders: PropTypes.func.isRequired,
  dashboardView: PropTypes.number.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  jumpToFolderByShortId: PropTypes.func.isRequired,
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
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setUserBlurb: PropTypes.func.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  updateUserProfileImage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    image: state.user.image,
    name: state.user.name,
    blurb: state.user.blurb,
    dashboardView: state.dashboard.dashboardView,
    folders: state.page.folders,
    pages: state.page.pages,
    selectedFolderIds: state.page.selectedFolderIds,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSelectedFolders,
    fetchAllPages,
    jumpToFolderByShortId,
    ...userActions
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard));
