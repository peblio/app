import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../../../../utils/axios';
import { saveLog } from '../../../../utils/log';
import { closeSignUpModal } from '../../../../action/mainToolbar.js';
import { setUserName } from '../../../../action/user.js';
import GoogleLoginButton from '../../Shared/GoogleLoginButton/GoogleLoginButton.jsx';

require('./signup.scss');

class PeblioSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: '',
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

  submitSignUpUser = (event) => {
    const loginData = {
      mail: this.userMail ? this.userMail.value : null,
      name: this.props.name,
      userType: this.props.userType,
      password: this.password.value,
      requiresGuardianConsent: this.props.requiresGuardianConsent,
      guardianEmail: this.props.guardianEmail,
      studentBirthday: this.props.studentBirthday
    };
    if (this.passwordMatch(this.password.value, this.passwordConfirm.value)) {
      axios.post('/auth/signup', { ...loginData })
        .then(res => this.signUpSuccessful(res.data.msg))
        .then(() => {
          const log = {
            message: 'User Signed up',
            path: '/auth/signup',
            action: 'Signup User',
            module: 'ui',
            level: 'INFO',
            user: this.props.name
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
        {this.state.isFormVisible && (
          <div>
            <GoogleLoginButton
              onLoginSuccess={this.googleLoginSuccessful}
              onLoginFailure={this.signUpFailed}
              userType={this.props.userType}
              requiresGuardianConsent={this.props.requiresGuardianConsent}
              guardianEmail={this.props.guardianEmail}
              name={this.props.name}
            />
            <p className="signup-modal__text-secondary">or</p>
            {this.props.guardianEmail === null && (
              <div className="signup-modal__div">
                <input
                  required
                  className="signup-modal__input"
                  data-test="signup-modal__input-email"
                  id="signup-modal-mail"
                  placeholder="email"
                  ref={(userMail) => { this.userMail = userMail; }}
                  type="email"
                />
              </div>
            )}
            <div className="signup-modal__div">
              <input
                required
                className="signup-modal__input"
                data-test="signup-modal__input-pswd"
                id="signup-modal-password"
                placeholder="password"
                ref={(password) => { this.password = password; }}
                type="password"
              />
              <input
                required
                id="signup-modal-confirm"
                className="signup-modal__input"
                data-test="signup-modal__input-pswd-confirm"
                placeholder="retype password"
                type="password"
                ref={(passwordConfirm) => { this.passwordConfirm = passwordConfirm; }}
              />
            </div>
            <div className="signup-modal__buttonholder">
              <button
                className="signup-modal__button"
                data-test="signup-modal__button-submit"
                onClick={this.submitSignUpUser}
                value="Submit"
              >
                  Sign in with Peblio
              </button>
            </div>
          </div>
        )}
        {this.state.showNotice && (
          <p className="signup-modal__notice">
            {this.state.notice}
          </p>
        )}
      </div>
    );
  }
}

PeblioSignUpForm.propTypes = {
  closeSignUpModal: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  guardianEmail: PropTypes.string.isRequired,
  requiresGuardianConsent: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  studentBirthday: PropTypes.string.isRequired,
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
  setUserName
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeblioSignUpForm);
