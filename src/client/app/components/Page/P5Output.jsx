import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';

const NOT_EXTERNAL_LINK_REGEX = /^(?!(http:\/\/|https:\/\/))/;

class P5Output extends React.Component {

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

  getFileName(filepath) {
    return filepath.replace(/^.*[\\\/]/, ''); // eslint-disable-line
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

  startSketch() {
    window.addEventListener('message', this.props.updateConsoleOutput, false);
    const htmlFile = this.props.files[this.getHTMLFileIndex(this.props.files)].content;
    const parser = new DOMParser();
    let sketchDoc = parser.parseFromString(htmlFile, 'text/html');
    this.resolveJSFile(sketchDoc, this.props.files);
    this.resolveCSSFile(sketchDoc, this.props.files);
    sketchDoc = this.injectLocalFiles(sketchDoc);
    sketchDoc = `<!DOCTYPE HTML>\n${sketchDoc.documentElement.outerHTML}`;
    srcDoc.set(this.iframe, sketchDoc);
  }

  stopSketch() {
    window.removeEventListener('message', this.props.updateConsoleOutput);
    this.props.clearConsoleOutput();
  }


  resolveJSFile(sketchDoc, files) {
    const scriptsInHTML = sketchDoc.getElementsByTagName('script');
    const scriptsInHTMLArray = Array.prototype.slice.call(scriptsInHTML);
    scriptsInHTMLArray.forEach((script) => {
      if (script.getAttribute('src') && script.getAttribute('src').match(NOT_EXTERNAL_LINK_REGEX) !== null) {
        // check if the script name is present in the files that are included for this sketch
        files.forEach((file) => {
          if (file.name === this.getFileName(script.src)) {
            script.removeAttribute('src');
            script.innerHTML = file.content; // eslint-disable-line
          }
        });
      }
    });
  }

  resolveCSSFile(sketchDoc, files) {
    const stylesInHTML = sketchDoc.getElementsByTagName('link');
    const stylesInHTMLArray = Array.prototype.slice.call(stylesInHTML);
    stylesInHTMLArray.forEach((css) => {
      if (css.getAttribute('href') && css.getAttribute('href').match(NOT_EXTERNAL_LINK_REGEX) !== null) {
        // check if the css name is present in the files that are included for this sketch
        files.forEach((file) => {
          if (file.name === this.getFileName(css.href)) {
            const style = sketchDoc.createElement('style');
            style.innerHTML = file.content;
            sketchDoc.head.appendChild(style);
            css.parentElement.removeChild(css);
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

  render() {
    return (
      <div>
        <iframe ref={(element) => { this.iframe = element; }} id="code-output"></iframe>
      </div>
    );
  }
}

P5Output.propTypes = {
  clearConsoleOutput: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired
};

export default P5Output;
