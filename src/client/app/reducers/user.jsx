import * as ActionTypes from '../constants.jsx';
const initialState = {
  name: '',
  password: ''
}

const user = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.UPDATE_USER_NAME:
      return Object.assign({}, state, { name: action.event.target.value });

    case ActionTypes.UPDATE_USER_PASSWORD:
      return Object.assign({}, state, { password: action.event.target.value });

    default:
      return state;
  }
};

export default user;
