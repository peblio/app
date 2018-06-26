import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  isOwner: false,
  name: '',
  image: 'https://placekitten.com/300/300',
  description: '',
  folders: [],
  pebls: []
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

    case ActionTypes.SET_PROFILE_IMAGE:
      return Object.assign({}, state, {
        image: action.value
      });

    case ActionTypes.SET_PROFILE_DESC:
      return Object.assign({}, state, {
        description: action.value
      });

    default:
      return state;
  }
};

export default profile;
