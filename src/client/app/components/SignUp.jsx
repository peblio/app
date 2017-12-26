import axios from 'axios';
import React, { PropTypes } from 'react';

class SignUp extends React.Component {
  componentWillUnmount() {
    this.props.authPage();
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
      <div>
        Sign up here
        <form onSubmit={(event) => { this.submitSignUpUser(event, this.userName.value, this.userPassword.value); }}>
          <label htmlFor="signupModal-name"> name:
            <input id="signupModal-name" type="text" ref={(userName) => { this.userName = userName; }} />
          </label>
          <label htmlFor="signupModal-password"> password:
            <input id="signupModal-password" type="password" ref={(userPassword) => { this.userPassword = userPassword; }} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

SignUp.propTypes = {
  authPage: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired
};

export default SignUp;
