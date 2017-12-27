import axios from 'axios';
import shortid from 'shortid';
import { convertToRaw } from 'draft-js';
import * as ActionTypes from '../constants.jsx';

function convertEditorState(textEditors) {
  const newTextEditors = {};
  const ids = Object.keys(textEditors);
  ids.forEach((id) => {
    newTextEditors[id] = {};
    newTextEditors[id].id = textEditors[id].id;
    newTextEditors[id].rawContentState = JSON.stringify(convertToRaw(textEditors[id].editorState.getCurrentContent()));
    newTextEditors[id].x = textEditors[id].x;
    newTextEditors[id].y = textEditors[id].y;
    newTextEditors[id].width = textEditors[id].width;
    newTextEditors[id].height = textEditors[id].height;
    newTextEditors[id].minWidth = textEditors[id].minWidth;
    newTextEditors[id].minHeight = textEditors[id].minHeight;
  });
  return newTextEditors;
}

export function setPageTitle(event) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PAGE_TITLE,
      event
    });
  };
}

export function loadPage(id, title) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DB_PAGE,
      id,
      title
    });
  };
}

export function deletePage(page) {
  const id = page.page.id;
  axios.post('/pages/delete', {
    id
  })
  .then((response) => {
    console.log('deleted');
  })
  .catch(function(error) { // eslint-disable-line
    console.log(error);
  });
  return (dispatch) => {
    dispatch({
      type: ActionTypes.DELETE_PAGE,
      id
    });
  };
}

export function submitPage(parentId, title, editors, indexEditor, textEditors, indexTextEditor, iframes, indexIframe) {
  const id = shortid.generate();
  const textEditorsRaw = convertEditorState(textEditors);
  axios.post('/pages/save', {
    parentId,
    id,
    title,
    editors,
    indexEditor,
    textEditors: textEditorsRaw,
    indexTextEditor,
    iframes,
    indexIframe
  })
  .then(function(response) { // eslint-disable-line
    window.location.href = `${window.location.origin}/pebl/${id}`;
  })
  .catch(function(error) { // eslint-disable-line
    console.log(error);
  });
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PAGE_ID,
      id
    });
  };
}

export function updatePage(id, title, editors, indexEditor, textEditors, indexTextEditor, iframes, indexIframe) {
  const textEditorsRaw = convertEditorState(textEditors);
  axios.post('/pages/update', {
    id,
    title,
    editors,
    indexEditor,
    textEditors: textEditorsRaw,
    indexTextEditor,
    iframes,
    indexIframe
  })
      .then(function(response) { // eslint-disable-line
        console.log(response);
      })
      .catch(function(error) { // eslint-disable-line
        console.log(`Error  : ${error}`);
      });
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_PAGE,
      id
    });
  };
}

export function setAllPages(data) {
  const pages = data.map(page => ({ id: page.id, title: page.title }));
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ALL_PAGES,
      pages
    });
  };
}
