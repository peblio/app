import * as ActionTypes from '../constants.jsx';
import {EditorState} from 'draft-js';

const initialState = {
  textEditors: {},
  currentTextEditorId: 'text-editor-0',
  currentTextEditorState: null,
  noOfTextEditors: 0,
}

const textEditors = (state = initialState, action) => {
  let textEditors = copyTextEditors(state.textEditors);
  let tempTest = EditorState.createEmpty();

  switch (action.type) {

    case ActionTypes.ADD_TEXT_EDITOR:
      let newTextEditorId = 'text-editor-' + state.noOfTextEditors;
      let newTextEditorState = EditorState.createEmpty();
      let newTextEditor = {
        id: newTextEditorId,
        editorState: newTextEditorState
      };
      textEditors[newTextEditorId]= newTextEditor;
      return Object.assign({}, state, {
        textEditors: textEditors,
        noOfTextEditors: state.noOfTextEditors + 1
      });

    case ActionTypes.UPDATE_TEXT_CHANGE:
      // debugger;
      let tempId = document.activeElement.parentElement.parentElement.parentElement.id;
      textEditors[tempId].editorState = action.state;
      return Object.assign({}, state, {
        currentTextEditorState: action.state,
        textEditors: textEditors,
        currentTextEditorId: tempId
      });

    default:
      return state;
  }
};

function copyTextEditors(textEditors) {
  let newTextEditors = {};
  let ids = Object.keys(textEditors);
  ids.forEach((id) => {
    newTextEditors[id] = {};
    newTextEditors[id].id = textEditors[id].id;
    newTextEditors[id].editorState = textEditors[id].editorState;
  });
  return newTextEditors;
}

export default textEditors;
