import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  loginSuccessful(response) {
    this.props.setUserName(response.data.user.name);
    this.props.closeLoginModal();
  }

  submitLoginUser(event, name, password) {
    console.log(name, password);
    axios.post('/api/login', {
      name,
      password
    })
      .then((response) => {
        console.log(response);
        this.loginSuccessful(response);
      })
      .catch(function(error) { // eslint-disable-line
        console.log('Login Failed');
      });
    event.preventDefault();
  }
  render() {
    return (
      <div className="loginModal_content">
        <h5 className="loginModal_title">Log In</h5>
        <form onSubmit={(event) => { this.submitLoginUser(event, this.props.loginName, this.props.loginPassword); }}>
          <div className="loginModal_div">
            <label htmlFor="loginModal-name" className="loginModal_label"> Name
              <input id="loginModal-name" className="loginModal_input" type="text" value={this.props.loginName} onChange={this.props.updateUserName} />
            </label>
          </div>
          <div className="loginModal_div">
            <label htmlFor="loginModal-password" className="loginModal_label"> Password
              <input id="loginModal-password" className="loginModal_input" type="text" value={this.props.loginPassword} onChange={this.props.updateUserPassword} />
            </label>
          </div>

          <input className="loginModal_button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default Login;
