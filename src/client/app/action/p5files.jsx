import * as ActionTypes from '../constants.jsx';

export function updateFile(index, content) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_FILE,
      index,
      content
    });
  };
}
