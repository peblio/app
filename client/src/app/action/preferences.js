import axios from '../utils/axios';
import * as ActionTypes from '../constants/reduxConstants.js';

export function updateEditorTheme(e) {
  const value = e.target.value;
  updatePrefrences({
    key: 'editorTheme',
    value
  });
}

export function updateEditorFontSize(e) {
  const value = e.target.value;
  updatePrefrences({
    key: 'editorFontSize',
    value
  });
}


export function fetchUserPreferences() {
  return (dispatch, getState) => {
    const { user } = getState();
    if (!user.name) {
      return false;
    }
    return axios.get('/current_user/preferences')
      .then(({ data }) => dispatch({
        type: ActionTypes.SET_USER_PREFERENCES,
        data
      }))
      .catch((err) => {
        console.log(err);
      });
  };
}

function updatePrefrences(keyValuePair) {
  axios.post('/current_user/preferences', keyValuePair)
    .then((res) => {
      console.log('preferences updated');
    })
    .catch((err) => {
      console.log(err);
    });

  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_EDITOR_THEME,
      value
    });
  };
}

