import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Details from './Details/Details.jsx';
import Pebls from './Pebls/Pebls.jsx';

import * as profileActions from '../../action/profile.js';

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
    if (this.profileName()) {
      const profileName = this.profileName();
      axios.get(`/profile/user/${profileName}`)
        .then((res) => {
          this.props.setProfileName(res.data.name);
          this.props.setProfileImage(res.data.image);
          this.props.setProfilePebls(res.data.pebls);
          this.props.setProfileFolders(res.data.folders);
          axios.get('/api/user')
            .then((res1) => {
              if (res1.data.name == this.props.name) {
                this.props.setIsOwner(true);
              }
            });
        });
    }
  }

  render() {
    return (
      <div>
        <Details
          isOwner={this.props.isOwner}
          name={this.props.name}
          image={this.props.image}
          setProfileImage={this.props.setProfileImage}
        />
        <Pebls
          pebls={this.props.pebls}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  setIsOwner: PropTypes.func.isRequired,
  setProfileImage: PropTypes.func.isRequired,
  setProfileName: PropTypes.func.isRequired,
  setProfilePebls: PropTypes.func.isRequired,
  setProfileFolders: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    folders: state.profile.folders,
    image: state.profile.image,
    isOwner: state.profile.isOwner,
    name: state.profile.name,
    pebls: state.profile.pebls,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    profileActions
  ),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(Profile));
