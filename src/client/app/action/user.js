import * as ActionTypes from '../constants/reduxConstants.js';

export function updateUserBlurb(event) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_USER_BLURB,
      event
    });
  };
}

export function updateUserName(event) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_USER_NAME,
      event
    });
  };
}

export function updateUserPassword(event) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_USER_PASSWORD,
      event
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
