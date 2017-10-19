import * as ActionTypes from '../constants.jsx';

export function playCode(id) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.PLAY_CODE,
    });
  };
}

export function stopCode(id) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.STOP_CODE,
    });
  };
}

export function updateCode(value) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_CODE,
      value
    });
  }
}

export function addEditor() {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.ADD_EDITOR
    });
  };
}

export function setCurrentEditor(value) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_EDITOR,
      value
    });
  };
}
