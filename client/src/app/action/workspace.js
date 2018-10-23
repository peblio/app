import * as ActionTypes from '../constants/reduxConstants.js';
import { setUnsavedChanges } from './page.js';

export function playCode() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.WP_PLAY_CODE
    });
  };
}

export function stopCode() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.WP_STOP_CODE
    });
  };
}

export function startCodeRefresh() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.WP_START_CODE_REFRESH
    });
  };
}

export function stopCodeRefresh() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.WP_STOP_CODE_REFRESH
    });
  };
}

export function updateConsoleOutput(id, event) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.WP_UPDATE_CONSOLE_OUTPUT,
      id,
      event
    });
  };
}

export function clearConsoleOutput() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.WP_CLEAR_CONSOLE_OUTPUT
    });
  };
}

export function updateFile(index, content) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.WP_UPDATE_FILE,
      index,
      content
    });
  };
}

export function setCurrentFile(index) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.WP_SET_CURRENT_FILE,
      index
    });
  };
}

export function setInnerWidth(value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.WP_SET_INNER_WIDTH,
      value
    });
  };
}

export function setInnerHeight(value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.WP_SET_INNER_HEIGHT,
      value
    });
  };
}

export function loadWorkspace(workspace) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOAD_WORKSPACE,
      workspace
    });
  };
}

export function toggleWorkspace() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_WORKSPACE
    });
  };
}

export function setEditorMode(event) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.WP_SET_EDITOR_MODE,
      value: event.target.value
    });
  };
}

export function openShareWorkspace() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.OPEN_SHARE_WORKSPACE
    });
  };
}
export function closeShareWorkspace() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_SHARE_WORKSPACE
    });
  };
}
