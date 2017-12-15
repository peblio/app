import axios from 'axios';
import * as ActionTypes from '../constants.jsx';

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

export function signUserUp(name, password) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SIGN_USER_UP
    });
  };
}
