import * as ActionTypes from '../constants.jsx';
import { setUnsavedChanges } from './page.jsx';

/** ALL */
export function setCurrentEditor(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_EDITOR,
      id
    });
  };
}

export function removeEditor(id) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.REMOVE_EDITOR,
      id
    });
  };
}

export function loadEditors(editors, editorIndex) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_EDITORS,
      editors,
      editorIndex
    });
  };
}

export function setEditorPosition(id, x, y) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_EDITOR_POSITION,
      id,
      x,
      y
    });
  };
}

export function setEditorSize(id, width, height) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_EDITOR_SIZE,
      id,
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

export function playCode(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.PLAY_CODE,
      id
    });
  };
}

export function stopCode(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.STOP_CODE,
      id
    });
  };
}

export function startCodeRefresh(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.START_CODE_REFRESH,
      id
    });
  };
}

export function stopCodeRefresh(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.STOP_CODE_REFRESH,
      id
    });
  };
}

export function setEditorMode(id, value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_EDITOR_MODE,
      id,
      value
    });
  };
}

export function updateConsoleOutput(id, event) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_CONSOLE_OUTPUT,
      id,
      event
    });
  };
}

export function clearConsoleOutput(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLEAR_CONSOLE_OUTPUT,
      id
    });
  };
}

export function updateFile(id, index, content) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_FILE,
      id,
      index,
      content
    });
  };
}

export function setCurrentFile(id, index) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_FILE,
      id,
      index
    });
  };
}

export function setInnerWidth(id, value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_INNER_WIDTH,
      id,
      value
    });
  };
}

export function setInnerHeight(id, value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_INNER_HEIGHT,
      id,
      value
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

export function updateTextChange(id, state) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.UPDATE_TEXT_CHANGE,
      id,
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

export function setIframeURL(id, url) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_IFRAME_URL,
      id,
      url
    });
  };
}
