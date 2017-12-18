import { EditorState } from 'draft-js';
import { convertFromRaw } from 'draft-js';
import * as ActionTypes from '../constants.jsx';

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
};

function convertContentState(textEditorsRaw) {
  const newTextEditors = {};
  const ids = Object.keys(textEditorsRaw);
  ids.forEach((id) => {
    newTextEditors[id] = {};
    newTextEditors[id].id = textEditorsRaw[id].id;
    newTextEditors[id].editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(textEditorsRaw[id].rawContentState))
    );
    newTextEditors[id].x = textEditorsRaw[id].x;
    newTextEditors[id].y = textEditorsRaw[id].y;
    newTextEditors[id].width = textEditorsRaw[id].width;
    newTextEditors[id].height = textEditorsRaw[id].height;
  });
  return newTextEditors;
}

function copyTextEditors(textEditors) {
  const newTextEditors = {};
  const ids = Object.keys(textEditors);
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

const textEditors = (state = initialState, action) => {
  const textEditorsCopy = copyTextEditors(state.textEditors);

  switch (action.type) {

    case ActionTypes.ADD_TEXT_EDITOR:
      {
        const newTextEditorId = `text-editor-${state.indexTextEditor}`;
        const newTextEditorState = EditorState.createEmpty();
        const newTextEditor = {
          id: newTextEditorId,
          editorState: newTextEditorState,
          x: 0,
          y: 0,
          width: 350,
          height: 150
        };
        textEditorsCopy[newTextEditorId] = newTextEditor;
        return Object.assign({}, state, {
          textEditors: textEditorsCopy,
          indexTextEditor: state.indexTextEditor + 1,
        });
      }

    case ActionTypes.UPDATE_TEXT_CHANGE:
      // debugger;
      if (document.activeElement.parentElement.parentElement.classList.value.localeCompare('DraftEditor-root') === 0) {
        const tempId = document.activeElement.parentElement.parentElement.parentElement.id;
        textEditorsCopy[tempId].editorState = action.state;
        return Object.assign({}, state, {
          currentTextEditorState: action.state,
          textEditors: textEditorsCopy,
          currentTextEditorId: tempId
        });
      }
      textEditorsCopy[state.currentTextEditorId].editorState = action.state;
      return Object.assign({}, state, {
        currentTextEditorState: action.state,
        textEditors: textEditorsCopy
      });


    case ActionTypes.SET_CURRENT_TEXT_EDITOR:
      return Object.assign({}, state, {
        currentTextEditorId: action.id,
        currentTextEditorState: action.state,
      });

    case ActionTypes.REMOVE_TEXT_EDITOR:
      delete textEditorsCopy[action.id];
      return Object.assign({}, state, {
        textEditors: textEditorsCopy
      });

    case ActionTypes.SET_DB_TEXT_EDITORS:
      {
        const convertedTextEditors = convertContentState(action.textEditors);
        return Object.assign({}, state, {
          textEditors: convertedTextEditors,
          indexTextEditor: action.indexTextEditor
        });
      }

    case ActionTypes.SET_TEXT_EDITOR_POSITION:
      textEditorsCopy[state.currentTextEditorId].x = action.x;
      textEditorsCopy[state.currentTextEditorId].y = action.y;
      return Object.assign({}, state, {
        textEditors: textEditorsCopy
      });

    case ActionTypes.SET_TEXT_EDITOR_SIZE:
      textEditorsCopy[state.currentTextEditorId].width = action.width;
      textEditorsCopy[state.currentTextEditorId].height = action.height;
      return Object.assign({}, state, {
        textEditors: textEditorsCopy
      });

    default:
      return state;
  }
};

export default textEditors;
