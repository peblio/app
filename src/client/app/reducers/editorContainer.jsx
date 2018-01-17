import * as ActionTypes from '../constants.jsx';
import p5files from './p5files.jsx';

const initialState = {
  isPlaying: false,
  editors: {},
  currentEditorId: 'editor-0',
  indexEditor: 0
};

const defaultHTML =
`<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.sound.min.js"></script>
    <meta charset="utf-8" />
  </head>
  <body>
    <script>
      function setup() {
        createCanvas(400, 400);
      }

      function draw() {
        background(220);
      }
    </script>
  </body>
</html>

`;

const defaultSketch = `function setup() {
  createCanvas(400, 400);
  console.log("drawing a canvas");
}
function draw() {
  background(220);
}`;

const editorContainer = (state = initialState, action) => {
  const editors = JSON.parse(JSON.stringify(state.editors));
  switch (action.type) {

    case ActionTypes.PLAY_CODE:
      editors[action.id].isPlaying = true;
      return Object.assign({}, state, {
        editors
      });

    case ActionTypes.STOP_CODE:
      editors[state.currentEditorId].isPlaying = false;
      editors[state.currentEditorId].consoleOutputText = [];
      return Object.assign({}, state, {
        editors
      });

    case ActionTypes.UPDATE_CODE:
      editors[state.currentEditorId].code = action.value;
      return Object.assign({}, state, {
        editors
      });

    case ActionTypes.SET_CURRENT_EDITOR:
      return Object.assign({}, state, {
        currentEditorId: action.value
      });

    case ActionTypes.SET_EDITOR_MODE:
      editors[state.currentEditorId].editorMode = action.value;
      return Object.assign({}, state, {
        editors
      });

    case ActionTypes.ADD_EDITOR:
      {
        const newEditorId = `editor-${state.indexEditor}`;
        const newEditor = {
          id: newEditorId,
          consoleOutputText: [],
          files: [
            {
              name: 'index.html',
              content: defaultHTML
            }
          ],
          isPlaying: false,
          editorMode: 'p5',
          x: 0,
          y: 0,
          width: 500,
          height: 300,
          minWidth: 500,
          minHeight: 300
        };
        editors[newEditorId] = newEditor;
        return Object.assign({}, state, {
          editors,
          indexEditor: state.indexEditor + 1,
          currentEditorId: newEditorId
        });
      }

    case ActionTypes.UPDATE_CONSOLE_OUTPUT:
      {
        const tempOutput = editors[state.currentEditorId].consoleOutputText.slice();
        if (action.event.data.arguments) {
          tempOutput.push(action.event.data.arguments.join());
        }
        editors[state.currentEditorId].consoleOutputText = tempOutput;
        return Object.assign({}, state, {
          editors
        });
      }

    case ActionTypes.REMOVE_EDITOR:
      delete editors[action.id];
      return Object.assign({}, state, {
        editors
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
        editors
      });

    case ActionTypes.SET_EDITOR_SIZE:
      editors[state.currentEditorId].width = action.width;
      editors[state.currentEditorId].height = action.height;
      return Object.assign({}, state, {
        editors
      });

    case ActionTypes.UPDATE_FILE:
      editors[state.currentEditorId].files[action.index].content = action.content;
      return Object.assign({}, state, {
        editors
      });

    default:
      return state;
  }
};

export default editorContainer;
