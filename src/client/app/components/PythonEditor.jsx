import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/python/python';

class PythonEditor extends React.Component {
  componentDidMount() {
    const defaultSketch = `
    def factorial(n):
      if n == 0:
        return 1
      else:
        return n * factorial(n - 1)
    print(factorial(5))
    `;
    this.props.updateCode(defaultSketch);

    this.cm = CodeMirror(this.codemirrorContainer, {
      value: defaultSketch,
      mode: 'javascript',
      lineNumbers: true,
      autoCloseBrackets: true,
      inputStyle: 'contenteditable',
      styleActiveLine: true
    });
    this.cm.on('keyup', () => {
      console.log(this.props.editorCode);
      this.props.updateCode(this.cm.getValue());
      console.log('changing code');
    });

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

export default PythonEditor;
