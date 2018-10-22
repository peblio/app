import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';

class ProcessingOutput extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.startSketch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isRefreshing === false && this.props.isRefreshing === true) {
      this.props.stopCodeRefresh();
      this.stopSketch();
      this.startSketch();
    }
  }

  componentWillUnmount() {
    this.stopSketch();
  }

  onIframeLoad = () => {
    const pythonCode = this.props.files[0].content;
    this.iframe.contentWindow.executeCode(pythonCode);
  }

  startSketch=() => {
    window.addEventListener('message', this.props.updateConsoleOutput, false);
    let sketchDoc =
    `
    <html>
      <head>
        <title>Page Title</title>
      </head>
      <body>
      </body>
    </html>`;
    sketchDoc = this.injectLocalFiles(sketchDoc);
    sketchDoc = `<!DOCTYPE HTML>\n${sketchDoc.documentElement.outerHTML}`;
    srcDoc.set(this.iframe, sketchDoc);
  }

  stopSketch=() => {
    window.removeEventListener('message', this.props.updateConsoleOutput);
    this.props.clearConsoleOutput();
  }

  injectLocalFiles(sketchDoc) {
    const scriptsToInject = [
      '/hijackConsole.js',
      '/skulpt.min.js',
      '/skulpt-stdlib.js',
      '/pythonUtils.js'
    ];
    const parser = new DOMParser();
    sketchDoc = parser.parseFromString(sketchDoc, 'text/html');
    scriptsToInject.forEach((scriptToInject) => {
      const script = sketchDoc.createElement('script');
      script.src = scriptToInject;
      sketchDoc.head.appendChild(script);
    });

    const pythonOutput = sketchDoc.createElement('pre');
    pythonOutput.setAttribute('id', 'python-output');
    sketchDoc.body.appendChild(pythonOutput);
    const pythonGraphicOutput = sketchDoc.createElement('div');
    pythonGraphicOutput.setAttribute('id', 'python-graphic-output');
    sketchDoc.body.appendChild(pythonGraphicOutput);
    return sketchDoc;
  }

  render() {
    return (
      <div>
        <iframe
          ref={(element) => { this.iframe = element; }}
          id="code-output"
          data-test="sketch-output"
          name="python-output"
          onLoad={this.onIframeLoad.bind(this)}
        >
        </iframe>
      </div>
    );
  }
}

ProcessingOutput.propTypes = {
  id: PropTypes.string.isRequired,
  clearConsoleOutput: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired
};

export default ProcessingOutput;
