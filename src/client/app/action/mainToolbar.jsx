import axios from 'axios';
import shortid from 'shortid';
import { convertToRaw } from 'draft-js';
import * as ActionTypes from '../constants.jsx';

export function toggleFileDropdown() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_FILE_DROPDOWN
    });
  };
}

export function viewPagesModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_PAGES_MODAL
    });
  };
}

export function closePagesModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_PAGES_MODAL
    });
  };
}

export function viewLoginModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_LOGIN_MODAL
    });
  };
}

export function closeLoginModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_LOGIN_MODAL
    });
  };
}

export function viewSignUpModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_SIGN_UP_MODAL
    });
  };
}

export function closeSignUpModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_SIGN_UP_MODAL
    });
  };
}
