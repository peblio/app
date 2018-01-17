import * as ActionTypes from '../constants.jsx';

const initialState = {
  editors: []
};

const defaultSketch = `function setup() {
  createCanvas(400, 400);
  console.log("drawing a canvas");
}
function draw() {
  background(220);
}`;

const editors = (state = initialState, action) => {
  // deep copy
  const editors = JSON.parse(JSON.stringify(state.editors));

  switch (action.type) {
    /** ALL */
    case ActionTypes.SET_CURRENT_EDITOR: 
      {
        const editor = editors.splice(action.index, 1)
        editors.push(editor)
        return { editors };
      }

    case ActionTypes.REMOVE_EDITOR:
      delete editors[action.index];
      return { editors };

    case ActionTypes.SET_DB_EDITORS: {
      const editors = action.editors.map(editor => {
        if(editor.type === 'text'){
          const {rawContentState, newEditor} = editor;
          newEditor.editorState = EditorState.createWithContent(
            convertFromRaw(JSON.parse(rawContentState))
          );
          return newEditor;
        }
        return editor;
      })
      return { editors };
    }

    case ActionTypes.SET_EDITOR_POSITION:
      editors[action.index].x = action.x;
      editors[action.index].y = action.y;
      return { editors };

    case ActionTypes.SET_EDITOR_SIZE:
      editors[action.index].width = action.width;
      editors[action.index].height = action.height;
      return { editors };      

    /** CODE EDITOR */
    case ActionTypes.ADD_CODE_EDITOR:
      editors.push({
        type: 'code',
        id: `editor-${editors.length}`,
        consoleOutputText: [],
        code: defaultSketch,
        isPlaying: false,
        editorMode: 'p5',
        x: 0,
        y: 0,
        width: 500,
        height: 300,
        minWidth: 500,
        minHeight: 300
      });
      return { editors };
    
    case ActionTypes.PLAY_CODE:
      editors[action.index].isPlaying = true;
      return { editors };

    case ActionTypes.STOP_CODE:
      editors[action.index].isPlaying = false;
      editors[action.index].consoleOutputText = [];
      return { editors };

    case ActionTypes.UPDATE_CODE:
      editors[action.index].code = action.value;
      return { editors };

    case ActionTypes.SET_EDITOR_MODE:
      editors[action.index].editorMode = action.value;
      return { editors };

    case ActionTypes.UPDATE_CONSOLE_OUTPUT:
      {
        const tempOutput = editors[action.index].consoleOutputText.slice();
        if (action.event.data.arguments) {
          tempOutput.push(action.event.data.arguments.join());
        }
        editors[action.index].consoleOutputText = tempOutput;
        return { editors };
      }

    /** TEXT EDITOR */
    case ActionTypes.ADD_TEXT_EDITOR:
      editors.push({
        type: 'text',
        id: `editor-${editors.length}`,
        editorState: newTextEditorState,
        x: 0,
        y: 0,
        width: 500,
        height: 100,
        minWidth: 350,
        minHeight: 100
      });
      return { editors };

    case ActionTypes.UPDATE_TEXT_CHANGE:
      editors[action.index].editorState = action.state;
      return { editors };
    
    /** IFRAME */
    case ActionTypes.ADD_IFRAME:
      editors.push({
        type: 'iframe',
        id: `editor-${editors.length}`,
        url: '',
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        minWidth: 400,
        minHeight: 300,
      });

    case ActionTypes.SET_IFRAME_URL:
      editors[action.index].url = action.url;
      return { editors };

    default:
      return state;
  }
};

export default editors;
