import axios from '../utils/axios';
import * as ActionTypes from '../constants/reduxConstants.js';
import history from '../utils/history';

import { loadPage, convertEditorsToRaw } from './page.js';
import { loadEditors } from './editors.js';
import { loadWorkspace } from './workspace.js';
import { createNavigationContent } from './navigation.js';

export function loadHistoryForPage(id) {
  return (dispatch) => {
    axios.get(`/pagesversion?id=${id}`)
      .then(({ data }) => dispatch({
        type: ActionTypes.LOAD_PAGE_VERSIONS,
        data
      }))
      .catch((e) => {
        if (e.response.status === 404) {
          history.push('/404');
        }
      });
  };
}

export function loadPageVersion(id, versionId) {
  return (dispatch) => {
    axios.get(`/pagesversion?id=${id}&version=${versionId}`)
      .then(({ data }) => {
        const pageData = data.data[0];
        dispatch(loadEditors(pageData.editors, pageData.editorIndex));
        dispatch(loadPage(pageData.id, pageData.parentId, pageData.title, pageData.heading,
          pageData.description, pageData.layout, pageData.tags, pageData.isPublished));
        if (pageData.workspace) {
          dispatch(loadWorkspace(pageData.workspace));
        }
        dispatch(createNavigationContent(pageData.layout));
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.status === 404) {
          history.push('/404');
        } else {
          console.log(e);
        }
      });
  };
}

export function saveCurrentToVersion(id) {
  return (dispatch) => {
    axios.get(`/pages/${id}`)
      .then((res) => {
        dispatch(savePageVersion(
          res.data[0].parentId,
          res.data[0].id,
          res.data[0].title,
          res.data[0].heading,
          res.data[0].snapshotPath,
          res.data[0].description,
          res.data[0].editors,
          res.data[0].editorIndex,
          res.data[0].layout,
          res.data[0].workspace,
          res.data[0].isPublished,
          res.data[0].tags,
        ));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function savePageVersion(
  parentId,
  id,
  title,
  heading,
  snapshotPath,
  description,
  editors,
  editorIndex,
  layout,
  workspace,
  isPublished,
  tags,
) {
  let newPageVersion;
  return (dispatch) => {
    axios.post('/pagesversion', {
      parentId,
      id,
      title,
      heading,
      snapshotPath,
      description,
      editors: convertEditorsToRaw(editors),
      editorIndex,
      layout,
      workspace,
      isPublished,
      tags,
    })
      .then((res) => {
        newPageVersion = res.data.pageVersion;
        dispatch(loadHistoryForPage(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function showOldPageVersion(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SHOW_OLD_PAGE_VERSION,
      id
    });
  };
}

export function hideOldPageVersion() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.HIDE_OLD_PAGE_VERSION
    });
  };
}

export function togglePageVersion() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_PAGE_VERSION
    });
  };
}
