import * as ActionTypes from '../constants.jsx';
const initialState = {
  isPlaying: false,
  editors: {},
  currentEditorId: 'editor-0',
  noOfEditors: 0,
}

const editorContainer = (state = initialState, action) => {
  let editors = JSON.parse(JSON.stringify(state.editors));
  switch (action.type) {

    case ActionTypes.PLAY_CODE:
      editors[action.id].isPlaying = true;
      return Object.assign({}, state, { editors: editors });

    case ActionTypes.STOP_CODE:
      editors[state.currentEditorId].isPlaying = false;
      editors[state.currentEditorId].consoleOutputText = [];
      return Object.assign({}, state, { editors: editors });

    case ActionTypes.UPDATE_CODE:
      editors[state.currentEditorId].code = action.value;
      return Object.assign({}, state, { editors: editors });

    case ActionTypes.SET_CURRENT_EDITOR:
      return Object.assign({}, state, { currentEditorId: action.value });

    case ActionTypes.SET_EDITOR_MODE:
      console.log(action.value);
      editors[state.currentEditorId].editorMode = action.value;
      return Object.assign({}, state, { editors: editors });

    case ActionTypes.ADD_EDITOR:
      let newEditorId = 'editor-' + state.noOfEditors;
      let newEditor = {
        id: newEditorId,
        consoleOutputText: [],
        code: '',
        isPlaying: false,
        editorMode: 'p5'
      };
      editors[newEditorId]= newEditor;
      return Object.assign({}, state, {
        editors: editors,
        noOfEditors: state.noOfEditors + 1
      });

    case ActionTypes.UPDATE_CONSOLE_OUTPUT:
      const tempOutput = editors[state.currentEditorId].consoleOutputText.slice();
      tempOutput.push(action.event.data.arguments.join());
      editors[state.currentEditorId].consoleOutputText = tempOutput;
      return Object.assign({}, state, { editors: editors });

    default:
      return state;
  }
};

export default editorContainer;
