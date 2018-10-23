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
    dispatch({ type: ActionTypes.AUTO_SAVE_UNSAVED_CHANGES });
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

export function setPageHeading(event) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_PAGE_HEADING,
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

export function loadPage(id, title, heading, layout) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_PAGE,
      id,
      title,
      heading,
      layout
    });
  };
}

export function duplicatePage(title, folder, editors, editorIndex, layout) {
  return (dispatch) => {
    const id = shortid.generate();
    const data = {
      id,
      title: `${title}-Copy`,
      editors,
      editorIndex,
      layout
    };
    if (folder) {
      data.folder = folder;
    }

    axios.post('/pages/save', data).then((response) => {
      dispatch({
        type: ActionTypes.DUPLICATE_PAGE,
        page: response.data.page
      });
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

export function submitPage(parentId, title, heading, editors, editorIndex, layout, type, workspace) {
  const id = shortid.generate();
  axios.post('/pages/save', {
    parentId,
    id,
    title,
    heading,
    editors: convertEditorsToRaw(editors),
    editorIndex,
    layout,
    workspace
  }).then(() => {
    if (type === 'fromWP') {
      window.open(`/pebl/${id}`, '_blank');
    } else {
      history.push(`/pebl/${id}`);
    }
    if (type === 'fork') {
      window.location.reload(true);
    }
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

export function updatePage(id, title, heading, editors, editorIndex, layout, workspace) {
  axios.post('/pages/update', {
    id,
    title,
    heading,
    editors: convertEditorsToRaw(editors),
    editorIndex,
    layout,
    workspace
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
