export const defaultHTML =
`<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.sound.min.js"></script>
    <meta charset="utf-8" />
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>

`;

export const defaultSketch = `function setup() {
  createCanvas(400, 400);
  console.log("drawing a canvas");
}
function draw() {
  background(220);
}`;

export const FILES = {
  p5: [
    {
      name: 'index.html',
      content: defaultHTML
    },
    {
      name: 'sketch.js',
      content: defaultSketch
    }
  ]
};
