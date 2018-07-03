import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

require('./confirmUser.scss');

class ConfirmUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showReset: true,
      notice: ''
    };
    this.confirmSuccess = this.confirmSuccess.bind(this);
    this.confirmFailed = this.confirmFailed.bind(this);
    this.confirmToken = this.confirmToken.bind(this);
    this.submitConfirmUser = this.submitConfirmUser.bind(this);
    this.resendConfirmUser = this.resendConfirmUser.bind(this);
  }

  componentDidMount() {
    this.submitConfirmUser(this.confirmToken());
  }

  confirmSuccess(msg) {
    this.setState({
      showReset: false,
      notice: msg
    });
  }

  confirmFailed(msg) {
    this.setState({
      showReset: true,
      notice: msg
    });
  }

  confirmToken() {
    const location = this.props.location.pathname;
    const tokenID = location.match(/\/confirmation\/([\w-].*)/);
    return tokenID ? tokenID[1] : null;
  }

  submitConfirmUser(token) {
    axios.post('/users/confirmation', {
      token
    })
    .then((res) => {
      this.confirmSuccess(res.data.msg);
    })
    .catch((err) => {
      this.confirmFailed(err.response.data.msg);
    });
  }

  resendConfirmUser(event, email) {
    axios.post('/users/resendconfirmation', {
      email
    })
    .then((res) => {
      this.confirmSuccess(res.data.msg);
    })
    .catch((err) => {
      this.confirmFailed(err.response.data.msg);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="confirm-modal__content">
        <p className="confirm-modal__notice">
          {this.state.notice}
        </p>
        {
          this.state.showReset &&
          <form onSubmit={(event) => { this.resendConfirmUser(event, this.email.value); }}>
            <div className="confirm-modal__div">
              <label htmlFor="confirm-modal-email" className="confirm-modal__label">
                <input
                  id="confirm-modal-email"
                  className="confirm-modal__input"
                  placeholder="email"
                  type="text"
                  ref={(email) => { this.email = email; }}
                />
              </label>
            </div>
            <button className="confirm-modal__button" type="submit" value="Submit" >
            Resend Token
            </button>
          </form>
        }


      </div>
    );
  }

}

ConfirmUser.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired
};

export default ConfirmUser;
