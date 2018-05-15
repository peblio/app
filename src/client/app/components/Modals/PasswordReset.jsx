import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class PasswordReset extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: ''
    };
    this.passwordMatch = this.passwordMatch.bind(this);
    this.passwordMatchFailed = this.passwordMatchFailed.bind(this);
    this.resetToken = this.resetToken.bind(this);
    this.resetFailed = this.resetFailed.bind(this);
    this.resetSuccess = this.resetSuccess.bind(this);
  }

  passwordMatch(a, b) {
    return (a === b);
  }

  passwordMatchFailed() {
    this.setState({
      showNotice: true,
      notice: 'Passwords did not match.'
    });
  }

  resetSuccess() {
    this.setState({
      showNotice: true,
      notice: 'Password successfully reset!'
    });
  }

  resetFailed() {
    this.setState({
      showNotice: true,
      notice: 'Password reset failed. Please try again'
    });
  }

  resetToken() {
    const location = this.props.location.pathname;
    const resetToken = location.match(/\/reset\/([\w-].*)/);
    return resetToken ? resetToken[1] : null;
  }

  submitResetPassword(event, password, token) {
    if (this.passwordMatch(this.password.value, this.passwordConfirm.value)) {
      axios.post('/users/reset', {
        password,
        token
      })
      .then((response) => {
        this.resetSuccess(response);
      })
      .catch((error) => { // eslint-disable-line
        this.resetFailed(error);
      });
    } else {
      this.passwordMatchFailed();
    }
    event.preventDefault();
  }
  render() {
    return (
      <div className="reset-modal__content">
        <h1 className="reset-modal__title">Reset Password</h1>
        <form
          onSubmit={(event) => {
            this.submitResetPassword(event, this.password.value, this.resetToken());
          }}
        >
          <div className="reset-modal__div">
            <label htmlFor="reset-modal-password" className="reset-modal__label"> New Password
              <input
                id="reset-modal-password"
                className="reset-modal__input"
                type="password"
                ref={(password) => { this.password = password; }}
              />
            </label>
            <label htmlFor="reset-modal-confirm" className="reset-modal__label"> Confirm Password
              <input
                id="reset-modal-confirm"
                className="reset-modal__input"
                type="password"
                ref={(passwordConfirm) => { this.passwordConfirm = passwordConfirm; }}
              />
            </label>
          </div>
          <button className="forgot-modal__button" type="submit" value="Submit" >
            Submit
          </button>
        </form>
        {this.state.showNotice &&
          <p className="forgot-modal__notice">
            {this.state.notice}
          </p>
        }
      </div>
    );
  }

}

PasswordReset.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired
};

export default PasswordReset;
