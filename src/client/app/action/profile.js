import * as ActionTypes from '../constants/reduxConstants.js';

export function setIsOwner(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_IS_OWNER,
      value
    });
  };
}

export function setProfileName(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PROFILE_NAME,
      value
    });
  };
}

export function setProfileFolders(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PROFILE_FOLDERS,
      value
    });
  };
}

export function setProfilePebls(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PROFILE_PEBLS,
      value
    });
  };
}

export function setProfileImage(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PROFILE_IMAGE,
      value
    });
  };
}

export function setProfileDesc(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PROFILE_DESC,
      value
    });
  };
}
