import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  pageVersion: []
};

const pageVersion = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PAGE_VERSIONS:
      return Object.assign({}, state, {
        pageVersion: [...action.data.data]
      });

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};
export default pageVersion;
