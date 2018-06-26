import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Pebls from './Pebls/Pebls.jsx';

import * as profileActions from '../../action/profile.js';

const axios = require('axios');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.loadProfileDetails = this.loadProfileDetails.bind(this);
  }

  componentWillMount() {
    this.loadProfileDetails();
  }

  userName() {
    const location = this.props.location.pathname;
    console.log(location);
    const userName = location.match(/\/user\/([\w-].*)/);
    console.log(userName[1]);
    return userName ? userName[1] : null;
  }

  loadProfileDetails() {
    if (this.userName()) {
      const userName = this.userName();
      console.log(`/profile/user/${userName}`);
      axios.get(`/profile/user/${userName}`)
        .then((res) => {
          console.log(res.data);
          this.props.setProfileName(res.data.name);
          this.props.setProfilePebls(res.data.pebls);
          this.props.setProfileFolders(res.data.folders);
        });
    }
  }

  render() {
    return (
      <div>
        Welcome {this.props.name} !
        <Pebls
          pebls={this.props.pebls}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  setProfileName: PropTypes.func.isRequired,
  setProfilePebls: PropTypes.func.isRequired,
  setProfileFolders: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.profile.name,
    pebls: state.profile.pebls,
    folders: state.profile.folders,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    profileActions
  ),
  dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(Profile));
