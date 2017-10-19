import * as ActionTypes from '../constants.jsx';
const initialState = {
  isPlaying: false,
  editors: {},
  currentEditorId: 'editor-0',
  noOfEditors: 0,
}

const editorContainer = (state = initialState, action) => {
  let editors = state.editors;
  switch (action.type) {

    case ActionTypes.PLAY_CODE:
      editors[state.currentEditorId].isPlaying = true;
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

    case ActionTypes.ADD_EDITOR:
      let tempEditors = state.editors;
      let newEditorId = 'editor-' + state.noOfEditors;
      let newEditor = {
        id: newEditorId,
        consoleOutputText: [],
        code: '',
        isPlaying: true,
        editorMode: {
          p5: true,
          javascript: false,
          python: false
        },
      };
      editors[newEditorId]= newEditor;
      return Object.assign({}, state, {
        editors: tempEditors,
        noOfEditors: state.noOfEditors + 1
      });

    default:
      return state;
  }
};

export default editorContainer;

// playCode = {()=>this.props.playCode(id)}
