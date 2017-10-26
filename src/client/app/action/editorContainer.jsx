import * as ActionTypes from '../constants.jsx';

export function addEditor() {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.ADD_EDITOR
    });
  };
}

export function playCode(id) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.PLAY_CODE,
      id
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

export function setEditorMode(value) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_EDITOR_MODE,
      value
    });
  };
}

export function stopCode(id) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.STOP_CODE,
      id
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

export function updateConsoleOutput(event) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_CONSOLE_OUTPUT,
      event
    });
  };
}

export function removeEditor(id) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_EDITOR,
      id
    });
  };
}
