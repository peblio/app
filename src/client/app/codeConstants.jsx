const defaultP5HTML =
`<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.sound.min.js"></script>
    <meta charset="utf-8" />
      <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>

`;

const defaultP5JS = `function setup() {
  createCanvas(400, 400);
  console.log("drawing a canvas");
}
function draw() {
  background(220);
}`;

const defaultP5CSS = `
html,body{
  background: white;
  margin: 0;
  padding: 0;
}
`;

export const FILES = {
  p5: [
    {
      name: 'index.html',
      content: defaultP5HTML
    },
    {
      name: 'sketch.js',
      content: defaultP5JS
    },
    {
      name: 'style.css',
      content: defaultP5CSS
    }
  ]
};
