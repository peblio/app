import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import { connect } from 'react-redux';

import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/closeBrackets';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/mode/python/python';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/selection/active-line';

import * as constants from '../../../../../constants/widgetConstants.js';

require('../../../../../styles/codemirror.css');
require('../../../../../styles/base16-dark.css');
require('../../../../../styles/base16-light.css');
require('./codeEditor.scss');

class CodeEditor extends React.Component {
  componentDidMount() {
    const file = this.props.files[this.props.currentFile];
    this.cm = CodeMirror(this.codemirrorContainer, {
      theme: constants.EDITOR_THEME[this.props.editorTheme],
      value: CodeMirror.Doc(file.content),
      mode: this.getFileMode(file.name),
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      lineNumbers: true,
      autoCloseBrackets: true,
      inputStyle: 'contenteditable',
      styleActiveLine: true,
      keyMap: 'sublime',
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: true
    });
    this.cm.on('keyup', () => {
      this.props.updateFile(this.props.currentFile, this.cm.getValue());
    });
    this.cm.getWrapperElement().style['font-size'] = `${this.props.editorFontSize}px`;
  }

  componentWillUpdate(nextProps) {
    // check if files have changed
    if (this.props.currentFile !== nextProps.currentFile) {
      const file = nextProps.files[nextProps.currentFile];
      this.cm.swapDoc(CodeMirror.Doc(file.content, this.getFileMode(file.name)));
    }
    if (this.props.editorFontSize !== nextProps.editorFontSize) {
      this.cm.getWrapperElement().style['font-size'] = `${nextProps.editorFontSize}px`;
    }
    if (this.props.editorTheme !== nextProps.editorTheme) {
      this.cm.setOption('theme', constants.EDITOR_THEME[nextProps.editorTheme]);
    }
    // TODO : Find an alternate to the below solution
    // this is specifically for the workspace since the component mounts before the value is pulled in from the DB
    if (this.props.container === 'workspace' && this.props.files[this.props.currentFile].content !==
    nextProps.files[nextProps.currentFile].content
    ) {
      this.cm.setValue(nextProps.files[nextProps.currentFile].content);
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
    } else if (fileName.match(/.+\.pde$/i)) {
      mode = 'text/x-csrc';
    } else if (fileName.match(/.+\.py$/i)) {
      mode = 'python';
    } else {
      mode = 'text/plain';
    }
    return mode;
  }

  autoformat=() => {
    this.cm.autoFormatRange(this.cm.getCursor('start'), this.cm.getCursor('end'));
    this.props.updateFile(this.props.currentFile, this.cm.getValue());
  }

  render() {
    return (
      <div
        className="codeEditor__container"
        data-test="codeEditor__container"
      >
        <button
          className="codeEditor__auto-format editor-toolbar__svg"
          onClick={this.autoformat}
        >
          <i className="fa fa-indent" aria-hidden="true"></i>
        </button>
        <div ref={(element) => { this.codemirrorContainer = element; }}>
        </div>
      </div>
    );
  }
}

CodeEditor.propTypes = {
  container: PropTypes.string.isRequired,
  currentFile: PropTypes.number.isRequired,
  editorFontSize: PropTypes.number.isRequired,
  editorTheme: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  updateFile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    editorFontSize: state.preferences.editorFontSize,
    editorTheme: state.preferences.editorTheme
  };
}

export default connect(mapStateToProps, null)(CodeEditor);

CodeMirror.defineExtension('autoFormatRange', function (from, to) { // eslint-disable-line
  const cm = this;
  const outer = cm.getMode();
  const text = cm.getValue().split('\n');
  const state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
  const tabSize = cm.getOption('tabSize');
  let out = '';
  let atSol = from.ch === 0;
  const linesTo = cm.lineCount();
  const linesFrom = 0;

  function newline() {
    out += '\n';
    atSol = true;
  }

  for (let i = 0; i < text.length; i += 1) {
    const stream = new CodeMirror.StringStream(text[i], tabSize);
    while (!stream.eol()) {
      const inner = CodeMirror.innerMode(outer, state);
      const style = outer.token(stream, state); const
        cur = stream.current();
      stream.start = stream.pos;
      if (!atSol || /\S/.test(cur)) {
        out += cur;
        atSol = false;
      }

      if (!atSol && inner.mode.newlineAfterToken &&
            inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) ||
            text[i + 1] ||
            '', inner.state)) newline();
    }
    if (!stream.pos && outer.blankLine) outer.blankLine(state);
    if (!atSol)newline();
  }

  cm.operation(() => {
    cm.setValue(out);
    for (let cur = linesFrom + 1, end = linesTo; cur <= end; cur += 1) {
      cm.indentLine(cur, 'smart');
    }
  });
});
