import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import axios from '../../../utils/axios';

import './googleLoginButton.scss';

class GoogleLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.gapi.load('auth2', () => {
      this.auth2 = window.gapi.auth2.init({ client_id: process.env.GOOGLE_CLIENT_ID });
    });
  }

  handleClick() {
    this.auth2.signIn()
      .then((googleUser) => {
        const idToken = googleUser.getAuthResponse().id_token;
        return axios.post('/users/login/google', { userType: this.props.userType, google_id_token: idToken });
      })
      .then(this.props.onLoginSuccess)
      .catch(this.props.onLoginFailure);
  }

  render() {
    return (
      <button className="google-login-button" onClick={this.handleClick}>
        <Helmet>
          <script src="https://apis.google.com/js/platform.js" async defer></script>
        </Helmet>
      </button>
    );
  }
}

GoogleLoginButton.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginFailure: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired
};

export default GoogleLoginButton;
