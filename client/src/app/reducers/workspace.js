import { EditorState, convertFromRaw } from 'draft-js';
import * as ActionTypes from '../constants/reduxConstants.js';
import * as Code from '../constants/codeConstants.js';
import * as Page from '../constants/pageConstants.js';

const initialState = {
  isWorkspaceOpen: true,
  isShareWorkspaceOpen: false,
  workspace: Page.DEFAULT_WORKSPACE_MODE
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
      workspace.currentFile = Code.STARTFILE[action.value];
      workspace.files = Code.FILES[action.value];
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

    case ActionTypes.LOAD_WORKSPACE:
      console.log(action.workspace);
      return Object.assign({}, state, {
        workspace: action.workspace
      });

    case ActionTypes.TOGGLE_WORKSPACE:
      return Object.assign({}, state, {
        isWorkspaceOpen: !state.isWorkspaceOpen
      });

    case ActionTypes.OPEN_SHARE_WORKSPACE:
      return Object.assign({}, state, {
        isShareWorkspaceOpen: true
      });

    case ActionTypes.CLOSE_SHARE_WORKSPACE:
      return Object.assign({}, state, {
        isShareWorkspaceOpen: false
      });

    default:
      return state;
  }
};

export default workspaceReducer;
