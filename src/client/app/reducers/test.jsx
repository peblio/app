import * as ActionTypes from '../constants.jsx';
const initialState = {
  isVisible: false
}

const test = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MAKE_VISIBLE:
      return Object.assign({}, state, { isVisible: !state.isVisible });
    default:
      return state;
  }
};

export default test;
