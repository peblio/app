import * as ActionTypes from '../constants.jsx';

const initialState = {
  isAccountDropdownOpen: false,
  isExamplesModalOpen: false,
  isFileDropdownOpen: false,
  isPagesModalOpen: false,
  isShareModalOpen: false,
  isLoginModalOpen: false,
  isForgotModalOpen: false,
  isResetModalOpen: false,
  isSignUpModalOpen: false
};

const mainToolbar = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.TOGGLE_FILE_DROPDOWN:
      return Object.assign({}, state, {
        isFileDropdownOpen: !state.isFileDropdownOpen
      });

    case ActionTypes.TOGGLE_ACCOUNT_DROPDOWN:
      return Object.assign({}, state, {
        isAccountDropdownOpen: !state.isAccountDropdownOpen
      });

    case ActionTypes.VIEW_EXAMPLES_MODAL:
      return Object.assign({}, state, {
        isExamplesModalOpen: true
      });

    case ActionTypes.CLOSE_EXAMPLES_MODAL:
      return Object.assign({}, state, {
        isExamplesModalOpen: false
      });

    case ActionTypes.VIEW_PAGES_MODAL:
      return Object.assign({}, state, {
        isPagesModalOpen: true
      });

    case ActionTypes.CLOSE_PAGES_MODAL:
      return Object.assign({}, state, {
        isPagesModalOpen: false
      });

    case ActionTypes.VIEW_SHARE_MODAL:
      return Object.assign({}, state, {
        isShareModalOpen: true
      });

    case ActionTypes.CLOSE_SHARE_MODAL:
      return Object.assign({}, state, {
        isShareModalOpen: false
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

    case ActionTypes.VIEW_FORGOT_MODAL:
      return Object.assign({}, state, {
        isForgotModalOpen: true
      });

    case ActionTypes.CLOSE_FORGOT_MODAL:
      return Object.assign({}, state, {
        isForgotModalOpen: false
      });

    case ActionTypes.VIEW_RESET_MODAL:
      console.log('in here');
      return Object.assign({}, state, {
        isResetModalOpen: true
      });

    case ActionTypes.CLOSE_RESET_MODAL:
      return Object.assign({}, state, {
        isResetModalOpen: false
      });

    default:
      return state;
  }
};

export default mainToolbar;
