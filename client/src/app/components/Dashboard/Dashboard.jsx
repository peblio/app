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
      });
  }

  renderDashboardView=(dashboardView) => {
    switch (dashboardView) {
      case 'documents':
        return (
          <Documents
            userName={this.props.name}
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
  dashboardView: PropTypes.number.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
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
