import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/selection/active-line';
import 'codemirror/keymap/sublime';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

import * as constants from '../../../../../constants/widgetConstants.js';

require('../../../../../styles/codemirror.css');
require('../../../../../styles/base16-dark.css');
require('../../../../../styles/base16-light.css');

class CodeEditor extends React.Component {
  componentDidMount() {
    const file = this.props.files[this.props.currentFile];
    this.cm = CodeMirror(this.codemirrorContainer, {
      theme: constants.EDITOR_THEME[this.props.editorTheme],
      value: CodeMirror.Doc(file.content, this.getFileMode(file.name)),
      lineNumbers: true,
      autoCloseBrackets: true,
      inputStyle: 'contenteditable',
      styleActiveLine: true,
      keyMap: 'sublime',
      lineWrapping: true
    });
    this.cm.on('keyup', () => {
      this.props.updateFile(this.props.currentFile, this.cm.getValue());
    });
    this.cm.getWrapperElement().style['font-size'] = `${this.props.editorFontSize}px`;
  }

  componentWillUpdate(nextProps) {
    // check if files have changed
    if (this.props.currentFile !== nextProps.currentFile) {
      const file = this.props.files[nextProps.currentFile];
      this.cm.swapDoc(CodeMirror.Doc(file.content, this.getFileMode(file.name)));
    }
    if (this.props.editorFontSize !== nextProps.editorFontSize) {
      this.cm.getWrapperElement().style['font-size'] = `${nextProps.editorFontSize}px`;
    }
    if (this.props.editorTheme !== nextProps.editorTheme) {
      this.cm.setOption('theme', constants.EDITOR_THEME[nextProps.editorTheme]);
    }
  }

  componentDidUpdate(prevProps) {
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
    } else if (fileName.match(/.+\.pde$/i)) {
      mode = 'java';
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
  editorFontSize: PropTypes.number.isRequired,
  editorTheme: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  updateFile: PropTypes.func.isRequired
};

export default CodeEditor;
