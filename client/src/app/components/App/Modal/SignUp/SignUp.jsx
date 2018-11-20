import React from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../utils/axios';
import GoogleLoginButton from '../../Shared/GoogleLoginButton/GoogleLoginButton.jsx';

require('./signup.scss');

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotice: false,
      notice: '',
      isUserTypeSelected: false,
      guardianEmail: null,
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
  }

  submitSignUpUser = (event, mail, name, userType, password, requiresGuardianConsent, guardianEmail) => {
    if (this.passwordMatch(this.password.value, this.passwordConfirm.value)) {
      axios.post('/users/signup', {
        mail,
        name,
        userType,
        password,
        requiresGuardianConsent,
        guardianEmail
      })
        .then(res => this.signUpSuccessful(res.data.msg))
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

                  {this.props.userType === 'student' && (
                    <div>
                      <ul className="signup-modal__list">
                        <li className="signup-modal__listitem">
                          <label
                            className="signup-modal__label"
                            htmlFor="above13"
                          >
                            <input
                              required
                              type="radio"
                              className="signup-modal__checkbox"
                              name="studentAge"
                              value="above13"
                              onClick={(e) => {
                                if (e.target.checked) {
                                  this.props.setGuardianConsent(false);
                                }
                              }}
                            />
                            {'I\'m over 13'}
                          </label>
                        </li>
                        <li className="signup-modal__listitem">
                          <label
                            className="signup-modal__label"
                            htmlFor="above13"
                          >
                            <input
                              type="radio"
                              className="signup-modal__checkbox"
                              name="studentAge"
                              value="above13"
                              onClick={(e) => {
                                if (e.target.checked) {
                                  this.props.setGuardianConsent(true);
                                }
                              }}
                            />
                            {'I\'m under 13'}
                          </label>
                        </li>
                      </ul>
                      {this.props.requiresGuardianConsent && (
                        <div className="signup-modal__div">
                          {/* eslint-disable */}
                      <p className="signup__notice">
                        {'Enter your parent\'s or guardian\'s email address and we will send them an email to confirm this account'}
                      </p>
                      {/* eslint-enable */}
                          <input
                            required
                            className="signup-modal__input"
                            id="signup-modal-guardian-mail"
                            placeholder="Parent/Guardian email"
                            ref={(guardianEmail) => { this.guardianEmail = guardianEmail; }}
                            type="email"
                            onChange={(e) => {
                              this.setState({
                                guardianEmail: e.target.value
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>

                  )}
                  <input
                    required
                    type="checkbox"
                    className="signup-modal__checkbox"
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
                  const userMail = (this.userMail) ? this.userMail.value : this.state.guardianEmail;
                  this.submitSignUpUser(
                    event,
                    userMail,
                    this.userName.value,
                    this.props.userType,
                    this.password.value,
                    this.props.requiresGuardianConsent,
                    this.state.guardianEmail
                  );
                }}
              >
                <div>
                  <GoogleLoginButton
                    onLoginSuccess={this.googleLoginSuccessful}
                    onLoginFailure={this.signUpFailed}
                    userType={this.props.userType}
                    requiresGuardianConsent={this.props.requiresGuardianConsent}
                    guardianEmail={this.state.guardianEmail}
                  />
                  <p className="signup-modal__text-secondary">or</p>
                  {this.state.guardianEmail === null && (
                    <div className="signup-modal__div">
                      <input
                        required
                        className="signup-modal__input"
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
                      id="signup-modal-password"
                      placeholder="password"
                      ref={(password) => { this.password = password; }}
                      type="password"
                    />
                    <input
                      required
                      id="signup-modal-confirm"
                      className="signup-modal__input"
                      placeholder="retype password"
                      type="password"
                      ref={(passwordConfirm) => { this.passwordConfirm = passwordConfirm; }}
                    />
                  </div>
                  <div className="signup-modal__buttonholder">
                    <button
                      className="signup-modal__button"
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
  requiresGuardianConsent: PropTypes.bool.isRequired,
  setGuardianConsent: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired
};

export default SignUp;
