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

const defaultWebDevHTML =
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
      <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>

`;

const defaultWebDevJS = '';

const defaultWebDevCSS = `
html,body{
  background: white;
  margin: 0;
  padding: 0;
}
`;


const defaultHTML =
`<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>

`;

export const STARTFILE = {
  p5: 1,
  html: 0,
  webdev: 0
};

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
  ],
  html: [
    {
      name: 'index.html',
      content: defaultHTML
    }
  ],
  webdev: [
    {
      name: 'index.html',
      content: defaultWebDevHTML
    },
    {
      name: 'app.js',
      content: defaultWebDevJS
    },
    {
      name: 'style.css',
      content: defaultWebDevCSS
    }
  ],
};

export { FILES as default };
