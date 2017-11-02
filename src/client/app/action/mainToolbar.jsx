import * as ActionTypes from '../constants.jsx';
import axios from 'axios';
import shortid from 'shortid';
import { convertFromRaw, convertToRaw } from 'draft-js';


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

export function submitPage(title,editors,indexEditor,textEditors,indexTextEditor) {
  let textEditorsRaw = convertEditorState(textEditors);
  axios.post('/save', {
      id: shortid.generate(),
      title: title,
      editors: editors,
      indexEditor: indexEditor,
      textEditors: textEditorsRaw,
      indexTextEditor: indexTextEditor
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
      title,
      editors,
      indexEditor
    });
  };
}

function convertEditorState(textEditors) {
  let newTextEditors = {};
  let ids = Object.keys(textEditors);
  ids.forEach((id) => {
    newTextEditors[id] = {};
    newTextEditors[id].id = textEditors[id].id;
    newTextEditors[id].rawContentState = JSON.stringify(convertToRaw(textEditors[id].editorState.getCurrentContent()));
  });
  return newTextEditors;
}
