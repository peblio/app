import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddDescription from './AddDescription/AddDescription.jsx';
import ConfirmUser from './ConfirmUser/ConfirmUser.jsx';
import ExamplesModal from './ExamplesModal/ExamplesModal.jsx';
import ForkPrompt from './ForkPrompt/ForkPrompt.jsx';
import Login from './Login/Login.jsx';
import Modal from './Modal.jsx';
import PasswordForgot from './PasswordForgot/PasswordForgot.jsx';
import ShareModal from './ShareModal/ShareModal.jsx';
import SignUp from './SignUp/SignUp.jsx';
import PagesList from './PagesList/PagesList.jsx';
import PasswordReset from './PasswordReset/PasswordReset.jsx';
import Welcome from './Welcome/Welcome.jsx';

import * as mainToolbarActions from '../../../action/mainToolbar.js';

class MainModals extends React.Component {
  render() {
    return (
      <div>
        <Modal
          size="xlarge"
          isOpen={this.props.isPagesModalOpen}
          closeModal={this.props.closePagesModal}
        >
          <PagesList />
        </Modal>

        <Modal
          size="xlarge"
          isOpen={this.props.isExamplesModalOpen}
          closeModal={this.props.closeExamplesModal}
        >
          <ExamplesModal />
        </Modal>

        <Modal
          size="large"
          isOpen={this.props.isLoginModalOpen}
          closeModal={this.props.closeLoginModal}
        >
          <Login
            authLoadedPage={this.authLoadedPage}
          />
        </Modal>

        <Modal
          size="large"
          isOpen={this.props.isForgotModalOpen}
          closeModal={this.props.closeForgotModal}
        >
          <PasswordForgot
            isForgotModalOpen={this.props.isForgotModalOpen}
          />
        </Modal>

        <Modal
          size="large"
          isOpen={this.props.isResetModalOpen}
          closeModal={this.props.closeResetModal}
        >
          <PasswordReset
            isResetModalOpen={this.props.isResetModalOpen}
            location={this.props.location}
          />
        </Modal>

        <Modal
          size="auto"
          isOpen={this.props.isSignUpModalOpen}
          closeModal={this.props.closeSignUpModal}
        >
          <SignUp
            authLoadedPage={this.authLoadedPage}
          />
        </Modal>
        <Modal
          size="small"
          isOpen={this.props.isConfirmUserModalOpen}
          closeModal={this.props.closeConfirmUserModal}
        >
          <ConfirmUser
            location={this.props.location}
          />
        </Modal>
        <Modal
          size="small"
          isOpen={this.props.isShareModalOpen}
          closeModal={this.props.closeShareModal}
        >
          <ShareModal
            pageTitle={this.props.pageTitle}
          />
        </Modal>

        <Modal
          size="small"
          isOpen={this.props.isAddDescriptionModalOpen}
          closeModal={this.props.closeAddDescriptionModal}
        >
          <AddDescription
            savePage={this.savePage}
            closeModal={this.props.closeAddDescriptionModal}
          />
        </Modal>

        <Modal
          size="auto"
          isOpen={this.props.isWelcomeModalOpen}
          closeModal={this.props.closeWelcomeModal}
        >
          <Welcome />
        </Modal>
        {(this.showForkPromptPreference() && !this.props.isBrowsingPebl && !this.props.canEdit) && (
          <Modal
            size="auto"
            isOpen={this.props.isForkPromptOpen}
            closeModal={this.props.closeForkPrompt}
          >
            <ForkPrompt
              savePage={this.savePage}
            />
          </Modal>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAccountDropdownOpen: state.mainToolbar.isAccountDropdownOpen,
    isAddDescriptionModalOpen: state.mainToolbar.isAddDescriptionModalOpen,
    isExamplesModalOpen: state.mainToolbar.isExamplesModalOpen,
    isFileDropdownOpen: state.mainToolbar.isFileDropdownOpen,
    isHelpDropdownOpen: state.mainToolbar.isHelpDropdownOpen,
    isPagesModalOpen: state.mainToolbar.isPagesModalOpen,
    isShareModalOpen: state.mainToolbar.isShareModalOpen,
    isWelcomeModalOpen: state.mainToolbar.isWelcomeModalOpen,

    isLoginModalOpen: state.mainToolbar.isLoginModalOpen,
    isSignUpModalOpen: state.mainToolbar.isSignUpModalOpen,
    isForgotModalOpen: state.mainToolbar.isForgotModalOpen,
    isResetModalOpen: state.mainToolbar.isResetModalOpen,
    isConfirmUserModalOpen: state.mainToolbar.isConfirmUserModalOpen,
    isForkPromptOpen: state.mainToolbar.isForkPromptOpen,
  };
}
MainModals.propTypes = {

  isAccountDropdownOpen: PropTypes.bool.isRequired,
  isAddDescriptionModalOpen: PropTypes.bool.isRequired,
  isExamplesModalOpen: PropTypes.bool.isRequired,
  isFileDropdownOpen: PropTypes.bool.isRequired,
  isHelpDropdownOpen: PropTypes.bool.isRequired,
  isPagesModalOpen: PropTypes.bool.isRequired,
  isShareModalOpen: PropTypes.bool.isRequired,
  isWelcomeModalOpen: PropTypes.bool.isRequired,

  isLoginModalOpen: PropTypes.bool.isRequired,
  isSignUpModalOpen: PropTypes.bool.isRequired,
  isForgotModalOpen: PropTypes.bool.isRequired,
  isResetModalOpen: PropTypes.bool.isRequired,
  isConfirmUserModalOpen: PropTypes.bool.isRequired,
  isForkPromptOpen: PropTypes.bool.isRequired,

};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...mainToolbarActions,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainModals);
