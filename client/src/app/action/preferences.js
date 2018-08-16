import axios from '../utils/axios';
import * as ActionTypes from '../constants/reduxConstants.js';

export function updateShowForkWarning(value) {
  axios.post('/users/preferences', {
    key: 'forkWarning',
    value
  })
  .then((res) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(err);
  });
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_SHOW_FORK_WARNING
    });
  };
}
export function fetchUserPreferences() {
  return dispatch => axios.get('/users/preferences')
    .then((res) => {
      const data = res.data;
      dispatch({
        type: ActionTypes.SET_USER_PREFERENCES,
        data
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
