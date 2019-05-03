import reduceReducers from 'reduce-reducers';

import * as ActionTypes from '../constants/reduxConstants.js';
import { namespaceReducer } from '../utils/namespace-redux';
import foldersReducer, { initialState as foldersInitialState } from './folders';
import userReducer, { initialState as userInitialState } from './user';

const initialState = {
  ...foldersInitialState,
  name: '',
  blurb: 'Hi! I <3 CS',
  image: 'https://placekitten.com/300/300',
  type: ''
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
      };
    }

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default reduceReducers(
  namespaceReducer(foldersReducer, 'PROFILE_FOLDERS')
);
