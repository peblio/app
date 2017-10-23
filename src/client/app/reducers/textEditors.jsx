import * as ActionTypes from '../constants.jsx';
const initialState = {
  textEditors: {},
  currentTextEditorId: 'editor-0',
  noOfTextEditors: 0,
}

const textEditors = (state = initialState, action) => {
  let textEditors = JSON.parse(JSON.stringify(state.textEditors));

  switch (action.type) {
    case ActionTypes.ADD_TEXT_EDITOR:
      let newEditorId = 'text-editor-' + state.noOfEditors;
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
    default:
      return state;
  }
};

export default editorContainer;


addTextEditor() {
    let textEditors = this.state.textEditors;
    let newTextEditorId = 'text-editor-' + this.state.noOfTextEditors;
    let newTextEditor = {
      id: newTextEditorId,
      editorState: EditorState.createEmpty(),
    };

    textEditors[newTextEditorId]= newTextEditor;

    this.setState({
      noOfTextEditors: this.state.noOfTextEditors+1,
      textEditors: textEditors
    });
  }
