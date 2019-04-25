import * as ActionTypes from '../constants/reduxConstants.js';

export function setDashboardView(viewNo) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DASHBOARD_VIEW,
      viewNo
    });
  };
}
