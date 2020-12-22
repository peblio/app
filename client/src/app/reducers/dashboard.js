import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  dashboardView: 'documents',
  trashPages: [],
  documentView: 'block',
  documentSort: 'title',
  parentFolderId: '',
  isAddNewMenuOpen: false,
  memoryConsumed: 0,
  totalMemory: 500000000
};
const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_DASHBOARD_VIEW:
      return Object.assign({}, state, {
        dashboardView: action.viewName
      });
    case ActionTypes.SET_TRASH_PAGES:
      return Object.assign({}, state, {
        trashPages: action.data.data
      });
    case ActionTypes.SET_DOCUMENT_VIEW:
      return Object.assign({}, state, {
        documentView: action.viewType
      });
    case ActionTypes.SET_DOCUMENT_SORT:
      return Object.assign({}, state, {
        documentSort: action.sortType
      });
    case ActionTypes.LOAD_MEMORY_CONSUMED:
      return Object.assign({}, state, {
        memoryConsumed: action.memoryConsumed,
        totalMemory: action.totalMemory
      });
    case ActionTypes.SET_PARENT_FOLDER:
      return Object.assign({}, state, {
        parentFolderId: action.folderId
      });
    case ActionTypes.TOGGLE_ADD_NEW_MENU:
      return Object.assign({}, state, {
        isAddNewMenuOpen: !state.isAddNewMenuOpen
      });
    default:
      return state;
  }
};
export default dashboard;
