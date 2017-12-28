import * as ActionTypes from '../constants.jsx';

const initialState = {
  isFileDropdownOpen: false,
  isPagesModalOpen: false,
  isLoginModalOpen: false,
  isSignUpModalOpen: false
};

const mainToolbar = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.TOGGLE_FILE_DROPDOWN:
      return Object.assign({}, state, {
        isFileDropdownOpen: !state.isFileDropdownOpen
      });

    case ActionTypes.VIEW_PAGES_MODAL:
      return Object.assign({}, state, {
        isPagesModalOpen: true
      });

    case ActionTypes.CLOSE_PAGES_MODAL:
      return Object.assign({}, state, {
        isPagesModalOpen: false
      });

    case ActionTypes.VIEW_LOGIN_MODAL:
      return Object.assign({}, state, {
        isLoginModalOpen: true
      });

    case ActionTypes.CLOSE_LOGIN_MODAL:
      return Object.assign({}, state, {
        isLoginModalOpen: false
      });

    case ActionTypes.VIEW_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        isSignUpModalOpen: true
      });

    case ActionTypes.CLOSE_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        isSignUpModalOpen: false
      });

    default:
      return state;
  }
};

export default mainToolbar;
