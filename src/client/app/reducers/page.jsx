import * as ActionTypes from '../constants.jsx';

const initialState = {
  pageTitle: '',
  parentId: '',
  id: '',
  pages: [],
  unsavedChanges: false
};

const page = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.DELETE_PAGE:
      {
        const pages = state.pages.filter(id => id.id !== action.id);
        return Object.assign({}, state, {
          pages
        });
      }

    case ActionTypes.SET_PAGE_TITLE:
      return Object.assign({}, state, {
        pageTitle: action.event.target.value
      });

    case ActionTypes.SET_PAGE_ID:
      return Object.assign({}, state, {
        id: action.id
      });

    case ActionTypes.SET_DB_PAGE:
      return Object.assign({}, state, {
        id: action.id,
        pageTitle: action.title
      });

    case ActionTypes.SET_ALL_PAGES:
      return Object.assign({}, state, {
        pages: action.pages
      });

    case ActionTypes.SET_UNSAVED_CHANGES:
      return Object.assign({}, state, {
        unsavedChanges: action.value
      });

    default:
      return state;
  }
};

export default page;
