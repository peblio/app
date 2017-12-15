import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';

class JavascriptOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      output: []
    }
  }
  componentDidMount() {
    window.addEventListener("message", this.props.receiveMessage, false);
    let defaultCode=`<!DOCTYPE html>
    <html>
      <head>
        <script src="/public/hijackConsole.js"></script>
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
    const iframeStyle={
      display: 'none'
    };
    return (
      <div>
        <p> {this.props.consoleOutputText.join("\n")} </p>
        <iframe style={iframeStyle} ref={(element)=> { this.iframe=element; }} id="code-output"></iframe>
      </div>
    );
  }
}

export default JavascriptOutput;
