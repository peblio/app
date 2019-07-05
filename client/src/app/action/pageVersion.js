import axios from '../utils/axios';
import * as ActionTypes from '../constants/reduxConstants.js';
import history from '../utils/history';

import { loadPage, convertEditorsToRaw } from './page.js';
import { loadEditors } from './editors.js';
import { loadWorkspace } from './workspace.js';

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
        console.log(pageData.editors);
        dispatch(loadEditors(pageData.editors, pageData.editorIndex));
        dispatch(loadPage(pageData.id, pageData.parentId, pageData.title, pageData.heading,
          pageData.description, pageData.layout, pageData.tags, pageData.isPublished));
        if (pageData.workspace) {
          dispatch(loadWorkspace(pageData.workspace));
        }
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
  }).then();
}
