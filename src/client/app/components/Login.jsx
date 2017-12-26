import React, { PropTypes } from 'react';
import axios from 'axios';

class Login extends React.Component {
  componentWillUnmount() {
    this.props.authPage();
  }

  loginSuccessful(response) {
    this.props.setUserName(response.data.user.name);
    this.props.closeLoginModal();
  }

  submitLoginUser(event, name, password) {
    axios.post('/api/login', {
      name,
      password
    })
      .then((response) => {
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
        <form onSubmit={(event) => { this.submitLoginUser(event, this.userName.value, this.userPassword.value); }}>
          <div className="loginModal_div">
            <label htmlFor="loginModal-name" className="loginModal_label"> Name
              <input id="loginModal-name" className="loginModal_input" type="text" ref={(userName) => { this.userName = userName; }} />
            </label>
          </div>
          <div className="loginModal_div">
            <label htmlFor="loginModal-password" className="loginModal_label"> Password
              <input
                id="loginModal-password" className="loginModal_input" type="password" ref={(userPassword) => { this.userPassword = userPassword; }}
              />
            </label>
          </div>

          <input className="loginModal_button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

Login.propTypes = {
  authPage: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired
};

export default Login;
