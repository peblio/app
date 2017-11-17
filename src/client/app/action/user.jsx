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

export function setUserName(name) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_NAME,
      name
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

export function loginUser(event, name, password){
  let userName;
  axios.post('/login', {
    name: name,
    password: password
  })
    .then(function(response) {
      console.log(response);
      window.location.href= window.location.origin;
    })
    .catch(function(error) { // eslint-disable-line
        console.log(error);
    });
  event.preventDefault();
  return(dispatch) => {
    dispatch({
      type: ActionTypes.LOGIN_USER
    });
  };
}
