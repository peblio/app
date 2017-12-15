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
      .then((response)=> {
        this.loginSuccessful(response);
      })
      .catch(function(error) { // eslint-disable-line
        console.log("Login Failed");
      });
    event.preventDefault();
  }
  render() {
    return (
      <div className="loginModal_content">
        <h5 className="loginModal_title">Log In</h5>
        <form onSubmit={(event)=> {this.submitLoginUser(event,this.props.loginName, this.props.loginPassword)}}>
        <div className="loginModal_div">
          <label  className="loginModal_label"> Name
            <input className="loginModal_input" type="text" value={this.props.loginName} onChange={this.props.updateUserName}/>
          </label>
        </div>
        <div className="loginModal_div">
          <label  className="loginModal_label"> Password
            <input className="loginModal_input" type="text" value={this.props.loginPassword} onChange={this.props.updateUserPassword}/>
          </label>
        </div>

          <input className="loginModal_button" type='submit' value='Submit'/>
        </form>
      </div>
    );
  }

}

export default Login;
