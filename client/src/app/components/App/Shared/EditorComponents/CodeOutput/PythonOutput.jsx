import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';

class ProcessingOutput extends React.Component {
  componentDidMount() {
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
    const tempSketchDoc = parser.parseFromString(sketchDoc, 'text/html');
    scriptsToInject.forEach((scriptToInject) => {
      const script = tempSketchDoc.createElement('script');
      script.src = scriptToInject;
      tempSketchDoc.head.appendChild(script);
    });

    const pythonOutput = tempSketchDoc.createElement('pre');
    pythonOutput.setAttribute('id', 'python-output');
    tempSketchDoc.body.appendChild(pythonOutput);
    const pythonGraphicOutput = tempSketchDoc.createElement('div');
    pythonGraphicOutput.setAttribute('id', 'python-graphic-output');
    tempSketchDoc.body.appendChild(pythonGraphicOutput);
    return tempSketchDoc;
  }

  render() {
    return (
      <div>
        <iframe
          title="python output"
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
