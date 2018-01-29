import { EditorState, convertFromRaw } from 'draft-js';
import * as ActionTypes from '../constants.jsx';
import * as Code from '../codeConstants.jsx';

const initialState = {
  editors: {},
  editorIndex: 0
};

let stack = [];

// Deep copy
const updateIndices = (editors) => {
  stack.forEach((id, index) => { editors[id].index = index; });
  return editors;
};

const editorsReducer = (state = initialState, action) => {
  if (action.hasOwnProperty('id') && !state.editors.hasOwnProperty(action.id)) {
    return state;
  }

  // deep copy
  const editors = {};
  Object.keys(state.editors).forEach((id) => {
    if (state.editors[id].type === 'text') editors[id] = { ...state.editors[id] };
    else editors[id] = JSON.parse(JSON.stringify(state.editors[id])); // Quicker than spread.
  });

  switch (action.type) {
    /** ALL */
    case ActionTypes.SET_DB_EDITORS: {
      const newEditors = {};
      stack = Object.keys(action.editors); // An array of keys
      stack.forEach((id) => {
        if (action.editors[id].type === 'text') {
          const { rawContentState, ...newEditor } = action.editors[id];
          newEditor.editorState = EditorState.createWithContent(
            convertFromRaw(JSON.parse(rawContentState))
          );
          newEditors[id] = newEditor;
        } else newEditors[id] = action.editors[id];
      });
      stack.sort((e1, e2) => newEditors[e1].index - newEditors[e2].index);
      return { editors: newEditors, editorIndex: action.editorIndex };
    }

    case ActionTypes.SET_CURRENT_EDITOR: {
      if (editors[action.id].index === stack.length - 1) {
        // It's not already current
        return state;
      }
      const id = stack.splice(stack.indexOf(action.id), 1)[0];
      stack.push(id);
      return { ...state, editors: updateIndices(editors) };
    }

    case ActionTypes.REMOVE_EDITOR:
      stack.splice(stack.indexOf(action.id), 1);
      delete editors[action.id];
      return { ...state, editors: updateIndices(editors) };

    case ActionTypes.SET_EDITOR_POSITION:
      editors[action.id].x = action.x;
      editors[action.id].y = action.y;
      return { ...state, editors };

    case ActionTypes.SET_EDITOR_SIZE:
      editors[action.id].width = action.width;
      editors[action.id].height = action.height;
      return { ...state, editors };

    /** CODE EDITOR */
    case ActionTypes.ADD_CODE_EDITOR: {
      const id = `editor-${state.editorIndex}`;
      editors[id] = {
        type: 'code',
        id,
        index: stack.length,
        consoleOutputText: [],
        currentFile: 1,
        files: Code.FILES.p5,
        isPlaying: false,
        isRefreshing: false,
        editorMode: 'p5',
        x: 0,
        y: 0,
        width: 500,
        height: 300,
        minWidth: 500,
        minHeight: 300
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      return { editors, editorIndex };
    }

    case ActionTypes.PLAY_CODE:
      editors[action.id].isPlaying = true;
      return { ...state, editors };

    case ActionTypes.STOP_CODE:
      editors[action.id].isPlaying = false;
      editors[action.id].consoleOutputText = [];
      return { ...state, editors };

    case ActionTypes.START_CODE_REFRESH:
      editors[action.id].isRefreshing = true;
      return { ...state, editors };

    case ActionTypes.STOP_CODE_REFRESH:
      editors[action.id].isRefreshing = false;
      return { ...state, editors };

    case ActionTypes.SET_EDITOR_MODE:
      editors[action.id].editorMode = action.value;
      return { ...state, editors };

    case ActionTypes.UPDATE_CONSOLE_OUTPUT: {
      const tempOutput = editors[action.id].consoleOutputText.slice();
      if (action.event.data.arguments) {
        tempOutput.push(action.event.data.arguments.join());
      }
      editors[action.id].consoleOutputText = tempOutput;
      return { ...state, editors };
    }

    case ActionTypes.CLEAR_CONSOLE_OUTPUT: {
      editors[action.id].consoleOutputText = [];
      return { ...state, editors };
    }

    case ActionTypes.UPDATE_FILE: {
      editors[action.id].files[action.index].content = action.content;
      return Object.assign({}, state, {
        editors
      });
    }

    case ActionTypes.SET_CURRENT_FILE: {
      editors[action.id].currentFile = action.index;
      return Object.assign({}, state, {
        editors
      });
    }

    /** TEXT EDITOR */
    case ActionTypes.ADD_TEXT_EDITOR: {
      const id = `editor-${state.editorIndex}`;
      editors[id] = {
        type: 'text',
        id,
        index: stack.length,
        editorState: EditorState.createEmpty(),
        x: 0,
        y: 0,
        width: 500,
        height: 100,
        minWidth: 350,
        minHeight: 100
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      return { editors, editorIndex };
    }

    case ActionTypes.UPDATE_TEXT_CHANGE:
      editors[action.id].editorState = action.state;
      return { ...state, editors };

    /** IFRAME */
    case ActionTypes.ADD_IFRAME: {
      const id = `editor-${state.editorIndex}`;
      editors[id] = {
        type: 'iframe',
        id,
        index: stack.length,
        url: '',
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        minWidth: 400,
        minHeight: 300,
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      return { editors, editorIndex };
    }

    case ActionTypes.SET_IFRAME_URL:
      editors[action.id].url = action.url;
      return { ...state, editors };

    default:
      return state;
  }
};

export default editorsReducer;
