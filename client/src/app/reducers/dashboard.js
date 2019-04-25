import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  dashboardView: 0
};
const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_DASHBOARD_VIEW:
      return Object.assign({}, state, {
        dashboardView: action.viewNo
      });

    default:
      return state;
  }
};
export default dashboard;
