import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import axios from '../../../../utils/axios';
import './googleLoginButton.scss';
import { saveErrorLogWithoutUser } from '../../../../utils/log';

class GoogleLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount() {
    window.gapi.load('auth2', () => {
      this.auth2 = window.gapi.auth2.init({ client_id: process.env.GOOGLE_CLIENT_ID, scope: 'openid email' });
    });
  }

  onGoogleApiInitSuccess = () => {

  }

  handleClick() {
    if (this.auth2) {
      this.auth2.signIn()
        .then((googleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;
          if (idToken) {
            return axios.post('/auth/login/google', {
              google_id_token: idToken,
            });
          }
          throw new Error('No Id Token');
        })
        .then(this.props.onLoginSuccess)
        .catch((err) => {
          saveErrorLogWithoutUser('User Login via Google Failed', err.stack, '/auth/login/google');
          if(err.response.status == 404){
            this.props.onLoginFailure('Please Sign Up with Google first.');
          } else {
            this.props.onLoginFailure('Google Login error. Please try again after sometime.');
          }
        });
    } else {
      this.props.onLoginFailure('Google Login error. Please try again after sometime.');
    }
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
  onLoginFailure: PropTypes.func.isRequired
};

export default GoogleLoginButton;
