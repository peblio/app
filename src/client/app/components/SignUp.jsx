import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../action/user.jsx';
import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  signUpSuccessful(response) {
    this.props.closeSignUpModal();
  }

  submitSignUpUser(event,name,password) {
    axios.post('/users/signup', {
      name: name,
      password: password
    })
    .then((response)=> {
      this.signUpSuccessful(response);
    })
    .catch(function(error) { // eslint-disable-line
      console.log("Sign up failed");
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        Sign up here
        <form onSubmit={(event)=> {this.submitSignUpUser(event, this.props.loginName, this.props.loginPassword)}}>
          <label> name:
            <input type="text" value={this.props.loginName} onChange={this.props.updateUserName}/>
          </label>
          <label> password:
            <input type="text" value={this.props.loginPassword} onChange={this.props.updateUserPassword}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }

}

export default SignUp;
