import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';

class P5Editor extends React.Component {
  componentDidMount() {
    const defaultSketch = `function setup() {
      createCanvas(400, 400);
    }

    function draw() {
      background(220);
    }`;
    this.props.updateCode(defaultSketch);

    this.cm = CodeMirror(this.codemirrorContainer, {
      value: defaultSketch,
      mode: 'javascript',
      lineNumbers: true,
      autoCloseBrackets: true,
      inputStyle: 'contenteditable'
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

export default P5Editor;
