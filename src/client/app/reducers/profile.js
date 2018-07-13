import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  isOwner: false,
  name: '',
};

const profile = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.SET_IS_OWNER:
      return Object.assign({}, state, {
        isOwner: action.value
      });

    case ActionTypes.SET_PROFILE_NAME:
      return Object.assign({}, state, {
        name: action.value
      });

    case ActionTypes.SET_PROFILE_PEBLS:
      return Object.assign({}, state, {
        pebls: action.value
      });

    case ActionTypes.SET_PROFILE_FOLDERS:
      return Object.assign({}, state, {
        folders: action.value
      });


    default:
      return state;
  }
};

export default profile;
