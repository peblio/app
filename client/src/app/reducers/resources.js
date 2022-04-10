import * as ActionTypes from '../constants/reduxConstants';

const initialState = {
  tagName: '',
  pebls: [],
  totalPebls: 0
};

const resources = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_TAG_NAME:
      return {
        ...state,
        tagName: action.tagName
      };

    case ActionTypes.SET_RESOURCES_PEBLS:
      return Object.assign({}, state, {
        pebls: state.pebls.concat(action.value)
      });

    case ActionTypes.SET_RESOURCES_TOTAL_PEBLS:
      return Object.assign({}, state, {
        totalPebls: action.value
      });

    default:
      return state;
  }
};

export default resources;
