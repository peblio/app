import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StudentBirthDateDetails from './StudentDetails/StudentBirthDateDetails.jsx';
import axios from '../../../../utils/axios';
import { saveLog } from '../../../../utils/log';
import { closeSignUpModal } from '../../../../action/mainToolbar.js';
import { setUserName,
  setUserType,
  setGuardianConsent } from '../../../../action/user.js';
import GoogleLoginButton from '../../Shared/GoogleLoginButton/GoogleLoginButton.jsx';

require('./signup.scss');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: '',
      isUserTypeSelected: false,
      isFormVisible: true
    };
  }

  componentWillUnmount() {
    this.props.authLoadedPage();
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
    if (this.props.userType === 'student') {
      return (
        <div className="signup-modal__content">
          <StudentBirthDateDetails
            setGuardianConsent={this.props.setGuardianConsent}
            requiresGuardianConsent={this.props.requiresGuardianConsent}
            guardianEmail={this.props.guardianEmail}
          />
        </div>
      );
    }
    return (
      <div className="signup-modal__content">
        {this.state.isFormVisible && (
          <div>
            <h1 className="signup-modal__title">Sign Up</h1>
            {
              this.state.isUserTypeSelected || (
                <form
                  onSubmit={(event) => {
                    this.userTypeSelected();
                    event.preventDefault();
                  }}
                >
                  <div className="signup-modal__radio-holder">
                    <h2 className="signup-modal__subtitle"> I am signing up as a...</h2>
                    <ul className="signup-modal__list">
                      <li className="signup-modal__listitem">
                        <label
                          className="signup-modal__label"
                          htmlFor="student"
                        >
                          <input
                            required
                            type="radio"
                            className="signup-modal__radio"
                            data-test="signup-modal__radio-student"
                            name="type"
                            value="student"
                            id="student"
                            onChange={(e) => {
                              this.props.setUserType(e.target.value);
                            }}
                          />
                  Student
                        </label>
                      </li>

                      <li className="signup-modal__listitem">
                        <label
                          className="signup-modal__label"
                          htmlFor="teacher"
                        >
                          <input
                            type="radio"
                            className="signup-modal__radio"
                            data-test="signup-modal__radio-teacher"
                            name="type"
                            value="teacher"
                            onChange={(e) => {
                              this.props.setUserType(e.target.value);
                            }}
                          />
                  Teacher
                        </label>
                      </li>

                      <li className="signup-modal__listitem">
                        <label
                          className="signup-modal__label"
                          htmlFor="other"
                        >
                          <input
                            type="radio"
                            className="signup-modal__radio"
                            name="type"
                            value="other"
                            onChange={(e) => {
                              this.props.setUserType(e.target.value);
                            }}
                          />
                  Other
                        </label>
                      </li>
                    </ul>
                  </div>


                  <input
                    required
                    type="checkbox"
                    className="signup-modal__checkbox"
                    data-test="signup-modal__checkbox"
                    name="checkbox"
                    value="check"
                    id="agree"
                  />
                  <label
                    className="signup-modal__terms-label"
                    htmlFor="agree"
                  >
                    {' '}
                I have read and agree to the
                    {' '}
                    <a
                      href="https://www.peblio.co/terms-of-use"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="signup-modal__link"
                    >
                  Terms of Use
                    </a>
                    {' '}
                and
                    {' '}
                    <a
                      href="https://www.peblio.co/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="signup-modal__link"
                    >
                Privacy Policy
                    </a>
                  </label>
                  <div className="signup-modal__buttonholder">
                    <button
                      className="signup-modal__button"
                      data-test="signup-modal__button-next"
                      type="submit"
                      value="Submit"
                    >
                Next
                    </button>
                  </div>
                </form>
              )}
            {this.state.isUserTypeSelected && (
              <form
                onSubmit={(event) => {
                  const userMail = (this.userMail) ? this.userMail.value : this.props.guardianEmail;
                  this.submitSignUpUser(
                    event,
                    userMail,
                    this.userName.value,
                    this.props.userType,
                    this.password.value,
                    this.props.requiresGuardianConsent,
                    this.props.guardianEmail,
                    this.props.studentBirthday
                  );
                }}
              >
                <div>
                  <GoogleLoginButton
                    onLoginSuccess={this.googleLoginSuccessful}
                    onLoginFailure={this.signUpFailed}
                    userType={this.props.userType}
                    requiresGuardianConsent={this.props.requiresGuardianConsent}
                    guardianEmail={this.props.guardianEmail}
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
                      data-test="signup-modal__input-name"
                      id="signup-modal-name"
                      placeholder="username"
                      ref={(userName) => { this.userName = userName; }}
                      type="text"
                    />
                  </div>
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
                      type="submit"
                      value="Submit"
                    >
                  Submit
                    </button>
                  </div>
                </div>
              </form>
            )}
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

SignUp.propTypes = {
  authLoadedPage: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  guardianEmail: PropTypes.string.isRequired,
  requiresGuardianConsent: PropTypes.bool.isRequired,
  setGuardianConsent: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
