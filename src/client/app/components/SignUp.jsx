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
      <div className="signup-modal__content">
        <h5 className="signup-modal__title">Sign Up</h5>
        <form onSubmit={(event) => { this.submitSignUpUser(event, this.userName.value, this.userPassword.value); }}>
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
                ref={(userPassword) => { this.userPassword = userPassword; }}
                type="password"
              />
            </label>
          </div>
          <input
            className="signup-modal__button"
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
