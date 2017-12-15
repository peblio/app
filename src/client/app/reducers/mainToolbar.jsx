import * as ActionTypes from '../constants.jsx';
const initialState={
  pageTitle: '',
  id: '',
  pages: [],
  isPagesModalOpen: false,
  isLoginModalOpen: false,
  isSignUpModalOpen: false
}

const mainToolbar=(state=initialState, action)=> {
  switch (action.type) {

    case ActionTypes.SET_PAGE_TITLE:
      return Object.assign({}, state, {
        pageTitle: action.event.target.value
      });

    case ActionTypes.SET_PAGE_ID:
      console.log(action);
      return Object.assign({}, state, {
        id: action.id
      });

    case ActionTypes.SET_DB_PAGE:
      return Object.assign({}, state, {
        id: action.id,
        pageTitle: action.title
      });

    case ActionTypes.SET_ALL_PAGES:
      console.log(action);
      return Object.assign({}, state, {
        pages: action.pages
      })

    case ActionTypes.VIEW_PAGES_MODAL:
      return Object.assign({}, state, {
        isPagesModalOpen: true
      })

    case ActionTypes.CLOSE_PAGES_MODAL:
      return Object.assign({}, state, {
        isPagesModalOpen: false
      })

    case ActionTypes.VIEW_LOGIN_MODAL:
      return Object.assign({}, state, {
        isLoginModalOpen: true
      })

    case ActionTypes.CLOSE_LOGIN_MODAL:
      return Object.assign({}, state, {
        isLoginModalOpen: false
      })

    case ActionTypes.VIEW_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        isSignUpModalOpen: true
      })

    case ActionTypes.CLOSE_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        isSignUpModalOpen: false
      })

    default:
      return state;
  }
};

export default mainToolbar;
