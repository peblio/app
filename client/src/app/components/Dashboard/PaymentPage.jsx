import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../App/Payment/CheckoutForm';
import {
  deleteFolder,
  fetchAllPages,
  jumpToFolderByShortId,
  clearSelectedFolders,
  renameFolder,
  renamePage
} from '../../action/page';

import {
  setShareURL,
  viewShareModal,
  closeShareModal
} from '../../action/mainToolbar';


import * as userActions from '../../action/user';

import './dashboard.scss';

class PaymentPage extends React.Component {
  componentWillMount() {
    this.props.fetchCurrentUser()
      .then(() => {
        this.props.fetchUserProfile(this.props.name);
      });
  }

  render() {
    console.log('rendered');
    return (
      <StripeProvider apiKey="pk_test_9tSHnj3NTrLMsz2qOWYy4fn700dtmhzIa2">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

PaymentPage.propTypes = {
  blurb: PropTypes.string.isRequired,
  clearSelectedFolders: PropTypes.func.isRequired,
  closeShareModal: PropTypes.func.isRequired,
  dashboardView: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  fetchAllPages: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  jumpToFolderByShortId: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  isShareModalOpen: PropTypes.bool.isRequired,
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
  renameFolder: PropTypes.func.isRequired,
  renamePage: PropTypes.func.isRequired,
  selectedFolderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShareURL: PropTypes.func.isRequired,
  setUserBlurb: PropTypes.func.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  updateUserProfileImage: PropTypes.func.isRequired,
  viewShareModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    image: state.user.image,
    isShareModalOpen: state.mainToolbar.isShareModalOpen,
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
    deleteFolder,
    fetchAllPages,
    jumpToFolderByShortId,
    setShareURL,
    viewShareModal,
    closeShareModal,
    renameFolder,
    renamePage,
    ...userActions
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(PaymentPage));
