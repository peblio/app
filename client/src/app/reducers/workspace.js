import { EditorState, convertFromRaw } from 'draft-js';
import * as ActionTypes from '../constants/reduxConstants.js';
import * as Code from '../constants/codeConstants.js';

const DEFAULT_WORKSPACE_MODE = 'p5';
const initialState = {
  isWorkspaceOpen: false,
  workspace: {
    consoleOutputText: [],
    currentFile: Code.STARTFILE[DEFAULT_WORKSPACE_MODE],
    files: Code.FILES[DEFAULT_WORKSPACE_MODE],
    isPlaying: false,
    isRefreshing: false,
    editorMode: DEFAULT_WORKSPACE_MODE,
    innerWidth: 100,
    innerHeight: 160
  }
};

const workspaceReducer = (state = initialState, action) => {
  // deep copy
  let workspace = {};
  workspace = JSON.parse(JSON.stringify(state.workspace)); // Quicker than spread.
  switch (action.type) {
    case ActionTypes.WP_PLAY_CODE:
      workspace.isPlaying = true;
      return { ...state, workspace };

    case ActionTypes.WP_STOP_CODE:
      workspace.isPlaying = false;
      return { ...state, workspace };

    case ActionTypes.WP_START_CODE_REFRESH:
      workspace.isRefreshing = true;
      return { ...state, workspace };

    case ActionTypes.WP_STOP_CODE_REFRESH:
      workspace.isRefreshing = false;
      return { ...state, workspace };

    case ActionTypes.WP_SET_EDITOR_MODE:
      workspace.editorMode = action.value;
      return { ...state, workspace };

    case ActionTypes.WP_UPDATE_CONSOLE_OUTPUT: {
      // debugger;
      const tempOutput = workspace.consoleOutputText.slice();
      if (action.event.data.arguments && (action.event.data.id === action.id)) {
        tempOutput.push(action.event.data.arguments.join());
      }
      workspace.consoleOutputText = tempOutput;
      return { ...state, workspace };
    }

    case ActionTypes.WP_CLEAR_CONSOLE_OUTPUT: {
      workspace.consoleOutputText = initialState.workspace.consoleOutputText;
      return { ...state, workspace };
    }

    case ActionTypes.WP_UPDATE_FILE: {
      const tempFiles = state.workspace.files;
      tempFiles[action.index].content = action.content;
      workspace.files = tempFiles;
      return Object.assign({}, state, {
        workspace
      });
    }

    case ActionTypes.WP_SET_CURRENT_FILE: {
      workspace.currentFile = action.index;
      return { ...state, workspace };
    }

    case ActionTypes.WP_SET_INNER_WIDTH: {
      workspace.innerWidth = action.value;
      return { ...state, workspace };
    }

    case ActionTypes.WP_SET_INNER_HEIGHT: {
      workspace.innerHeight = action.value;
      return { ...state, workspace };
    }

    case ActionTypes.LOAD_WORKSPACE:
      console.log(action.workspace);
      return Object.assign({}, state, {
        workspace: action.workspace
      });

    default:
      return state;
  }
};

export default workspaceReducer;
