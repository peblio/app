import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Details from './Details/Details.jsx';
import Pebls from './Pebls/Pebls.jsx';

import * as profileActions from '../../action/profile.js';

import * as userActions from '../../action/user.js';

require('./profile.scss');

const axios = require('axios');
const upload = require('superagent');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
    this.loadProfileDetails = this.loadProfileDetails.bind(this);
  }

  componentWillMount() {
    this.loadProfileDetails();
  }

  profileName() {
    const location = this.props.location.pathname;
    const profileName = location.match(/\/user\/([\w-].*)/);
    return profileName ? profileName[1] : null;
  }

  loadProfileDetails() {
    console.log(this.props);
    if (this.profileName()) {
      const profileName = this.profileName();
      axios.get(`/profile/user/${profileName}`)
        .then((res) => {
          this.props.setProfileName(res.data.name);
          this.props.setUserImage(res.data.image);
          axios.get('/api/user')
            .then((res1) => {
              if (res1.data.name === this.props.name) {
                this.props.setIsOwner(true);
              }
            });
        });
    }
  }

  render() {
    this.state.userName = this.profileName();
    return (
      <div className="profile__container">
        <Details
          isOwner={this.props.isOwner}
          name={this.props.name}
          image={this.props.image}
          setUserImage={this.props.setUserImage}
          updateUserBlurb={this.props.updateUserBlurb}
          blurb={this.props.blurb}
        />
        <Pebls
          profileName={this.state.userName}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  updateUserBlurb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  setIsOwner: PropTypes.func.isRequired,
  setUserImage: PropTypes.func.isRequired,
  setProfileName: PropTypes.func.isRequired,
  setProfilePebls: PropTypes.func.isRequired,
  setProfileFolders: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    image: state.user.image,
    isOwner: state.profile.isOwner,
    name: state.profile.name,
    blurb: state.user.blurb
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    profileActions,
    userActions
  ),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(Profile));
