import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import axios from '../../../../utils/axios';
import './googleLoginButton.scss';
import { saveLog } from '../../../../utils/log';
import { saveErrorLogWithoutUser } from '../../../../utils/log';

class GoogleSignupButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if( window.gapi.auth2 !=  null){
      this.auth2 = window.gapi.auth2.getAuthInstance();
      return
    }
    window.gapi.load('auth2', () => {
      try{
        this.auth2 = window.gapi.auth2.init({ client_id: process.env.GOOGLE_CLIENT_ID });
      } catch(err) {
        console.log(err);
      }
    });
  }

  signIn = (response) => {
    const closeSignUpModal = this.props.closeSignUpModal;
    const setUserName = this.props.setUserName;
    const setUserType = this.props.setUserType;
    return axios.post('/auth/login/google', {
      google_id_token: response.data.google_id_token,
    })
      .then(() => {
        closeSignUpModal();
        setUserName(response.data.user.name);
        setUserType(response.data.user.type);
        const log = {
          message: 'User Logged In using Google',
          path: '/auth/login',
          action: 'LoginUserWithGoogle',
          module: 'ui',
          level: 'INFO',
          user: response.data.user.name
        };
        saveLog(log);
      });
  }

  handleClick = () => {
    if (this.auth2) {
      this.auth2.signIn()
        .then((googleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;
          if (idToken) {
            return axios.post('/auth/signin/google', {
              userType: this.props.userType,
              requiresGuardianConsent: this.props.requiresGuardianConsent,
              guardianEmail: this.props.guardianEmail,
              google_id_token: idToken,
              name: this.props.name
            }).catch((err) => {
              saveErrorLogWithoutUser(err.response.data.msg, err.stack, '/auth/signin/google');
              throw err;
            });
          }
          throw new Error('No Id Token');
        })
        .then(this.signIn)
        .catch((err) => {
          saveErrorLogWithoutUser('User Sign Up via Google Failed', err.stack, '/auth/signin/google');
          if(err.response && err.response.data && err.response.data.msg){
            this.props.onLoginFailure(`${err.response.data.msg}`);
          } else {
            this.props.onLoginFailure('Google Sign up error. Please try again after sometime.');
          }
        });
    } else {
      this.props.onLoginFailure('Google Sign up error. Please try again after sometime.');
    }
  }

  render() {
    return (
      <button className="google-signup-button" onClick={this.handleClick}>
        <Helmet>
          <script src="https://apis.google.com/js/platform.js" async defer></script>
        </Helmet>
      </button>
    );
  }
}

GoogleSignupButton.propTypes = {
  guardianEmail: PropTypes.string,
  onLoginFailure: PropTypes.func.isRequired,
  requiresGuardianConsent: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
  closeSignUpModal: PropTypes.func.isRequired,
};

GoogleSignupButton.defaultProps = {
  guardianEmail: null
};

export default GoogleSignupButton;
