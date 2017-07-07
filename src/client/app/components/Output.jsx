import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';

class Output extends React.Component {
  constructor() {
    super();
  }
  componentDidUpdate() {
    // console.log("DID UPDATE");
    let defaultCode = `<!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.10/p5.min.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
      </head>
      <body>
        <script>`
        + this.props.editorCode
        +
      `</script>
      </body>
    </html>`;
    this.iframe.contentWindow.document.open();
    this.iframe.contentWindow.document.write(defaultCode);
    this.iframe.contentWindow.document.close();
  }

  render() {
    return (
      <div>
        <iframe ref={(element) => { this.iframe = element; }} id="code-output">

        </iframe>
      </div>
    );
  }
}

export default Output;
