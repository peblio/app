import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class PasswordForgot extends React.Component {

  sentEmail(response) {
    console.log('email sent');
  }

  submitForgotPassword(event, email) {
    axios.post('/users/forgot', {
      email
    })
      .then((response) => {
        this.sentEmail(response);
      })
      .catch(function(error) { // eslint-disable-line
        console.log('Login Failed');
      });
    event.preventDefault();
  }
  render() {
    return (
      <div className="forgot-modal__content">
        <h5 className="forgot-modal__title">Reset Password</h5>
        <form onSubmit={(event) => { this.submitForgotPassword(event, this.email.value); }}>
          <div className="forgot-modal__div">
            <label htmlFor="forgot-modal-email" className="forgot-modal__label"> Email
              <input
                id="forgot-modal-email"
                className="forgot-modal__input"
                type="text"
                ref={(email) => { this.email = email; }}
              />
            </label>
          </div>
          <input className="forgot-modal__button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

PasswordForgot.propTypes = {
  closeLoginModal: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired
};

export default PasswordForgot;
