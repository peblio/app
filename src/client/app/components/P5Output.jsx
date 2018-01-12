import React, { PropTypes } from 'react';

class P5Output extends React.Component {

  componentDidMount() {
    window.addEventListener('message', this.props.updateConsoleOutput, false);
    const defaultCode = this.props.files[this.getHTMLFileIndex(this.props.files)].content;
    this.iframe.contentWindow.document.open();
    this.iframe.contentWindow.document.write(defaultCode);
    this.iframe.contentWindow.document.close();
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
