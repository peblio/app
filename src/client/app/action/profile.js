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
