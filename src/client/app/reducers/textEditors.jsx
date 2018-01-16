import { EditorState, convertFromRaw } from 'draft-js';
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
  Object.keys(textEditorsRaw).forEach((id) => {
    newTextEditors[id] = {};
    newTextEditors[id].id = textEditorsRaw[id].id;
    newTextEditors[id].editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(textEditorsRaw[id].rawContentState))
    );
    newTextEditors[id].x = textEditorsRaw[id].x;
    newTextEditors[id].y = textEditorsRaw[id].y;
    newTextEditors[id].width = textEditorsRaw[id].width;
    newTextEditors[id].height = textEditorsRaw[id].height;
    newTextEditors[id].minWidth = textEditorsRaw[id].minWidth;
    newTextEditors[id].minHeight = textEditorsRaw[id].minHeight;
  });
  return newTextEditors;
}

const textEditors = (state = initialState, action) => {
  const textEditorsCopy = { ...state.textEditors };

  switch (action.type) {

    case ActionTypes.ADD_TEXT_EDITOR:
      {
        const newTextEditorId = `text-editor-${state.indexTextEditor}`;
        const newTextEditorState = EditorState.createEmpty();
        return {
          ...state,
          textEditors: {
            ...state.textEditors,
            newTextEditorId: {
              id: newTextEditorId,
              editorState: newTextEditorState,
              x: 0,
              y: 0,
              width: 350,
              height: 100,
              minWidth: 350,
              minHeight: 100
            }
          },
          indexTextEditor: state.indexTextEditor + 1
        };
      }

    case ActionTypes.UPDATE_TEXT_CHANGE:
      // debugger;
      if (document.activeElement.parentElement.parentElement &&
          document.activeElement.parentElement.parentElement.classList.value.localeCompare('DraftEditor-root') === 0) {
        const tempId = document.activeElement.parentElement.parentElement.parentElement.id;
        textEditorsCopy[tempId].editorState = action.state;
        return Object.assign({}, state, {
          currentTextEditorState: action.state,
          textEditors: textEditorsCopy,
          currentTextEditorId: tempId
        });
      }
      textEditorsCopy[state.currentTextEditorId].editorState = action.state;
      return {
        ...state,
        currentTextEditorState: action.state,
        textEditors: textEditorsCopy
      };


    case ActionTypes.SET_CURRENT_TEXT_EDITOR:
      return Object.assign({}, state, {
        currentTextEditorId: action.id,
        currentTextEditorState: action.state,
      });

    case ActionTypes.REMOVE_TEXT_EDITOR:
      delete textEditorsCopy[action.id];
      return {
        ...state,
        textEditors: textEditorsCopy
      };

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
      return {
        ...state,
        textEditors: textEditorsCopy
      };

    case ActionTypes.SET_TEXT_EDITOR_SIZE:
      textEditorsCopy[state.currentTextEditorId].width = action.width;
      textEditorsCopy[state.currentTextEditorId].height = action.height;
      return {
        ...state,
        textEditors: textEditorsCopy
      };

    default:
      return state;
  }
};

export default textEditors;
