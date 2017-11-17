import * as ActionTypes from '../constants.jsx';
const initialState = {
  pageTitle: '',
  id: ''
}

const mainToolbar = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.SET_PAGE_TITLE:
      return Object.assign({}, state, { pageTitle: action.event.target.value });

    case ActionTypes.SET_PAGE_ID:
      console.log(action);
      return Object.assign({}, state, { id: action.id });

    case ActionTypes.SET_DB_PAGE:
      return Object.assign({}, state, {
        id: action.id,
        pageTitle: action.title
      });
  
    default:
      return state;
  }
};

export default mainToolbar;
