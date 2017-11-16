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

export function setDBPage(id, title) {
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_PAGE,
      id,
      title
    });
  };
}

export function submitPage(title,editors,indexEditor,textEditors,indexTextEditor) {
  let id = shortid.generate();

  let textEditorsRaw = convertEditorState(textEditors);
  axios.post('/pages/save', {
      id: id,
      title: title,
      editors: editors,
      indexEditor: indexEditor,
      textEditors: textEditorsRaw,
      indexTextEditor: indexTextEditor
    })
      .then(function(response) { // eslint-disable-line
        console.log(response);
        console.log(id);
        window.location.href= window.location.origin + '/pages/' + id;
      })
      .catch(function(error) { // eslint-disable-line
        console.log('Error  : ' + error);
      });
  return(dispatch) => {
    dispatch({
      type: ActionTypes.SET_PAGE_ID,
      id
    });
  };
}

export function updatePage(id,title,editors,indexEditor,textEditors,indexTextEditor) {
  let textEditorsRaw = convertEditorState(textEditors);
  axios.post('/pages/update', {
      id: id,
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
        console.log("**");
        console.log('Error  : ' + error);
      });
  return(dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_PAGE,
      id
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
