import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  isOwner: false,
  name: '',
  blurb: 'Hi! I <3 CS',
  image: 'https://placekitten.com/300/300',
  type: '',
  pebls: [],
  folders: []
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PROFILE: {
      return {
        ...state,
        name: action.data.name,
        type: action.data.type,
        image: action.data.image,
        blurb: action.data.blurb,
        isOwner: action.data.isOwner
      };
    }

    case ActionTypes.SET_IS_OWNER:
      return Object.assign({}, state, {
        isOwner: action.value
      });

    case ActionTypes.SET_PROFILE_BLURB:
      return Object.assign({}, state, {
        blurb: action.value
      });

    case ActionTypes.SET_PROFILE_IMAGE:
      return Object.assign({}, state, {
        image: action.value
      });

    case ActionTypes.SET_PROFILE_PEBLS:
      return Object.assign({}, state, {
        pebls: action.value
      });

    case ActionTypes.SET_PROFILE_FOLDERS:
      return Object.assign({}, state, {
        folders: action.value
      });

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default profile;
