import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from '../../../../utils/axios';
import { saveLog } from '../../../../utils/log';
import { closeSignUpModal } from '../../../../action/mainToolbar.js';
import { setUserName,
  setUserType,
  setGuardianConsent } from '../../../../action/user.js';
import GoogleLoginButton from '../../Shared/GoogleLoginButton/GoogleLoginButton.jsx';

require('./signupoption.scss');

class SignUpOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: '',
      isUserTypeSelected: false,
      isFormVisible: true
    };
  }

  passwordMatch = (a, b) => (a === b)

  passwordMatchFailed = () => {
    this.setState({
      showNotice: true,
      notice: 'Passwords did not match.'
    });
  }

  userTypeSelected = () => {
    this.setState({
      isUserTypeSelected: true
    });
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
    this.props.setUserName(response.data.user.name);
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

  submitSignUpUser = (
    event,
    mail,
    name,
    userType,
    password,
    requiresGuardianConsent,
    guardianEmail,
    studentBirthday
  ) => {
    if (this.passwordMatch(this.password.value, this.passwordConfirm.value)) {
      axios.post('/auth/signup', {
        mail,
        name,
        userType,
        password,
        requiresGuardianConsent,
        guardianEmail,
        studentBirthday
      })
        .then(res => this.signUpSuccessful(res.data.msg))
        .then(() => {
          const log = {
            message: 'User Signed up',
            path: '/auth/signup',
            action: 'Signup User',
            module: 'ui',
            level: 'INFO',
            user: name
          };
          saveLog(log);
        })
        .catch(this.signUpFailed);
    } else {
      this.passwordMatchFailed();
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="signup-modal__content">
        <GoogleLoginButton
          onLoginSuccess={this.googleLoginSuccessful}
          onLoginFailure={this.signUpFailed}
          userType={this.props.userType}
          requiresGuardianConsent={this.props.requiresGuardianConsent}
          guardianEmail={this.props.guardianEmail}
        />
        <div className="signup-modal__buttonholder">
          <button
            className="signup-modal__button"
            data-test="signup-modal__button-next"
            value="Submit"
          >
                Sign in with Peblio
          </button>
        </div>
      </div>
    );
  }
}

SignUpOption.propTypes = {
  closeSignUpModal: PropTypes.func.isRequired,
  setGuardianConsent: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
  guardianEmail: PropTypes.string.isRequired,
  requiresGuardianConsent: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  studentBirthday: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
  return {
    requiresGuardianConsent: state.user.requiresGuardianConsent,
    userType: state.user.type,
    studentBirthday: state.user.studentBirthday,
    guardianEmail: state.user.guardianEmail
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  closeSignUpModal,
  setGuardianConsent,
  setUserName,
  setUserType
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpOption);
