import axios from 'axios';
import React, { PropTypes } from 'react';

class SignUp extends React.Component {
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
        <form onSubmit={(event) => { this.submitSignUpUser(event, this.props.loginName, this.props.loginPassword); }}>
          <label htmlFor="signupModal-name"> name:
            <input id="signupModal-name" type="text" value={this.props.loginName} onChange={this.props.updateUserName} />
          </label>
          <label htmlFor="signupModal-password"> password:
            <input id="signupModal-password" type="password" value={this.props.loginPassword} onChange={this.props.updateUserPassword} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

SignUp.propTypes = {
  closeSignUpModal: PropTypes.func.isRequired,
  loginName: PropTypes.string.isRequired,
  loginPassword: PropTypes.string.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateUserPassword: PropTypes.func.isRequired
};

export default SignUp;
