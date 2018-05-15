import React from 'react';
import axios from 'axios';

class PasswordForgot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: ''
    };
  }

  emailSuccess() {
    this.setState({
      showNotice: true,
      notice: 'Please check your email to reset your password.'
    });
  }

  emailFailed() {
    this.setState({
      showNotice: true,
      notice: 'Password reset failed.'
    });
  }

  submitForgotPassword(event, email) {
    axios.post('/users/forgot', {
      email
    })
      .then((response) => {
        this.emailSuccess(response);
      })
      .catch((error) => {
        this.emailFailed(error);
      });
    event.preventDefault();
  }
  render() {
    return (
      <div className="forgot-modal__content">
        <h1 className="forgot-modal__title">Reset Password</h1>
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

export default PasswordForgot;
