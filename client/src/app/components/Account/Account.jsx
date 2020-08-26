import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountComponent from './AccountComponent/AccountComponent';
import DashboardView from '../DashboardBase/DashboardBase';

import {
  updateProfileBlurb,
  updateUserProfileImage,
  setUserBlurb,
  fetchUserProfile,
} from '../../action/user';

const Account = ({
  name,
  image,
  blurb,
  // eslint-disable-next-line no-shadow
  updateUserProfileImage,
  // eslint-disable-next-line no-shadow
  updateProfileBlurb,
  // eslint-disable-next-line no-shadow
  setUserBlurb,
  // eslint-disable-next-line no-shadow
  fetchUserProfile,
  loading,
}) => {
  useEffect(() => {
    fetchUserProfile(name);
  }, [loading]);

  return (
    <DashboardView>
      <AccountComponent
        name={name}
        image={image}
        blurb={blurb}
        updateUserProfileImage={updateUserProfileImage}
        updateProfileBlurb={updateProfileBlurb}
        setUserBlurb={setUserBlurb}
      />
    </DashboardView>
  );
};

Account.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  updateUserProfileImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  setUserBlurb: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  image: state.user.image,
  name: state.user.name,
  blurb: state.user.blurb,
  loading: state.user.loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfileBlurb,
  updateUserProfileImage,
  setUserBlurb,
  fetchUserProfile,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Account);
