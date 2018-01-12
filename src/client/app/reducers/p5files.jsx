import * as ActionTypes from '../constants.jsx';

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

const initialState = {
  files: [
    {
      name: 'index.html',
      content: defaultHTML
    }
  ]
};

const p5files = (state = initialState, action) => {
  const files = JSON.parse(JSON.stringify(state.files));
  switch (action.type) {

    case ActionTypes.UPDATE_FILE:
      files[action.index].content = action.content;
      return Object.assign({}, state, {
        files
      });

    default:
      return state;
  }
};


export default p5files;
