import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';

class ProcessingOutput extends React.Component {
  constructor(props) {
    super(props);
    this.startSketch = this.startSketch.bind(this);
    this.stopSketch = this.stopSketch.bind(this);
  }

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

  startSketch() {
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

  stopSketch() {
    window.removeEventListener('message', this.props.updateConsoleOutput);
    this.props.clearConsoleOutput();
  }

  injectLocalFiles(sketchDocument) {
    const scriptsToInject = [
      '/hijackConsole.js',
      '/processing.min.js'
    ];
    const parser = new DOMParser();
    const sketchDoc = parser.parseFromString(sketchDocument, 'text/html');
    scriptsToInject.forEach((scriptToInject) => {
      const script = sketchDoc.createElement('script');
      script.src = scriptToInject;
      sketchDoc.head.appendChild(script);
    });

    // add the processing Code
    const processingScript = sketchDoc.createElement('script');
    processingScript.setAttribute('data-processing-target', 'pjs');
    processingScript.setAttribute('type', 'application/processing');
    processingScript.removeAttribute('src');
    processingScript.innerHTML = this.props.files[0].content; // eslint-disable-line
    sketchDoc.body.appendChild(processingScript);
    const processingCanvas = sketchDoc.createElement('canvas');
    processingCanvas.setAttribute('id', 'pjs');
    processingCanvas.setAttribute('data-test', 'processing-canvas');
    sketchDoc.body.appendChild(processingCanvas);

    const scriptOffs = [10, 'sketch.pde'];
    const injectScript = sketchDoc.createElement('script');
    if (scriptOffs) {
      injectScript.innerHTML =
    `CONSOLEOUTPUT.init(["${this.props.id}"]);
    CONSOLEOUTPUT.callConsole();
    CONSOLEOUTPUT.callErrorConsole(${scriptOffs[0]}, "${scriptOffs[1]}", false);
    `;
      sketchDoc.head.appendChild(injectScript);
    }
    return sketchDoc;
  }

  render() {
    return (
      <div>
        <iframe
          ref={(element) => { this.iframe = element; }}
          id="code-output"
          title="sketch output"
          data-test="sketch-output"
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
