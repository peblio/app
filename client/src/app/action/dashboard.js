import * as ActionTypes from '../constants/reduxConstants.js';
import axios from '../utils/axios';


export function setDashboardView(viewName) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DASHBOARD_VIEW,
      viewName
    });
  };
}

export function setTrashPages() {
  return dispatch => axios.get('/pages/trash')
    .then((data) => {
      dispatch({
        type: ActionTypes.SET_TRASH_PAGES,
        data
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function restoreTrashedPage(id) {
  return dispatch => axios.put(`/pages/trash/${id}`)
    .then(() => {
      dispatch(setTrashPages());
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deletePage(id) {
  return dispatch => axios.delete(`/pages/${id}`)
    .then(() => {
      dispatch(setTrashPages());
    })
    .catch((err) => {
      console.log(err);
    });
}

export function emptyTrash(id) {
  return dispatch => axios.delete('/pages/trash')
    .then(() => {
      dispatch(setTrashPages());
    })
    .catch((err) => {
      console.log(err);
    });
}


export function setDocumentView(viewType) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DOCUMENT_VIEW,
      viewType
    });
  };
}

export function setDocumentSort(sortType) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DOCUMENT_SORT,
      sortType
    });
  };
}

export function searchByTitle(searchText) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SEARCH_BY_TITLE,
      searchText
    });
  };
}

export function setParentFolder(folderId) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PARENT_FOLDER,
      folderId
    });
  };
}
