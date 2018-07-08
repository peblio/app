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

export function loadPage(id, title, preview, layout) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_PAGE,
      id,
      title,
      preview,
      layout
    });
  };
}

export function deletePage(pageId) {
  return (dispatch) => {
    axios.delete(`/pages/${pageId}`).then(() => {
      dispatch({
        type: ActionTypes.DELETE_PAGE,
        pageId
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

export function submitPage(parentId, title, preview, editors, editorIndex, layout) {
  const id = shortid.generate();
  axios.post('/pages/save', {
    parentId,
    id,
    title,
    preview,
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

export function createPage(title, folder) {
  return (dispatch) => {
    const id = shortid.generate();
    const data = { id, title };
    if (folder) {
      data.folder = folder;
    }
    return axios.post('/pages/save', data).then((response) => {
      dispatch({
        type: ActionTypes.CREATE_PAGE,
        page: response.data.page
      });
    });
  };
}

export function updatePage(id, title, preview, editors, editorIndex, layout) {
  axios.post('/pages/update', {
    id,
    title,
    preview,
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
  return dispatch => axios.get('/api/sketches').then(({ data }) => {
    dispatch({
      type: ActionTypes.SET_ALL_PAGES,
      pages: data.pages,
      folders: data.folders
    });
  });
}

export function togglePreviewMode(value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.TOGGLE_PREVIEW_MODE
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

export function createFolder(title, parent) {
  return (dispatch) => {
    const data = { title };
    if (parent) {
      data.parent = parent;
    }
    return axios.post('/folders', data).then((response) => {
      dispatch({
        type: ActionTypes.CREATE_FOLDER,
        folder: response.data.folder
      });
    });
  };
}

export function deleteFolder(folderId) {
  return (dispatch) => {
    axios.delete(`/folders/${folderId}`).then(() => {
      dispatch({
        type: ActionTypes.DELETE_FOLDER,
        folderId
      });
    });
  };
}

export function renameFolder(folderId, folderName) {
  return (dispatch) => {
    axios.post(`/folders/${folderId}/rename/${folderName}`).then((response) => {
      dispatch({
        type: ActionTypes.RENAME_FOLDER,
        folderId,
        folderName
      });
    });
  };
}

export function movePageToTopLevel(pageId) {
  return (dispatch, getState) => {
    const { page } = getState();
    const pageToMove = page.pages.byId[pageId];
    if (!pageToMove.folder) {
      return Promise.resolve();
    }
    return axios.post(`/pages/${pageId}/move`, {}).then((response) => {
      dispatch({
        type: ActionTypes.MOVE_PAGE_TO_TOP_LEVEL,
        pageId
      });
    });
  };
}

export function movePageToFolder(pageId, folderId) {
  if (!folderId) {
    return movePageToTopLevel(pageId);
  }
  return dispatch => axios.post(`/pages/${pageId}/move`, { folderId }).then((response) => {
    dispatch({
      type: ActionTypes.MOVE_PAGE_TO_FOLDER,
      pageId,
      folderId
    });
  });
}

export function moveFolderToTopLevel(folderId) {
  return (dispatch, getState) => {
    const { page } = getState();
    const folder = page.folders.byId[folderId];
    if (!folder.parent) {
      return Promise.resolve();
    }
    return axios.post(`/folders/${folderId}/move`, {}).then((response) => {
      dispatch({
        type: ActionTypes.MOVE_FOLDER_TO_TOP_LEVEL,
        folderId
      });
    });
  };
}

export function moveFolderToFolder(childFolderId, parentFolderId) {
  if (!parentFolderId) {
    return moveFolderToTopLevel(childFolderId);
  }
  return (dispatch, getState) => {
    const { page } = getState();
    const childFolder = page.folders.byId[childFolderId];
    if (childFolder.parent === parentFolderId) {
      return Promise.resolve();
    }
    return axios.post(`/folders/${childFolderId}/move`, { folderId: parentFolderId }).then((response) => {
      dispatch({
        type: ActionTypes.MOVE_FOLDER_TO_FOLDER,
        childFolderId,
        parentFolderId
      });
    });
  };
}

export function viewFolder(folderId, depth) {
  return dispatch => dispatch({
    type: ActionTypes.VIEW_FOLDER,
    folderId,
    depth
  });
}

export function viewPage(pageId) {
  return dispatch => dispatch({
    type: ActionTypes.VIEW_PAGE,
    pageId
  });
}

export function clearSelectedFolders(depth) {
  return dispatch => dispatch({
    type: ActionTypes.CLEAR_SELECTED_FOLDERS,
    depth
  });
}
