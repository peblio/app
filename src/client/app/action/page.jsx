import axios from 'axios';
import shortid from 'shortid';
import { convertToRaw } from 'draft-js';
import * as ActionTypes from '../constants.jsx';

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

export function loadPage(id, title, preview) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_PAGE,
      id,
      title,
      preview
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
  return editors.map((editor) => {
    if (editor.type === 'text') {
      const { editorState, ...newEditor } = editor;
      console.log(newEditor, editorState, editorState.getCurrentContent());
      newEditor.rawContentState = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      return newEditor;
    }
    return editor;
  });
}

export function submitPage(parentId, title, preview, editors) {
  const id = shortid.generate();
  axios.post('/pages/save', {
    parentId,
    id,
    title,
    preview,
    editors: convertEditorsToRaw(editors)
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

export function updatePage(id, title, preview, editors) {
  axios.post('/pages/update', {
    id,
    title,
    preview,
    editors: convertEditorsToRaw(editors)
  }).then(response => console.log('Page update', response))
    .catch(error => console.error('Page update error', error));

  return (dispatch) => {
    dispatch(setUnsavedChanges(false));
    dispatch({
      type: ActionTypes.UPDATE_PAGE,
      id
    });
  };
}

export function setAllPages(data) {
  const pages = data.map(page => ({ id: page.id, title: page.title }));
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ALL_PAGES,
      pages
    });
  };
}

export function togglePreviewMode(value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.TOGGLE_PREVIEW_MODE
    });
  };
}
