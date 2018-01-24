import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';

const NOT_EXTERNAL_LINK_REGEX = /^(?!(http:\/\/|https:\/\/))/;
const EXTERNAL_LINK_REGEX = /^(http:\/\/|https:\/\/)/;

class P5Output extends React.Component {

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

    this.resolveJSFile(sketchDoc, this.props.files);
    sketchDoc = `<!DOCTYPE HTML>\n${sketchDoc.documentElement.outerHTML}`;
    srcDoc.set(this.iframe, sketchDoc);
  }

  getFileName(filepath) {
    return filepath.replace(/^.*[\\\/]/, '');
  }
  resolveJSFile(sketchDoc, files) {
    const scriptsInHTML = sketchDoc.getElementsByTagName('script');
    const scriptsInHTMLArray = Array.prototype.slice.call(scriptsInHTML);
    scriptsInHTMLArray.forEach((script) => {
      if (script.getAttribute('src') && script.getAttribute('src').match(NOT_EXTERNAL_LINK_REGEX) !== null) {
        console.log(script.src);
        // check if the script name is present in the files that are included for this sketch
        files.forEach((file) => {
          if (file.name == this.getFileName(script.src)) {
            script.removeAttribute('src');
            script.innerHTML = file.content; // eslint-disable-line
          }
        });
      }
    });
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
    return sketchDoc;
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
