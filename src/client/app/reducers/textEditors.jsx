import * as ActionTypes from '../constants.jsx';
import {EditorState} from 'draft-js';
import { convertFromRaw, convertToRaw } from 'draft-js';


const initialState = {
  textEditors: {},
  currentTextEditorId: 'text-editor-0',
  currentTextEditorState: null,
  indexTextEditor: 0,
  styleMap: {
    FONT: {
      fontSize: '54pt',
    },
  }
}

const textEditors = (state = initialState, action) => {
  let textEditors = copyTextEditors(state.textEditors);
  let tempTest = EditorState.createEmpty();

  switch (action.type) {

    case ActionTypes.ADD_TEXT_EDITOR:
      let newTextEditorId = 'text-editor-' + state.indexTextEditor;
      let newTextEditorState = EditorState.createEmpty();
      let newTextEditor = {
        id: newTextEditorId,
        editorState: newTextEditorState,
        x: 0,
        y: 0,
        width: 350,
        height: 150
      };
      textEditors[newTextEditorId]= newTextEditor;
      return Object.assign({}, state, {
        textEditors: textEditors,
        indexTextEditor: state.indexTextEditor + 1,
      });

    case ActionTypes.UPDATE_TEXT_CHANGE:
      // debugger;
      if (document.activeElement.parentElement.parentElement.classList.value.localeCompare('DraftEditor-root')==0) {
        let tempId = document.activeElement.parentElement.parentElement.parentElement.id;
        textEditors[tempId].editorState = action.state;
        return Object.assign({}, state, {
          currentTextEditorState: action.state,
          textEditors: textEditors,
          currentTextEditorId: tempId
        });
      } else {
        textEditors[state.currentTextEditorId].editorState = action.state;
        return Object.assign({}, state, {
          currentTextEditorState: action.state,
          textEditors: textEditors
        });
      }

    case ActionTypes.SET_CURRENT_TEXT_EDITOR:
      return Object.assign({}, state, {
        currentTextEditorId: action.id,
        currentTextEditorState: action.state,
      });

    case ActionTypes.REMOVE_TEXT_EDITOR:
      delete textEditors[action.id];
      return Object.assign({}, state, {
        textEditors: textEditors
      });

    case ActionTypes.SET_DB_TEXT_EDITORS:
      let convertedTextEditors = convertContentState(action.textEditors);
      return Object.assign({}, state, {
        textEditors: convertedTextEditors,
        indexTextEditor: action.indexTextEditor
      });

    case ActionTypes.SET_TEXT_EDITOR_POSITION:
      textEditors[state.currentTextEditorId].x = action.x;
      textEditors[state.currentTextEditorId].y = action.y;
      return Object.assign({}, state, {
        textEditors: textEditors
      });

    case ActionTypes.SET_TEXT_EDITOR_SIZE:
      textEditors[state.currentTextEditorId].width = action.width;
      textEditors[state.currentTextEditorId].height = action.height;
      return Object.assign({}, state, {
        textEditors: textEditors
      });

    default:
      return state;
  }
};

function convertContentState(textEditorsRaw) {
  let newTextEditors = {};
  let ids = Object.keys(textEditorsRaw);
  ids.forEach((id) => {
    newTextEditors[id] = {};
    newTextEditors[id].id = textEditorsRaw[id].id;
    newTextEditors[id].editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(textEditorsRaw[id].rawContentState)));
    newTextEditors[id].x = textEditorsRaw[id].x;
    newTextEditors[id].y = textEditorsRaw[id].y;
    newTextEditors[id].width = textEditorsRaw[id].width;
    newTextEditors[id].height = textEditorsRaw[id].height;
  });
  return newTextEditors;
}

function copyTextEditors(textEditors) {
  let newTextEditors = {};
  let ids = Object.keys(textEditors);
  ids.forEach((id) => {
    newTextEditors[id] = {};
    newTextEditors[id].id = textEditors[id].id;
    newTextEditors[id].editorState = textEditors[id].editorState;
    newTextEditors[id].x = textEditors[id].x;
    newTextEditors[id].y = textEditors[id].y;
    newTextEditors[id].width = textEditors[id].width;
    newTextEditors[id].height = textEditors[id].height;
  });
  return newTextEditors;
}

export default textEditors;
