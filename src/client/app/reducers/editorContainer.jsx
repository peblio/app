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

      editors[action.id].isPlaying = true;
      return Object.assign({}, state, { editors: editors });
    case ActionTypes.STOP_CODE:
      editors[action.id].isPlaying = false;
      editors[action.id].consoleOutputText = [];
      return Object.assign({}, state, { editors: editors });
    case ActionTypes.ADD_EDITOR:
      let tempEditors = state.editors;
      let newEditorId = 'editor-' + state.noOfEditors;
      let newEditor = {
        id: newEditorId,
        consoleOutputText: [],
        code: '',
        isPlaying: false,
        editorMode: {
          p5: true,
          javascript: false,
          python: false
        },
      };
      editors[newEditorId]= newEditor;
      console.log(editors);
      console.log(state);
      return Object.assign({}, state, {
        editors: tempEditors,
        noOfEditors: state.noOfEditors + 1
      });
    default:
      return state;
  }
};

export default editorContainer;

//
// addEditor() {
//   let editors = this.props.editors;
//   let newEditorId = 'editor-' + this.state.noOfEditors;
//   let newEditor = {
//     id: newEditorId,
//     consoleOutputText: [],
//     code: '',
//     isPlaying: false,
//     editorMode: {
//       p5: true,
//       javascript: false,
//       python: false
//     },
//   };
//
//   editors[newEditorId]= newEditor;
//   this.setState({
//     noOfEditors: this.state.noOfEditors+1,
//     editors: editors
//   })
// }
