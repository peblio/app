import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../../../../utils/axios';
import { saveLog } from '../../../../utils/log';
import { closeSignUpModal } from '../../../../action/mainToolbar.js';
import GoogleLoginButton from '../../Shared/GoogleLoginButton/GoogleLoginButton.jsx';

require('./signup.scss');

class PeblioSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: ''
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
      notice: msg
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

  submitSignUpUser = (event) => {
    const loginData = {
      mail: this.userMail ? this.userMail.value : this.props.guardianEmail,
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
      <div>
        <h2 className="signup-modal__subtitle">
          Almost signed up!
        </h2>
        <GoogleLoginButton
          onLoginSuccess={this.googleLoginSuccessful}
          onLoginFailure={this.signUpFailed}
          userType={this.props.userType}
          requiresGuardianConsent={this.props.requiresGuardianConsent}
          guardianEmail={this.props.guardianEmail}
          name={this.props.name}
        />
        <div className="signup-modal__or-container">
          <hr className="signup-modal__or-line" />
          <p className="signup-modal__or">
            or
          </p>
          <hr className="signup-modal__or-line" />
        </div>
        <div>
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
              className="signup-modal__peblio-button"
              data-test="signup-modal__button-submit"
              onClick={this.submitSignUpUser}
              value="Submit"
            >
                  Sign in with Peblio
            </button>
          </div>
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

PeblioSignUpForm.propTypes = {
  closeSignUpModal: PropTypes.func.isRequired,
  guardianEmail: PropTypes.string,
  requiresGuardianConsent: PropTypes.bool,
  userType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  studentBirthday: PropTypes.string
};

PeblioSignUpForm.defaultProps = {
  studentBirthday: null,
  requiresGuardianConsent: null,
  guardianEmail: null
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
  closeSignUpModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeblioSignUpForm);
