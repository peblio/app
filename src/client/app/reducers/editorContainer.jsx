import * as ActionTypes from '../constants.jsx';
const initialState = {
  isPlaying: false,
  editors: {},
  currentEditorId: 'editor-0',
  indexEditor: 0
}

const defaultSketch = `function setup() {
  createCanvas(400, 400);
  console.log("drawing a canvas");
}
function draw() {
  background(220);
}`;

const editorContainer = (state = initialState, action) => {
  let editors = JSON.parse(JSON.stringify(state.editors));
  switch (action.type) {

    case ActionTypes.PLAY_CODE:
      editors[action.id].isPlaying = true;
      return Object.assign({}, state, {
        editors: editors
      });

    case ActionTypes.STOP_CODE:
      editors[state.currentEditorId].isPlaying = false;
      editors[state.currentEditorId].consoleOutputText = [];
      return Object.assign({}, state, {
        editors: editors
      });

    case ActionTypes.UPDATE_CODE:
      editors[state.currentEditorId].code = action.value;
      return Object.assign({}, state, {
        editors: editors
      });

    case ActionTypes.SET_CURRENT_EDITOR:
      return Object.assign({}, state, {
        currentEditorId: action.value
      });

    case ActionTypes.SET_EDITOR_MODE:
      editors[state.currentEditorId].editorMode = action.value;
      return Object.assign({}, state, {
        editors: editors
      });

    case ActionTypes.ADD_EDITOR:
      let newEditorId = 'editor-' + state.indexEditor;
      let newEditor = {
        id: newEditorId,
        consoleOutputText: [],
        code: defaultSketch,
        isPlaying: false,
        editorMode: 'p5',
        x: 0,
        y: 0,
        width: 200,
        height: 100
      };
      editors[newEditorId]= newEditor;
      return Object.assign({}, state, {
        editors: editors,
        indexEditor: state.indexEditor + 1,
        currentEditorId: newEditorId
      });

    case ActionTypes.UPDATE_CONSOLE_OUTPUT:
      const tempOutput = editors[state.currentEditorId].consoleOutputText.slice();
      tempOutput.push(action.event.data.arguments.join());
      editors[state.currentEditorId].consoleOutputText = tempOutput;
      return Object.assign({}, state, {
        editors: editors
      });

    case ActionTypes.REMOVE_EDITOR:
      delete editors[action.id];
      return Object.assign({}, state, {
        editors: editors
      });

    case ActionTypes.SET_DB_EDITORS:
      return Object.assign({}, state, {
        editors: action.editors,
        indexEditor: action.indexEditor
      });

    case ActionTypes.SET_EDITOR_POSITION:
      editors[state.currentEditorId].x = action.x;
      editors[state.currentEditorId].y = action.y;
      return Object.assign({}, state, {
        editors: editors
      });

    case ActionTypes.SET_EDITOR_SIZE:
      editors[state.currentEditorId].width = action.width;
      editors[state.currentEditorId].height = action.height;
      return Object.assign({}, state, {
        editors: editors
      });

    default:
      return state;
  }
};

export default editorContainer;
