import React from 'react';
import PropTypes from 'prop-types';

class JavascriptOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: []
    };
  }
  componentDidMount() {
    window.addEventListener('message', this.props.updateConsoleOutput, false);
    const defaultCode = `<!DOCTYPE html>
    <html>
      <head>
        <script src="/public/hijackConsole.js"></script>
      </head>
      <body>
        <script>${
         this.props.editorCode

      }</script>
      </body>
    </html>`;
    this.iframe.contentWindow.document.open();
    this.iframe.contentWindow.document.write(defaultCode);
    this.iframe.contentWindow.document.close();
  }


  render() {
    const iframeStyle = {
      display: 'none'
    };
    return (
      <div className="codeEditor__output-text">
        <p> {this.props.consoleOutputText.join('\n')} </p>
        <iframe style={iframeStyle} ref={(element) => { this.iframe = element; }} id="code-output"></iframe>
      </div>
    );
  }
}

JavascriptOutput.propTypes = {
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  editorCode: PropTypes.string.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired
};

export default JavascriptOutput;
