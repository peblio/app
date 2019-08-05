import * as ActionTypes from '../constants/reduxConstants.js';
import history from '../utils/history';
import axios from '../utils/axios';
import { saveLog } from '../utils/log';

export function fetchUserProfile(userName) {
  return dispatch => axios.get(`/users/${userName}/profile`)
    .then(({ data }) => dispatch({
      type: ActionTypes.SET_USER_PROFILE,
      data
    }))
    .catch((e) => {
      if (e.response.status === 404) {
        history.push('/404');
      }
    });
}


export function setUserBrowsingPebl() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_BROWSING_PEBL
    });
  };
}

export function setUserName(name) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_NAME,
      name
    });
  };
}

export function matchUserName(name, projectID) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.MATCH_USER_NAME,
      name,
      projectID
    });
  };
}

export function signUserUp(name, password) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SIGN_USER_UP
    });
  };
}

export function setEditAccess(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_EDIT_ACCESS,
      value
    });
  };
}

export function setUserType(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_TYPE,
      value
    });
  };
}

export function logoutUser(name) {
  return dispatch => axios.get('/logout')
    .then(() => {
      dispatch({
        type: ActionTypes.LOGOUT_USER,
      });
      const log = {
        message: 'User Logged Out',
        path: '/logout',
        action: 'LogoutUser',
        module: 'ui',
        level: 'INFO',
        user: name
      };
      saveLog(log);
    });
}

export function fetchCurrentUser() {
  return dispatch => axios.get('/current_user')
    .then(({ data }) => dispatch({
      type: ActionTypes.SET_USER,
      data
    }));
}

export function setGuardianConsent(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_GUARDIAN_CONSENT,
      value
    });
  };
}

export function setGuardianEmail(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_GUARDIAN_EMAIL,
      value
    });
  };
}

export function setStudentBirthday(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_STUDENT_BIRTHDAY,
      value
    });
  };
}

export function setUserBlurb(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_BLURB,
      value
    });
  };
}

export function clearSignupSelectedValues() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLEAR_SIGNUP_VALUES
    });
  };
}


export function updateProfileBlurb(value) {
  return dispatch => axios.put('/current_user/profile', {
    blurb: value
  }).then(() => dispatch({
    type: ActionTypes.SET_USER_BLURB,
    value
  }));
}

export function updateUserProfileImage(value) {
  return dispatch => axios.put('/current_user/profile', {
    image: value,
  }).then(() => dispatch({
    type: ActionTypes.SET_USER_IMAGE,
    value
  }));
}

export function setNextScreen(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_NEXT_SCREEN,
      value
    });
  };
}
