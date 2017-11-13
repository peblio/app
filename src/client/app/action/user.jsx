import * as ActionTypes from '../constants.jsx';
import axios from 'axios';


export function updateUserName(event) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_USER_NAME,
      event
    });
  };
}

export function updateUserPassword(event) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_USER_PASSWORD,
      event
    });
  };
}

export function signUserUp(name, password) {
  axios.post('/users/signup', {
      name: name,
      password: password
    })
      .then(function(response) { // eslint-disable-line
        console.log(response);
      })
      .catch(function(error) { // eslint-disable-line
        console.log(error);
      });
    event.preventDefault();
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SIGN_USER_UP
    });
  };
}
