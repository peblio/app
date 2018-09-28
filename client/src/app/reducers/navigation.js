import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  navigationContent: [],
  isNavigationOpen: true,
  yNavigation: 0
};
const navigation = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_NAVIGATION_CONTENT:
      return Object.assign({}, state, {
        navigationContent: action.navContent
      });
    case ActionTypes.OPEN_NAVIGATION:
      return Object.assign({}, state, {
        isNavigationOpen: true
      });
    case ActionTypes.CLOSE_NAVIGATION:
      return Object.assign({}, state, {
        isNavigationOpen: false
      });
    case ActionTypes.SET_Y_NAVIGATION:
      return Object.assign({}, state, {
        yNavigation: action.value
      });

    default:
      return state;
  }
};
export default navigation;
