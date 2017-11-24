import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import * as userActions from '../action/user.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  loginSuccessful(response) {
    this.props.setUserName(response.data.user.name);
    this.props.closeLoginModal();
  }

  submitLoginUser(event, name, password) {
    axios.post('/api/login', {
      name: name,
      password: password
    })
      .then((response) => {
        this.loginSuccessful(response);
      })
      .catch(function(error) { // eslint-disable-line
        console.log("Login Failed");
      });
    event.preventDefault();
  }
  render() {
    return (
      <div>
        Log In
        <form onSubmit={(event) => {this.submitLoginUser(event,this.props.loginName, this.props.loginPassword)}}>
          <label> name:
            <input type="text" value={this.props.loginName} onChange={this.props.updateUserName}/>
          </label>
          <label> password:
            <input type="text" value={this.props.loginPassword} onChange={this.props.updateUserPassword}/>
          </label>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }

}

export default Login;
