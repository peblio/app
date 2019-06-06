import shortid from 'shortid';

import * as ActionTypes from '../constants/reduxConstants.js';
import axios from '../utils/axios';
import { saveLog } from '../utils/log';

export function deletePage(pageId) {
  return (dispatch) => {
    axios.delete(`/pages/${pageId}`).then(() => {
      dispatch({
        type: ActionTypes.DELETE_PAGE,
        pageId
      });
      const log = {
        message: 'Deleting Page',
        path: `/pages/${pageId}`,
        action: 'Deleting Page',
        module: 'ui',
        level: 'INFO'
      };
      saveLog(log);
    });
  };
}

export function createPage(title, folder) {
  return (dispatch) => {
    const id = shortid.generate();
    const data = { id, title, snapshotPath: 'https://s3.amazonaws.com/peblio-files/_Pebl_Snapshots/default.png' };
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

export function fetchAllPages(profileName) {
  // TODO:
  //  - refactor this route to be something like /api/users/:userName/sketches
  //  - don't use two different routes for fetching pages for the current user vs. other users
  return (dispatch, getState) => {
    let url = '/sketches';
    if (profileName) {
      url = `${url}/${profileName}?folderSortBy=title&fileSortBy=title`;
    } else {
      const { user } = getState();
      if (!user.name) {
        return false;
      }
    }
    return axios.get(url)
      .then(({ data }) => dispatch({
        type: ActionTypes.SET_ALL_PAGES,
        pages: data.pages,
        folders: data.folders
      }));
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

export function jumpToFolderByShortId(folderShortId) {
  return dispatch => dispatch({
    type: ActionTypes.JUMP_TO_FOLDER,
    folderShortId
  });
}

export function clearSelectedFolders(depth) {
  return dispatch => dispatch({
    type: ActionTypes.CLEAR_SELECTED_FOLDERS,
    depth
  });
}
