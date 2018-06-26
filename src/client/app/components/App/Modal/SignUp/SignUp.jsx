import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

import GoogleLoginButton from '../../shared/GoogleLoginButton/GoogleLoginButton.jsx';

require('./signup.scss');

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: ''
    };
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

  submitSignUpUser(event, mail, name, password) {
    if (this.passwordMatch(this.password.value, this.passwordConfirm.value)) {
      axios.post('/users/signup', {
        mail,
        name,
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
            this.submitSignUpUser(event, this.userMail.value, this.userName.value, this.password.value);
          }}
        >
          <div className="signup-modal__div">
            <label
              className="signup-modal__label"
              htmlFor="signup-modal-mail"
            >
              Email
              <input
                className="signup-modal__input"
                id="signup-modal-mail"
                ref={(userMail) => { this.userMail = userMail; }}
                type="text"
              />
            </label>
          </div>
          <div className="signup-modal__div">
            <label
              className="signup-modal__label"
              htmlFor="signup-modal-name"
            >
              Name
              <input
                className="signup-modal__input"
                id="signup-modal-name"
                ref={(userName) => { this.userName = userName; }}
                type="text"
              />
            </label>
          </div>
          <div className="signup-modal__div">
            <label
              className="signup-modal__label"
              htmlFor="signup-modal-password"
            >
              Password
              <input
                className="signup-modal__input"
                id="signup-modal-password"
                ref={(password) => { this.password = password; }}
                type="password"
              />
            </label>
            <label htmlFor="reset-modal-confirm" className="reset-modal__label"> Confirm Password
              <input
                id="reset-modal-confirm"
                className="reset-modal__input"
                type="password"
                ref={(passwordConfirm) => { this.passwordConfirm = passwordConfirm; }}
              />
            </label>
          </div>
          <button className="forgot-modal__button" type="submit" value="Submit" >
            Submit
          </button>
        </form>


        <GoogleLoginButton
          onLoginSuccess={this.googleLoginSuccessful}
          onLoginFailure={this.signUpFailed}
        />

        {this.state.showNotice &&
          <p className="forgot-modal__notice">
            {this.state.notice}
          </p>
        }
      </div>
    );
  }

}

SignUp.propTypes = {
  authLoadedPage: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired
};

export default SignUp;
