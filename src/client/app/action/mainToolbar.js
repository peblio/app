import * as ActionTypes from '../constants/reduxConstants.js';

export function toggleFileDropdown() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_FILE_DROPDOWN
    });
  };
}

export function toggleAccountDropdown() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_ACCOUNT_DROPDOWN
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

export function viewShareModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_SHARE_MODAL
    });
  };
}

export function closeShareModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_SHARE_MODAL
    });
  };
}

export function viewExamplesModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_EXAMPLES_MODAL
    });
  };
}

export function closeExamplesModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_EXAMPLES_MODAL
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

export function viewForgotModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_FORGOT_MODAL
    });
  };
}

export function closeForgotModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_FORGOT_MODAL
    });
  };
}

export function viewResetModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_RESET_MODAL
    });
  };
}

export function closeResetModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_RESET_MODAL
    });
  };
}

export function viewConfirmUserModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_CONFIRM_USER_MODAL
    });
  };
}

export function closeConfirmUserModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_CONFIRM_USER_MODAL
    });
  };
}
