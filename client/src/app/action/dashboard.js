import * as ActionTypes from '../constants/reduxConstants.js';
import axios from '../utils/axios';
import { filterPagesByTitle, clearFilterPagesByTitle } from './page.js';

export function toggleAddNewMenu() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_ADD_NEW_MENU
    });
  };
}

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

export function loadMemoryConsumed() {
  return dispatch => axios.get('files/size')
    .then((memoryInfo) => {
      const size = memoryInfo.data.size;
      dispatch({
        type: ActionTypes.LOAD_MEMORY_CONSUMED,
        memoryConsumed: size
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function searchByTitle(searchText) {
  return (dispatch) => {
    dispatch(filterPagesByTitle(searchText));
  };
}

export function clearSearchByTitle(searchText) {
  return (dispatch) => {
    dispatch(clearFilterPagesByTitle(searchText));
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
