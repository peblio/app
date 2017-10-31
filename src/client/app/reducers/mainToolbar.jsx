import * as ActionTypes from '../constants.jsx';
const initialState = {
  pageTitle: ''
}

const mainToolbar = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.SET_PAGE_TITLE:
      return Object.assign({}, state, { pageTitle: action.event.target.value });

    default:
      return state;
  }
};

export default mainToolbar;
