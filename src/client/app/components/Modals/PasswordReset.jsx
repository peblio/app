import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class PasswordReset extends React.Component {

  constructor(props) {
    super(props);
    this.resetToken = this.resetToken.bind(this);
  }
  sentEmail(response) {
    console.log('email sent');
  }

  resetToken() {
    const location = this.props.location.pathname;
    const resetToken = location.match(/\/reset\/([\w-].*)/);
    return resetToken ? resetToken[1] : null;
  }

  submitResetPassword(event, password, token) {
    axios.post('/users/reset', {
      password,
      token
    })
      .then((response) => {
        this.sentEmail(response);
      })
      .catch(function(error) { // eslint-disable-line
        console.log('Login Failed');
        console.log(error);
      });
    event.preventDefault();
  }
  render() {
    return (
      <div className="reset-modal__content">
        <h5 className="reset-modal__title">Reset Password</h5>
        <form
          onSubmit={(event) => {
            this.submitResetPassword(event, this.password.value, this.resetToken());
          }}
        >
          <div className="reset-modal__div">
            <label htmlFor="reset-modal-email" className="reset-modal__label"> New Password
              <input
                id="reset-modal-password"
                className="reset-modal__input"
                type="text"
                ref={(password) => { this.password = password; }}
              />
            </label>
          </div>
          <input className="reset-modal__button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

PasswordReset.propTypes = {
  closeLoginModal: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired
};

export default PasswordReset;
