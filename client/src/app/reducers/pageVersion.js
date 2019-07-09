import * as ActionTypes from '../constants/reduxConstants.js';

export const initialState = {
  pageVersion: [],
  isOldVersionShowing: false,
  isPageVersionOpen: false,
  selectedPageVersion: ''
};

const pageVersion = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PAGE_VERSIONS:
      return Object.assign({}, state, {
        pageVersion: [...action.data.data]
      });

    case ActionTypes.SHOW_OLD_PAGE_VERSION:
      return Object.assign({}, state, {
        isOldVersionShowing: true,
        selectedPageVersion: action.id
      });

    case ActionTypes.HIDE_OLD_PAGE_VERSION:
      return Object.assign({}, state, {
        isOldVersionShowing: false,
        selectedPageVersion: ''
      });

    case ActionTypes.SHOW_PAGE_VERSION:
      return Object.assign({}, state, {
        isPageVersionOpen: true
      });

    case ActionTypes.HIDE_PAGE_VERSION:
      return Object.assign({}, state, {
        isPageVersionOpen: false
      });

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};
export default pageVersion;
