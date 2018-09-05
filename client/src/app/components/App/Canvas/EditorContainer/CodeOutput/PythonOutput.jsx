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

  outf(text) {
    const mypre = document.getElementById('python-output');
    mypre.innerHTML += text;
  }

  builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) throw `File not found: '${x}'`;
    return Sk.builtinFiles.files[x];
  }

  resolvePyFile=(pythonDoc, files) => {
    const injectScript = pythonDoc.createElement('script');

    const pythonCode = files[0].content;

    const mypre = pythonDoc.getElementById('python-output');
    mypre.innerHTML = '';
    injectScript.innerHTML = `
    function executeCode(pythonCode){
      Sk.pre = 'python-output';
      Sk.configure({ output: function outf(text) {
        var mypre = document.getElementById('python-output');
        mypre.innerHTML += text;
      }, read: function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) throw 'File not found';
        return Sk.builtinFiles.files[x];
      } });
      if(!Sk.TurtleGraphics) {
        Sk.TurtleGraphics = {};
        Sk.TurtleGraphics.target = 'python-graphic-output';
      }
      var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody('<stdin>', false, pythonCode, true);
      });
      myPromise.then(function(mod) {

      },
      function(err) {

      });
    }
    window.onload = executeCode;
     `;
    pythonDoc.head.appendChild(injectScript);
    return pythonDoc;
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
    sketchDoc = this.resolvePyFile(sketchDoc, this.props.files);
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
      'http://www.skulpt.org/static/skulpt.min.js',
      'http://www.skulpt.org/static/skulpt-stdlib.js'
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


    // const scriptOffs = [10, 'sketch.pde'];
    // const injectScript = sketchDoc.createElement('script');
    // console.log(scriptOffs);
    // if (scriptOffs) {
    //   injectScript.innerHTML =
    // `CONSOLEOUTPUT.init(["${this.props.id}"]);
    // CONSOLEOUTPUT.callConsole();
    // CONSOLEOUTPUT.callErrorConsole(${scriptOffs[0]}, "${scriptOffs[1]}", false);
    // `;
    //   sketchDoc.head.appendChild(injectScript);
    // }
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
