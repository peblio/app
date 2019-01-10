import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';

const NOT_EXTERNAL_LINK_REGEX = /^(?!(http:\/\/|https:\/\/))/;
const ANCHOR_LINK_REGEX = /^(#)/;
const STRING_REGEX = /(['"])((\\\1|.)*?)\1/gm;
const MEDIA_FILE_REGEX = /.+\.(gif|jpg|jpeg|png|bmp)$/i;

class FrontEndOutput extends React.Component {
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

  getAllScriptOffsets = (htmlFile) => {
    const startTag = '@fs-';
    const offs = [];
    let found = true;
    let lastInd = 0;
    let ind = 0;
    let endFilenameInd = 0;
    let filename = '';
    let lineOffset = 0;
    while (found) {
      ind = htmlFile.indexOf(startTag, lastInd);
      if (ind === -1) {
        found = false;
      } else {
        endFilenameInd = htmlFile.indexOf('.js', ind + startTag.length + 3);
        filename = htmlFile.substring(ind + startTag.length, endFilenameInd);
        // the length of hijackConsoleErrorsScript is 33 lines
        lineOffset = htmlFile.substring(0, ind).split('\n').length + 33;
        offs.push([lineOffset, filename]);
        lastInd = ind + 1;
      }
    }
    return offs;
  };

  startSketch() {
    window.addEventListener('message', this.props.updateConsoleOutput, false);
    const htmlFile = this.props.files[this.getHTMLFileIndex(this.props.files)].content;
    const parser = new DOMParser();
    let sketchDoc = parser.parseFromString(htmlFile, 'text/html');
    this.resolveJSFile(sketchDoc, this.props.files);
    this.resolveCSSFile(sketchDoc, this.props.files);
    this.resolveAnchorLinks(sketchDoc);
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
            script.setAttribute('data-tag', `@fs-${file.name}`);
            script.removeAttribute('src');
            const newFileContent = this.resolveLinksInString(file.content, files);
            script.innerHTML = newFileContent;
          }
        });
      }
    });
  }

  resolveLinksInString(content, files) {
    let newContent = content;
    let fileStrings = content.match(STRING_REGEX);
    const fileStringRegex = /^(?!(http:\/\/|https:\/\/)).*$/i;
    fileStrings = fileStrings || [];
    fileStrings.forEach((fileString) => {
      // if string does not begin with http or https
      let newFileString = fileString;
      const fileStringToBeReplaced = newFileString.slice(1, -1); // remove the quotes
      newFileString = newFileString.slice(1, -1); // remove the quotes
      if (newFileString.startsWith('.')) {
        newFileString = newFileString.substr(1);
      }
      while (newFileString.startsWith('/')) {
        newFileString = newFileString.substr(1);
      }
      if (newFileString.match(fileStringRegex) && newFileString.match(MEDIA_FILE_REGEX)) {
        const replacement = this.resolvePathToFile(newFileString, files);
        if (replacement) {
          newContent = newContent.replace(fileStringToBeReplaced, replacement.externalLink);
        }
      }
    });
    return newContent;
  }

  resolvePathToFile(filePath, files) {
    return files.find(file => file.name === filePath);
  }

  resolveAnchorLinks(sketchDoc) {
    const allLinks = sketchDoc.getElementsByTagName('a');
    const allLinksArray = Array.prototype.slice.call(allLinks);
    allLinksArray.forEach((link) => {
      if (link.getAttribute('href').match(ANCHOR_LINK_REGEX) !== null) {
        link.attributes.onclick.value = `
        event.preventDefault();
        const anchorId = "${link.attributes.href.value}";
        document.querySelector(anchorId).scrollIntoView(false);
        `;
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

    const sketchDocString = `<!DOCTYPE HTML>\n${sketchDoc.documentElement.outerHTML}`;

    let scriptOffs = this.getAllScriptOffsets(sketchDocString);
    scriptOffs = scriptOffs[0];

    const injectScript = sketchDoc.createElement('script');
    if (scriptOffs) {
      injectScript.innerHTML =
    `CONSOLEOUTPUT.init(["${this.props.id}"]);
    CONSOLEOUTPUT.callConsole();
    CONSOLEOUTPUT.callErrorConsole(${scriptOffs[0]}, "${scriptOffs[1]}",true);
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
          title="code output"
          data-test="code-output"
        >
        </iframe>
      </div>
    );
  }
}

FrontEndOutput.propTypes = {
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

export default FrontEndOutput;
