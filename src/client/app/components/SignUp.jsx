import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

class SignUp extends React.Component {
  componentWillUnmount() {
    this.props.authLoadedPage();
  }

  signUpSuccessful(response) {
    this.props.closeSignUpModal();
  }

  submitSignUpUser(event, name, password) {
    axios.post('/users/signup', {
      name,
      password
    })
    .then((response) => {
      this.signUpSuccessful(response);
    })
    .catch(function(error) { // eslint-disable-line
      console.log('Sign up failed');
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="signupModal__content">
        <h5 className="signupModal__title">Sign Up</h5>
        <form onSubmit={(event) => { this.submitSignUpUser(event, this.userName.value, this.userPassword.value); }}>
          <div className="signupModal__div">
            <label
              className="signupModal__label"
              htmlFor="signupModal-name"
            >
              Name
              <input
                className="signupModal__input"
                id="signupModal-name"
                ref={(userName) => { this.userName = userName; }}
                type="text"
              />
            </label>
          </div>
          <div className="signupModal__div">
            <label
              className="signupModal__label"
              htmlFor="signupModal-password"
            >
              Password
              <input
                className="signupModal__input"
                id="signupModal-password"
                ref={(userPassword) => { this.userPassword = userPassword; }}
                type="password"
              />
            </label>
          </div>
          <input
            className="signupModal__button"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }

}

SignUp.propTypes = {
  authLoadedPage: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired
};

export default SignUp;
