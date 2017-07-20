import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';

// const pythonjs = require('python-js');

class PythonOutput extends React.Component {
  constructor() {
    super();
  }
  componentDidUpdate() {
    // console.log("DID UPDATE");
    const defaultCode = this.props.editorCode;
    if (this.props.isPlaying) {
      // const code = pythonjs.translator.to_javascript( defaultCode ); // output javascript
      // eval(code);
    }
  }

  render() {
    return (
      <div>
        {(() => { // eslint-disable-line
          if (this.props.isPlaying) {
            return (
              <div> POTATO </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default PythonOutput;
