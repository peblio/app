import * as ActionTypes from '../constants.jsx';
import axios from 'axios';
import shortid from 'shortid';

export function setPageTitle(event) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_PAGE_TITLE,
      event
    });
  };
}

export function setDBPageTitle(value) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_PAGE_TITLE,
      value
    });
  };
}

export function submitPage(value) {
  axios.post('/save', {
      id: shortid.generate(),
      title: value,
    })
      .then(function(response) { // eslint-disable-line
        console.log(response);
      })
      .catch(function(error) { // eslint-disable-line
        console.log('Error  : ' + error);
      });
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SUBMIT_PAGE,
      value
    });
  };
}
