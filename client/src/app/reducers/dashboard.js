import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  dashboardView: 'documents',
  trashPages: []
};
const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_DASHBOARD_VIEW:
      return Object.assign({}, state, {
        dashboardView: action.viewName
      });

    case ActionTypes.SET_TRASH_PAGES:
      return Object.assign({}, state, {
        trashPages: action.data.data
      });

    default:
      return state;
  }
};
export default dashboard;
