import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

require('../../../../styles/codemirror.css');
require('../../../../styles/3024-night.css');

class CodeEditor extends React.Component {
  componentDidMount() {
    const file = this.props.files[this.props.currentFile];
    this.cm = CodeMirror(this.codemirrorContainer, {
      value: CodeMirror.Doc(file.content, this.getFileMode(file.name)),
      lineNumbers: true,
      autoCloseBrackets: true,
      inputStyle: 'contenteditable',
      styleActiveLine: true,
    });
    this.cm.on('keyup', () => {
      this.props.updateFile(this.props.currentFile, this.cm.getValue());
    });
  }

  componentWillUpdate(nextProps) {
    // check if files have changed
    if (this.props.currentFile !== nextProps.currentFile) {
      const file = this.props.files[nextProps.currentFile];
      this.cm.swapDoc(CodeMirror.Doc(file.content, this.getFileMode(file.name)));
    }
  }

  getFileMode(fileName) {
    let mode;
    if (fileName.match(/.+\.js$/i)) {
      mode = 'javascript';
    } else if (fileName.match(/.+\.css$/i)) {
      mode = 'css';
    } else if (fileName.match(/.+\.html$/i)) {
      mode = 'htmlmixed';
    } else if (fileName.match(/.+\.json$/i)) {
      mode = 'application/json';
    } else {
      mode = 'text/plain';
    }
    return mode;
  }

  render() {
    return (
      <div>
        <div ref={(element) => { this.codemirrorContainer = element; }}>
        </div>
      </div>
    );
  }
}

CodeEditor.propTypes = {
  currentFile: PropTypes.number.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  updateFile: PropTypes.func.isRequired
};

export default CodeEditor;
