import React, { PropTypes } from 'react';

class P5Output extends React.Component {
  componentDidMount() {
    window.addEventListener('message', this.props.updateConsoleOutput, false);
    const defaultCode = `<!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.10/p5.min.js"></script>
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

  componentWillUnmount() {
    window.removeEventListener('message', this.props.updateConsoleOutput);
  }

  render() {
    return (
      <div>
        <iframe ref={(element) => { this.iframe = element; }} id="code-output"></iframe>
      </div>
    );
  }
}

P5Output.propTypes = {
  editorCode: PropTypes.string.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired
};

export default P5Output;
