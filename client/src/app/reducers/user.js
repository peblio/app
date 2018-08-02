import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  name: '',
  blurb: 'Hi! I <3 CS',
  loginName: '',
  loginPassword: '',
  canView: true,
  canEdit: true,
  image: 'https://placekitten.com/300/300',
  type: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.UPDATE_USER_NAME:
      return Object.assign({}, state, {
        loginName: action.event.target.value
      });

    case ActionTypes.SET_USER_BLURB:
      return Object.assign({}, state, {
        blurb: action.value
      });

    case ActionTypes.UPDATE_USER_PASSWORD:
      return Object.assign({}, state, {
        loginPassword: action.event.target.value
      });

    case ActionTypes.SET_USER_NAME:
      return Object.assign({}, state, {
        name: action.name
      });

    case ActionTypes.SET_EDIT_ACCESS:
      return Object.assign({}, state, {
        canEdit: action.value
      });

    case ActionTypes.SET_USER_TYPE:
      return Object.assign({}, state, {
        type: action.value
      });

    case ActionTypes.SET_USER_IMAGE:
      return Object.assign({}, state, {
        image: action.value
      });

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default user;
