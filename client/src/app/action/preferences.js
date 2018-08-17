import axios from '../utils/axios';
import * as ActionTypes from '../constants/reduxConstants.js';

export function updateEditorTheme(e) {
  const value = e.target.value;
  return (dispatch) => {
    axios.post('/users/preferences', {
      key: 'editorTheme',
      value
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.UPDATE_EDITOR_THEME,
        value
      });
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
  };
}

export function updateEditorFontSize(e) {
  const value = e.target.value;
  return (dispatch) => {
    axios.post('/users/preferences', {
      key: 'editorFontSize',
      value
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.UPDATE_EDITOR_FONT_SIZE,
        value
      });
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
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
