import shortid from 'shortid';
import { convertToRaw } from 'draft-js';
import html2canvas from 'html2canvas';
import * as ActionTypes from '../constants/reduxConstants.js';
import axios from '../utils/axios';
import history from '../utils/history';
import { namespaceActionCreators } from '../utils/namespace-redux';
import * as folderActions from './folders';
import { viewForkPrompt } from './mainToolbar.js';

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

export function setPageDescription(event) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.SET_PAGE_DESCRIPTION,
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

export function loadPage(id, parentId, title, heading, description, layout, tags, isPublished) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_PAGE,
      id,
      parentId,
      title,
      heading,
      description,
      layout,
      tags,
      isPublished
    });
  };
}

export function duplicatePage(title, heading, description, folder, editors, editorIndex, layout, tags) {
  return (dispatch) => {
    const id = shortid.generate();
    const data = {
      id,
      title: `${title}-Copy`,
      heading,
      description,
      editors,
      editorIndex,
      layout,
      tags
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

export function submitPage(parentId, title, heading, description, editors, editorIndex, layout, type, workspace, tags, isLoggedIn, isPublished) {
  const id = shortid.generate();
  const axiosURL = isLoggedIn ? '/pages/save' : '/pages/saveAsGuest';
  axios.post(axiosURL, {
    parentId,
    id,
    title,
    heading,
    description,
    editors: convertEditorsToRaw(editors),
    editorIndex,
    layout,
    workspace,
    tags,
    isPublished
  }).then(() => {
    savePageSnapshot(id);
    if (type === 'fromWP') {
      window.open(`/pebl/${id}`, '_blank');
    } else {
      history.push(`/pebl/${id}`);
    }
    if (type === 'remix') {
      window.location.reload(true);
    }
  }).catch(error => console.error('Error', error));
  return (dispatch) => {
    dispatch(setUnsavedChanges(false));
    dispatch({
      type: ActionTypes.SET_PAGE_ID,
      id
    });
  };
}


export function savePageSnapshot(id) {
  const canvasElement = document.getElementById('content-canvas');
  const canvasDuplicate = canvasElement.cloneNode();
  canvasDuplicate.className += ' canvas-duplicate';
  // create a duplicate of the canvas to take snapshots of
  document.getElementsByTagName('BODY')[0].appendChild(canvasDuplicate);

  html2canvas(canvasElement,
    {
      useCORS: true,
      scale: 1,
      height: 816,
      width: 1016,
      allowTaint: false,
      onclone(document) {
        const list = document.getElementsByClassName('widget__container');
        for (const item of list) {
          item.style.transform = 'scale(2,2) translate(25%, 25%)';
        }
        document.querySelector('.react-grid-layout').style.transform = 'scale(0.5,0.5) translate(-50%,-50%)';
      }
    }).then((canvas) => {
    // remove the duplicates
    const elements = document.getElementsByClassName('canvas-duplicate');
    while (elements.length > 0) elements[0].remove();

    axios.patch('/pages', {
      id,
      image: canvas.toDataURL()
    });
  }).catch((error) => {
    console.error('Page snapshot update error', error);
  });
}

export function updatePage(id, title, heading, description, editors, editorIndex, layout, workspace, tags, isPublished) {
  axios.post('/pages/update', {
    id,
    title,
    heading,
    description,
    editors: convertEditorsToRaw(editors),
    editorIndex,
    layout,
    workspace,
    tags,
    isPublished
  }).then(() => (dispatch) => {
    dispatch(setUnsavedChanges(false));
    dispatch({
      type: ActionTypes.UPDATE_PAGE,
      id
    });
  }).catch(error => console.error('Page update error', error));
  return () => {};
}

function saveAs(uri, filename) {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

export function setPageId(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PAGE_ID,
      id
    });
  };
}

export function togglePreviewMode() {
  return (dispatch) => {
    dispatch(viewForkPrompt());
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

export function setPageAuthor(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PAGE_AUTHOR,
      value
    });
  };
}

export function setParentPageAuthor(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PARENT_PAGE_AUTHOR,
      value
    });
  };
}

export function addPageTag(value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.ADD_PAGE_TAG,
      value
    });
  };
}

export function deletePageTag(value) {
  return (dispatch) => {
    dispatch(setUnsavedChanges(true));
    dispatch({
      type: ActionTypes.DELETE_PAGE_TAG,
      value
    });
  };
}

export function publishPage() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.PUBLISH_PAGE
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
