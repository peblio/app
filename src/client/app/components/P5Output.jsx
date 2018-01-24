import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';

class P5Output extends React.Component {

  constructor(props) {
    super(props);
    // this.injectLocalFiles = this.injectLocalFiles.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.props.updateConsoleOutput, false);
    const htmlFile = this.props.files[this.getHTMLFileIndex(this.props.files)].content;
    const parser = new DOMParser();
    let sketchDoc = parser.parseFromString(htmlFile, 'text/html');
    sketchDoc = this.injectLocalFiles(sketchDoc);

    /*
     TODO:
    - find .js in HTML files
    - replace with the .js file contentWindow
    */
    srcDoc.set(this.iframe, sketchDoc);
  }

  injectLocalFiles(sketchDoc) {
    const scriptsToInject = [
      '/hijackConsole.js'
    ];
    scriptsToInject.forEach((scriptToInject) => {
      const script = sketchDoc.createElement('script');
      script.src = scriptToInject;
      sketchDoc.head.appendChild(script);
    });
    return `<!DOCTYPE HTML>\n${sketchDoc.documentElement.outerHTML}`;
  }

  getHTMLFileIndex(files) {
    const HTML_REGEX = /(.+\.html)/i;
    let index = -1;
    files.forEach((file, i) => {
      if (file.name.match(HTML_REGEX)) {
        index = i;
      }
    });
    return index;
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
