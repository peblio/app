import reduceReducers from 'reduce-reducers';

import * as ActionTypes from '../constants/reduxConstants.js';
import { namespaceReducer } from '../utils/namespace-redux';
import foldersReducer, { initialState as foldersInitialState } from './folders';

const initialState = {
  ...foldersInitialState,
  isOwner: false,
  name: '',
  blurb: 'Hi! I <3 CS',
  image: 'https://placekitten.com/300/300',
  type: ''
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_OWNER:
      return Object.assign({}, state, {
        isOwner: action.value
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

export default reduceReducers(
  profile,
  namespaceReducer(foldersReducer, 'PROFILE_FOLDERS')
);
