import * as ActionTypes from '../constants.jsx';
const initialState={
  name: '',
  loginName: '',
  loginPassword: ''
}

const user=(state=initialState, action)=> {
  switch (action.type) {

    case ActionTypes.UPDATE_USER_NAME:
      return Object.assign({}, state, {
        loginName: action.event.target.value 
      });

    case ActionTypes.UPDATE_USER_PASSWORD:
      return Object.assign({}, state, {
        loginPassword: action.event.target.value 
      });

    case ActionTypes.SET_USER_NAME:
      console.log(action.name);
      return Object.assign({}, state, {
        name: action.name 
      });

    default:
      return state;
  }
};

export default user;
