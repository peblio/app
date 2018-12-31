import { EditorState, convertFromRaw } from 'draft-js';
import * as ActionTypes from '../constants/reduxConstants.js';
import * as Code from '../constants/codeConstants.js';
import {
  CODE_DEFAULT_INSIDE_WIDTH,
  QUESION_DEFAULT_INNER_HEIGHT,
  QUESION_MIN_INNER_HEIGHT
} from '../constants/widgetConstants.js';

const initialState = {
  editors: {},
  editorIndex: 0,
  currentWidget: ''
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

    case ActionTypes.SET_CURRENT_WIDGET: {
      return { ...state, currentWidget: action.id };
    }

    case ActionTypes.REMOVE_EDITOR:
      stack.splice(stack.indexOf(action.id), 1);
      delete editors[action.id];
      return { ...state, editors: updateIndices(editors) };

    case ActionTypes.DUPLICATE_EDITOR: {
      const originalEditor = state.editors[action.originalEditorId];
      let newEditor;
      if (originalEditor.type === 'text') {
        newEditor = { ...originalEditor };
      } else {
        newEditor = JSON.parse(JSON.stringify(originalEditor)); // Quicker than spread.
      }
      newEditor.id = action.duplicateEditorId;
      const editorIndex = state.editorIndex + 1;
      stack.push(newEditor.id);
      editors[newEditor.id] = newEditor;
      return { ...state, editors: updateIndices(editors), editorIndex };
    }

    /** CODE EDITOR */
    case ActionTypes.ADD_CODE_EDITOR: {
      const id = `editor-${state.editorIndex}`;
      editors[id] = {
        type: 'code',
        id,
        index: stack.length,
        consoleOutputText: [],
        currentFile: Code.STARTFILE[action.mode],
        files: Code.FILES[action.mode],
        isPlaying: false,
        isRefreshing: false,
        editorMode: action.mode,
        innerWidth: CODE_DEFAULT_INSIDE_WIDTH,
        editorView: 'split'
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      const currentWidget = id;
      return { editors, editorIndex, currentWidget };
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


    case ActionTypes.UPDATE_CONSOLE_OUTPUT: {
      const tempOutput = editors[action.id].consoleOutputText.slice();
      if (action.event.data.arguments && (action.event.data.id === action.id)) {
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

    case ActionTypes.VIEW_EDITOR_PREVIEW: {
      editors[action.id].currentFile = -1;
      return Object.assign({}, state, {
        editors
      });
    }

    case ActionTypes.SET_INNER_WIDTH: {
      editors[action.id].innerWidth = action.value;
      return Object.assign({}, state, {
        editors
      });
    }

    case ActionTypes.ADD_MEDIA_FILE: {
      editors[action.id].files.push({
        name: action.name,
        externalLink: action.link
      });
      return Object.assign({}, state, {
        editors
      });
    }

    case ActionTypes.SET_EDITOR_VIEW: {
      editors[action.id].editorView = action.value;
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
        backColor: 'transparent'
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      const currentWidget = id;
      return { editors, editorIndex, currentWidget };
    }

    case ActionTypes.UPDATE_TEXT_CHANGE:
      editors[action.id].editorState = action.state;
      return { ...state, editors };

    case ActionTypes.UPDATE_TEXT_BACK_COLOR:
      editors[action.id].backColor = action.color;
      return { ...state, editors };


    /** QUESTION EDITOR */
    case ActionTypes.ADD_QUESTION_EDITOR: {
      const id = `editor-${state.editorIndex}`;
      editors[id] = {
        type: 'question',
        id,
        index: stack.length,
        question: 'Enter question here ',
        answer: 'Enter answer here..',
        minHeight: QUESION_MIN_INNER_HEIGHT,
        innerHeight: QUESION_DEFAULT_INNER_HEIGHT
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      const currentWidget = id;
      return { editors, editorIndex, currentWidget };
    }

    case ActionTypes.SET_QUESTION_INNER_HEIGHT: {
      editors[action.id].innerHeight = action.value;
      return Object.assign({}, state, {
        editors
      });
    }

    case ActionTypes.UPDATE_QUESTION_CHANGE:
      editors[action.id].question = action.text;
      return { ...state, editors };

    case ActionTypes.UPDATE_ANSWER_CHANGE:
      editors[action.id].answer = action.text;
      return { ...state, editors };

    /** IFRAME */
    case ActionTypes.ADD_IFRAME: {
      const id = `editor-${state.editorIndex}`;
      editors[id] = {
        type: 'iframe',
        id,
        index: stack.length,
        url: 'https://peblio.github.io/instructions/embed.html'
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      const currentWidget = id;
      return { editors, editorIndex, currentWidget };
    }

    case ActionTypes.SET_IFRAME_URL:
      editors[action.id].url = action.url;
      return { ...state, editors };

    /** VIDEO */
    case ActionTypes.ADD_VIDEO: {
      const id = `editor-${state.editorIndex}`;
      editors[id] = {
        type: 'video',
        id,
        index: stack.length,
        url: 'https://peblio.github.io/instructions/video.html'
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      const currentWidget = id;
      return { editors, editorIndex, currentWidget };
    }

    case ActionTypes.SET_VIDEO_URL:
      editors[action.id].url = action.url;
      return { ...state, editors };

    /** IMAGE */
    case ActionTypes.ADD_IMAGE: {
      const id = `editor-${state.editorIndex}`;
      editors[id] = {
        type: 'image',
        id,
        index: stack.length,
        url: ''
      };
      stack.push(id);
      const editorIndex = state.editorIndex + 1;
      const currentWidget = id;
      return { editors, editorIndex, currentWidget };
    }

    case ActionTypes.SET_IMAGE_URL:
      editors[action.id].url = action.url;
      return { ...state, editors };

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default editorsReducer;
