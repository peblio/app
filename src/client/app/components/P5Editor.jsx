import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/javascript/javascript';

require('../styles/codemirror.css');
require('../styles/3024-night.css');

class P5Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const defaultSketch = `function setup() {
      createCanvas(400, 400);
      console.log("@");
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
      inputStyle: 'contenteditable',
      styleActiveLine: true,
    });
    this.cm.on('keyup', () => {
      this.props.updateCode(this.cm.getValue());
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
