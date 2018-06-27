import axios from 'axios';
import shortid from 'shortid';
import { convertToRaw } from 'draft-js';
import * as ActionTypes from '../constants/reduxConstants.js';

export function setUnsavedChanges(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_UNSAVED_CHANGES,
      value
    });
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

export function deletePage(page) {
  const id = page.page.id;
  axios.post('/pages/delete', { id })
    .then(() => console.log('Page deleted'))
    .catch(error => console.error('Error deleting page', error));
  return (dispatch) => {
    dispatch({
      type: ActionTypes.DELETE_PAGE,
      id
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
  }).then(() => window.location.replace(`${window.location.origin}/pebl/${id}`))
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
    dispatch({
      type: ActionTypes.UPDATE_PAGE,
      id
    });
  };
}

export function fetchAllPages() {
  return (dispatch) => {
    axios.get('/api/sketches').then(({ data }) => {
      const pages = data.pages.map(page => ({ id: page.id, title: page.title }));
      dispatch({
        type: ActionTypes.SET_ALL_PAGES,
        pages,
        folders: data.folders
      });
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

export function createFolder(data) {
  return (dispatch) => {
    axios.post('/folder', data).then((response) => {
      dispatch({
        types: ActionTypes.CREATE_FOLDER,
        folder: response.data.folder
      });
    });
  };
}
