import * as ActionTypes from '../constants/reduxConstants.js';

export function setDashboardView(viewName) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DASHBOARD_VIEW,
      viewName
    });
  };
}
