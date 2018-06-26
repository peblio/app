import React from 'react';
import axios from 'axios';

require('./passwordForgot.scss');

class PasswordForgot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      notice: ''
    };
    this.emailResponse = this.emailResponse.bind(this);
  }

  emailResponse(msg) {
    this.setState({
      showNotice: true,
      notice: msg
    });
  }

  submitForgotPassword(event, email) {
    axios.post('/users/forgot', {
      email
    })
      .then((response) => {
        this.emailResponse(response.data.msg);
      })
      .catch((error) => {
        this.emailResponse(error.response.data.msg);
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
