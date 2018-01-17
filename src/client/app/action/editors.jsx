import * as ActionTypes from '../constants.jsx';
import { setUnsavedChanges } from './page.jsx';

/** ALL */
export function setCurrentEditor(index) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_EDITOR,
      index
    });
  };
}

export function removeEditor(index) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.REMOVE_EDITOR,
      index
    });
  };
}

export function loadEditors(editors) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_EDITORS,
      editors
    });
  };
}

export function setEditorPosition(index, x, y) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_EDITOR_POSITION,
      index,
      x,
      y
    });
  };
}

export function setEditorSize(index, width, height) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_EDITOR_SIZE,
      index,
      width,
      height
    });
  };
}

/** CODE EDITOR */
export function addCodeEditor() {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.ADD_CODE_EDITOR
    });
  };
}

export function playCode(index) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.PLAY_CODE,
      index
    });
  };
}

export function stopCode(index) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.STOP_CODE,
      index
    });
  };
}

export function updateCode(index, value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.UPDATE_CODE,
      index,
      value
    });
  };
}

export function setEditorMode(index, value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_EDITOR_MODE,
      index,
      value
    });
  };
}

export function updateConsoleOutput(index, event) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_CONSOLE_OUTPUT,
      index,
      event
    });
  };
}

/** TEXT EDITOR */
export function addTextEditor() {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.ADD_TEXT_EDITOR
    });
  };
}

export function updateTextChange(index, state) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.UPDATE_TEXT_CHANGE,
      index,
      state
    });
  };
}

/** IFRAME */
export function addIframe() {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.ADD_IFRAME
    });
  };
}

export function setIframeURL(index, url) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_IFRAME_URL,
      index,
      url
    });
  };
}
