import * as ActionTypes from '../constants/reduxConstants.js';

export function setDashboardView(viewName) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DASHBOARD_VIEW,
      viewName
    });
  };
}

export function setTrashPages(data) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_TRASH_PAGES,
      data
    });
  };
}
