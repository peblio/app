import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  navigationContent: [],
};
const navigation = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_NAV_CONTENT:
      return Object.assign({}, state, {
        navigationContent: action.navContent
      });
    default:
      return state;
  }
};
export default navigation;
