import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  showForkWarning: true
};

const preferences = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.UPDATE_SHOW_FORK_WARNING:
      return Object.assign({}, state, {
        showForkWarning: action.value
      });

    case ActionTypes.SET_USER_PREFERENCES:
      return Object.assign({}, state, {
        showForkWarning: action.data.forkWarning
      });

    default:
      return state;
  }
};

export default preferences;
