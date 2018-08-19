import React from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../utils/axios';
import GoogleLoginButton from '../../shared/GoogleLoginButton/GoogleLoginButton.jsx';

require('./signup.scss');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: '',
      isUserTypeSelected: false
    };
    this.userTypeSelected = this.userTypeSelected.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
    this.passwordMatchFailed = this.passwordMatchFailed.bind(this);
    this.signUpFailed = this.signUpFailed.bind(this);
    this.googleLoginSuccessful = this.googleLoginSuccessful.bind(this);
  }

  componentWillUnmount() {
    this.props.authLoadedPage();
  }

  passwordMatch(a, b) {
    return (a === b);
  }

  passwordMatchFailed() {
    this.setState({
      showNotice: true,
      notice: 'Passwords did not match.'
    });
  }

  userTypeSelected() {
    this.setState({
      isUserTypeSelected: true
    });
  }

  signUpFailed(error) {
    this.setState({
      showNotice: true,
      notice: error.response.data.msg
    });
  }

  signUpSuccessful(msg) {
    this.setState({
      showNotice: true,
      notice: msg
    });
  }

  googleLoginSuccessful(response) {
    this.props.setUserName(response.data.user.name);
    this.props.closeSignUpModal();
  }

  submitSignUpUser(event, mail, name, userType, password) {
    if (this.passwordMatch(this.password.value, this.passwordConfirm.value)) {
      axios.post('/users/signup', {
        mail,
        name,
        userType,
        password
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
        <h1 className="signup-modal__title">Sign Up</h1>
        <form
          onSubmit={(event) => {
            this.submitSignUpUser(
              event,
              this.userMail.value,
              this.userName.value,
              this.props.userType,
              this.password.value
            );
          }}
        >
          <div className="signup-modal__radio-holder">
            <h2 className="signup-modal__subtitle"> I am signing up as a...</h2>
            <ul className="signup-modal__list">
              <li className="signup-modal__listitem">
                <input
                  type="radio"
                  className="signup-modal__radio"
                  name="type"
                  value="student"
                  onChange={(e) => {
                    this.userTypeSelected();
                    this.props.setUserType(e.target.value);
                  }}
                />
                <label className="signup-modal__label" htmlFor="student">Student</label>
              </li>
              <li className="signup-modal__listitem">
                <input
                  type="radio"
                  className="signup-modal__radio"
                  name="type"
                  value="teacher"
                  onChange={(e) => {
                    this.userTypeSelected();
                    this.props.setUserType(e.target.value);
                  }}
                />
                <label className="signup-modal__label" htmlFor="teacher">Teacher</label>
              </li>
              <li className="signup-modal__listitem">
                <input
                  type="radio"
                  className="signup-modal__radio"
                  name="type"
                  value="other"
                  onChange={(e) => {
                    this.userTypeSelected();
                    this.props.setUserType(e.target.value);
                  }}
                />
                <label className="signup-modal__label" htmlFor="teacher">Other</label>
              </li>
            </ul>
          </div>

          {this.state.isUserTypeSelected && (
            <div>
              <GoogleLoginButton
                onLoginSuccess={this.googleLoginSuccessful}
                onLoginFailure={this.signUpFailed}
                userType={this.props.userType}
              />
              <p className="signup-modal__text-secondary">or</p>
              <div className="signup-modal__div">
                <input
                  className="signup-modal__input"
                  id="signup-modal-mail"
                  placeholder="email"
                  ref={(userMail) => { this.userMail = userMail; }}
                  type="text"
                />
              </div>
              <div className="signup-modal__div">
                <input
                  className="signup-modal__input"
                  id="signup-modal-name"
                  placeholder="username"
                  ref={(userName) => { this.userName = userName; }}
                  type="text"
                />
              </div>
              <div className="signup-modal__div">
                <input
                  className="signup-modal__input"
                  id="signup-modal-password"
                  placeholder="password"
                  ref={(password) => { this.password = password; }}
                  type="password"
                />
                <input
                  id="signup-modal-confirm"
                  className="signup-modal__input"
                  placeholder="retype password"
                  type="password"
                  ref={(passwordConfirm) => { this.passwordConfirm = passwordConfirm; }}
                />
              </div>
              <div className="signup-modal__buttonholder">
                <button className="signup-modal__button" type="submit" value="Submit">
              Submit
                </button>
              </div>
            </div>
          )}
        </form>


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
  setUserName: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired
};

export default SignUp;
