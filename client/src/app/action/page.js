import shortid from 'shortid';
import { convertToRaw } from 'draft-js';

import * as ActionTypes from '../constants/reduxConstants.js';
import axios from '../utils/axios';
import history from '../utils/history';
import { namespaceActionCreators } from '../utils/namespace-redux';
import * as folderActions from './folders';

export function setUnsavedChanges(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_UNSAVED_CHANGES,
      value
    });
  };
}

export function autoSaveUnsavedChanges() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.AUTO_SAVE_UNSAVED_CHANGES, });
  };
}

export function setPageTitle(event) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_PAGE_TITLE,
      event
    });
  };
}

export function setPageLayout(value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_PAGE_LAYOUT,
      value
    });
  };
}

export function loadPage(id, title, layout) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_PAGE,
      id,
      title,
      layout
    });
  };
}

function convertEditorsToRaw(editors) {
  const rawEditors = {};
  Object.keys(editors).forEach((id) => {
    if (editors[id].type === 'text') {
      const { editorState, ...rawEditor } = editors[id];
      rawEditor.rawContentState = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      rawEditors[id] = rawEditor;
    } else rawEditors[id] = editors[id];
  });
  return rawEditors;
}

export function submitPage(parentId, title, editors, editorIndex, layout) {
  const id = shortid.generate();
  axios.post('/pages/save', {
    parentId,
    id,
    title,
    editors: convertEditorsToRaw(editors),
    editorIndex,
    layout
  }).then(() => {
    history.push(`/pebl/${id}`);
  })
    .catch(error => console.error(error));

  return (dispatch) => {
    dispatch(setUnsavedChanges(false));
    dispatch({
      type: ActionTypes.SET_PAGE_ID,
      id
    });
  };
}

export function updatePage(id, title, editors, editorIndex, layout) {
  axios.post('/pages/update', {
    id,
    title,
    editors: convertEditorsToRaw(editors),
    editorIndex,
    layout
  }).then(response => console.log('Page update'))
    .catch(error => console.error('Page update error', error));

  return (dispatch) => {
    dispatch(setUnsavedChanges(false));
    // this action currently doesn't do anything because there is no corresponding handler in a reducer
    dispatch({
      type: ActionTypes.UPDATE_PAGE,
      id
    });
  };
}

export function togglePreviewMode() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_PREVIEW_MODE
    });
  };
}

export function setPreviewMode(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PREVIEW_MODE,
      value
    });
  };
}

export function resizeTextEditor(id, height) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.RESIZE_TEXT_EDITOR,
      id,
      height
    });
  };
}

export function updateTextHeight(id, height) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_TEXT_HEIGHT,
      id,
      height
    });
  };
}

const currentUserFolderActions = namespaceActionCreators(folderActions, 'CURRENT_USER_FOLDERS');

export const {
  deletePage,
  createPage,
  fetchAllPages,
  createFolder,
  deleteFolder,
  renameFolder,
  movePageToTopLevel,
  movePageToFolder,
  moveFolderToTopLevel,
  moveFolderToFolder,
  viewFolder,
  viewPage,
  clearSelectedFolders
} = currentUserFolderActions;
