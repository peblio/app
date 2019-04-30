import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Account from './Account/Account';
import Documents from './Documents/Documents';
import Nav from './Nav/Nav';


import * as userActions from '../../action/user';

import './dashboard.scss';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchCurrentUser()
      .then(() => {
        this.props.fetchUserProfile(this.props.name);
        console.log(this.props.name);
      });
    // const userName = this.props.match.params.userName;
    // if (!userName) {
    //   return;
    // }
    // this.props.fetchProfile(userName);
  }

  renderDashboardView=(dashboardView) => {
    const userName = this.props.match.params.userName;
    switch (dashboardView) {
      case 'documents':
        return (
          <Documents
            profileName={this.props.name}
            folderShortId={this.props.match.params.folderShortId}
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
    }
  }

  render() {
    return (
      <div>
        <div className="dashboard__container">
          <Nav />

          {this.renderDashboardView('account')}

        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  blurb: PropTypes.string.isRequired,
  dashboardView: PropTypes.number.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  setUserBlurb: PropTypes.func.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  updateUserProfileImage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    image: state.user.image,
    name: state.user.name,
    blurb: state.user.blurb,
    dashboardView: state.dashboard.dashboardView
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},

    userActions),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard));
