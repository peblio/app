import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Login extends React.Component {
  componentWillUnmount() {
    this.props.authLoadedPage();
  }

  loginSuccessful(response) {
    this.props.setUserName(response.data.user.name);
    this.props.closeLoginModal();
  }

  submitLoginUser(event, name, password) {
    axios.post('/users/login', {
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
      <div className="login-modal__content">
        <h5 className="login-modal__title">Log In</h5>
        <form onSubmit={(event) => { this.submitLoginUser(event, this.userName.value, this.userPassword.value); }}>
          <div className="login-modal__div">
            <label htmlFor="login-modal-name" className="login-modal__label"> Name
              <input
                id="login-modal-name"
                className="login-modal__input"
                type="text"
                ref={(userName) => { this.userName = userName; }}
              />
            </label>
          </div>
          <div className="login-modal__div">
            <label htmlFor="login-modal-password" className="login-modal__label"> Password
              <input
                id="login-modal-password"
                className="login-modal__input"
                type="password"
                ref={(userPassword) => { this.userPassword = userPassword; }}
              />
            </label>
          </div>

          <input className="login-modal__button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

Login.propTypes = {
  authLoadedPage: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired
};

export default Login;
