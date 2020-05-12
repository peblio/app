import shortid from 'shortid';
import { convertToRaw } from 'draft-js';
import html2canvas from 'html2canvas';
import * as ActionTypes from '../constants/reduxConstants.js';
import { SNAPSHOT_DEFAULT_IMG } from '../constants/pageConstants.js';
import axios from '../utils/axios';
import history from '../utils/history';
import { namespaceActionCreators } from '../utils/namespace-redux';
import * as folderActions from './folders';
import { viewForkPrompt } from './mainToolbar.js';
import { saveLog } from '../utils/log';
import { loadWidgets } from './editors.js';
import { loadWorkspace } from './workspace.js';
import { createNavigationContent } from './navigation.js';
import { setUnsavedPageVersion } from './pageVersion.js';

export function loadCurrentPage(projectID) {
  return (dispatch) => {
    axios.get(`/pages/${projectID}`)
      .then((res) => {
        dispatch(loadPage(res.data[0].id, res.data[0].parentId, res.data[0].title, res.data[0].heading,
          res.data[0].description, res.data[0].layout, res.data[0].tags, res.data[0].isPublished));
        dispatch(loadWidgets(res.data[0].editors, res.data[0].editorIndex));
        if (Object.keys(res.data[0].workspace).length > 0) {
          dispatch(loadWorkspace(res.data[0].workspace));
        }
        dispatch(createNavigationContent(res.data[0].layout));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 404) {
          history.push('/404');
        }
      });
  };
}

export function setUnsavedChanges(value) {
  return (dispatch, getState) => {
    const { id } = getState().page;
    if (id) {
      sessionStorage.setItem(id, value);
    }
    dispatch(setUnsavedPageVersion());
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
    dispatch({
      type: ActionTypes.SET_PAGE_LAYOUT,
      value
    });
  };
}

export function changePageLayout(value) {
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

export function duplicatePage(id, folder) {
  return (dispatch) => {
    axios.get(`/pages/${id}`)
      .then((res) => {
        const pebl = res.data[0];
        const id = shortid.generate();
        const data = {
          id,
          title: `${pebl.title}-Copy`,
          heading: pebl.heading,
          description: pebl.description,
          editors: pebl.editors,
          editorIndex: pebl.editorIndex,
          layout: pebl.layout,
          tags: pebl.tags,
          snapshotPath: pebl.snapshotPath
        };
        if (pebl.folder) {
          data.folder = pebl.folder;
        }
        axios.post('/pages/save', data)
          .then((response) => {
            dispatch({
              type: ActionTypes.DUPLICATE_PAGE,
              page: response.data.page
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function convertEditorsToRaw(editors) {
  const rawEditors = {};
  Object.keys(editors).forEach((id) => {
    if (editors[id].type === 'text') {
      const { editorState, ...rawEditor } = editors[id];
      if (editorState) {
        rawEditor.rawContentState = JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        );
      }
      rawEditors[id] = rawEditor;
    } else rawEditors[id] = editors[id];
  });
  return rawEditors;
}

export function savePageSnapshot(id, firstSave) {
  const canvasElement = document.getElementById('content-canvas');
  firstSave && document.getElementsByTagName('BODY')[0].append(canvasElement);

  html2canvas(document.getElementById('content-canvas'),
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
    const elements = document.getElementsByClassName('canvas');
    // remove the duplicates
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].parentElement.tagName === 'BODY') {
        elements[i].remove();
      }
    }

    axios.patch('/pages', {
      id,
      image: canvas.toDataURL()
    });
  }).catch((error) => {
    console.error('Page snapshot update error', error);
  });
}

function getLogObjectForSavePage(name) {
  return {
    message: 'Saving Page',
    path: '/pages/save',
    action: 'Saving Page',
    module: 'ui',
    level: 'INFO',
    user: name
  };
}

export function submitPage(rawPageData, isLoggedIn, name, openPageInNewTab) {
  const id = shortid.generate();
  const axiosURL = isLoggedIn ? '/pages/save' : '/pages/saveAsGuest';
  const pageData = { ...rawPageData, id, editors: convertEditorsToRaw(rawPageData.editors) };
  return dispatch => axios.post(axiosURL, pageData)
    .then(() => {
      savePageSnapshot(id, true);
      if (openPageInNewTab) {
        window.open(`/pebl/${id}`, '_blank');
      } else {
        history.push(`/pebl/${id}`);
      }
      dispatch(setUnsavedChanges(false));
      dispatch({
        type: ActionTypes.SET_PAGE_ID,
        id
      });
    })
    .then(() => {
      saveLog(getLogObjectForSavePage(name));
    })
    .catch(error => console.error('Error', error));
}

export function remixPage(page) {
  const id = shortid.generate();
  const pageData = { ...page, id, snapshotPath: SNAPSHOT_DEFAULT_IMG, editors: convertEditorsToRaw(page.editors) };
  return dispatch => axios.post('/pages/save', pageData)
    .then(() => {
      savePageSnapshot(id, true);
      history.push(`/pebl/${id}`);
      window.location.reload(true);
      dispatch({
        type: ActionTypes.SET_PAGE_ID,
        id
      });
    }).catch(error => console.error('Error', error));
}

function getLogForUpdatePage(canEdit, id, name) {
  return {
    message: `Updating Page with canEdit as ${canEdit}`,
    path: `/pages/update/${id}`,
    action: 'Updating Page',
    module: 'ui',
    level: 'INFO',
    user: name
  };
}

export function updatePage(pageData, canEdit, name) {
  return dispatch => axios.post('/pages/update', { ...pageData, editors: convertEditorsToRaw(pageData.editors) })
    .then(() => {
      dispatch(setUnsavedChanges(false));
      dispatch({
        type: ActionTypes.UPDATE_PAGE,
        id: pageData.id
      });
    })
    .then(() => {
      saveLog(getLogForUpdatePage(canEdit, pageData.id, name));
    })
    .catch(error => console.error('Page update error', error));
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

export function viewLivePageRefreshModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VIEW_LIVE_PAGE_REFRESH_MODAL
    });
  };
}

export function closeLiveRefreshPageModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_LIVE_PAGE_REFRESH_MODAL
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

export function renamePage(pageId, pageName) {
  return (dispatch) => {
    axios.patch(`/pages/${pageId}/rename/${pageName}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.RENAME_PAGE,
          pageId,
          pageName
        });
      })
      .catch((err) => {
        console.log(err);
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
  trashPage,
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
  filterPagesByTitle,
  clearFilterPagesByTitle,
  clearSelectedFolders,
  jumpToFolderByShortId
} = currentUserFolderActions;
