import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveLog } from '../../../../utils/log';
import { closeSignUpModal } from '../../../../action/mainToolbar.js';
import GoogleLoginButton from '../../Shared/GoogleLoginButton/GoogleLoginButton.jsx';
import { setNextScreen } from '../../../../action/user.js';

require('./signupoption.scss');

class SignUpOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: '',
      isFormVisible: true
    };
  }

  onClick = () => {
    this.props.setNextScreen('PeblioSignUpForm');
  }

  signUpFailed = (error) => {
    this.setState({
      showNotice: true,
      notice: error.response.data.msg
    });
  }

  signUpSuccessful = (msg) => {
    this.setState({
      showNotice: true,
      notice: msg,
      isFormVisible: false
    });
  }

  googleLoginSuccessful = (response) => {
    this.props.closeSignUpModal();
    const log = {
      message: 'User Logged In using Google',
      path: '/auth/login',
      action: 'LoginUserWithGoogle',
      module: 'ui',
      level: 'INFO',
      user: response.data.user.name
    };
    saveLog(log);
  }

  render() {
    return (
      <div className="signup-modal__content">
        {this.state.isFormVisible && (
          <GoogleLoginButton
            onLoginSuccess={this.googleLoginSuccessful}
            onLoginFailure={this.signUpFailed}
            userType={this.props.userType}
            requiresGuardianConsent={this.props.requiresGuardianConsent}
            guardianEmail={this.props.guardianEmail}
            name={this.props.name}
          />
        )}
        <div className="signup-modal__buttonholder">
          <button
            className="signup-modal__button"
            data-test="signup-modal__button-next"
            onClick={this.onClick}
          >
                Sign in with Peblio
          </button>
        </div>
        {this.state.showNotice && (
          <p className="signup-modal__notice">
            {this.state.notice}
          </p>
        )}
      </div>
    );
  }
}

SignUpOption.propTypes = {
  closeSignUpModal: PropTypes.func.isRequired,
  setNextScreen: PropTypes.func.isRequired,
  guardianEmail: PropTypes.string.isRequired,
  requiresGuardianConsent: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
  return {
    requiresGuardianConsent: state.user.requiresGuardianConsent,
    userType: state.user.type,
    studentBirthday: state.user.studentBirthday,
    guardianEmail: state.user.guardianEmail,
    name: state.user.name
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  closeSignUpModal,
  setNextScreen
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpOption);
