import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashboardView from '../DashboardBase/DashboardBase';

import './profilePreview.scss';

const ProfilePreview = ({ name }) => (
  <DashboardView>
    <div className="profile-preview">
      <iframe
        title="preview user profile"
        className="profile-preview__iframe"
        src={`${window.location.origin}/profile/${name}`}
      />
    </div>
  </DashboardView>
);

ProfilePreview.propTypes = {
  name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  name: state.user.name
});

export default connect(mapStateToProps)(ProfilePreview);
