import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

// const pythonjs=require('python-js');

class PythonOutput extends React.Component {
  // constructor() {
  //   super();
  // }
  // componentDidUpdate() {
  //   const defaultCode = this.props.editorCode;
  //   if (this.props.isPlaying) {
  //     // const code=pythonjs.translator.to_javascript( defaultCode ); // output javascript
  //     // eval(code);
  //   }
  // }

  render() {
    return (
      <div>
        { this.props.isPlaying &&
          <div> POTATO </div>
        }
      </div>
    );
  }
}

export default PythonOutput;
