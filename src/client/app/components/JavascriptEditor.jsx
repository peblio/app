import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/javascript/javascript';

class JavascriptEditor extends React.Component {
  componentDidMount() {
    const defaultSketch=`
    var a=20;
    console.log(a +40);
    `;
    this.props.updateCode(defaultSketch);

    this.cm=CodeMirror(this.codemirrorContainer, {
      value: defaultSketch,
      mode: 'javascript',
      lineNumbers: true,
      autoCloseBrackets: true,
      inputStyle: 'contenteditable',
      styleActiveLine: true
    });
    this.cm.on('keyup', ()=> {
      this.props.updateCode(this.cm.getValue());
      console.log(this.props.code);
    });

  }
  render() {
    return (
      <div>
        <div ref={(element)=> { this.codemirrorContainer=element; }}>
        </div>
      </div>
    );
  }
}

export default JavascriptEditor;
