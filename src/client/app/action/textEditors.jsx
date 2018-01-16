import * as ActionTypes from '../constants.jsx';
import { setUnsavedChanges } from './page.jsx';

export function addTextEditor() {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.ADD_TEXT_EDITOR
    });
  };
}

export function updateTextChange(state) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.UPDATE_TEXT_CHANGE,
      state
    });
  };
}

export function setCurrentTextEditor(id, state) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_TEXT_EDITOR,
      id,
      state
    });
  };
}

export function removeTextEditor(id) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.REMOVE_TEXT_EDITOR,
      id
    });
  };
}

export function loadTextEditors(indexTextEditor, textEditors) {
  console.log(textEditors);
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_TEXT_EDITORS,
      indexTextEditor,
      textEditors
    });
  };
}

export function setTextEditorPosition(x, y) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_TEXT_EDITOR_POSITION,
      x,
      y
    });
  };
}

export function setTextEditorSize(width, height) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_TEXT_EDITOR_SIZE,
      width,
      height
    });
  };
}
