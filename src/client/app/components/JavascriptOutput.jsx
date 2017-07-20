import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';

class JavascriptOutput extends React.Component {
  constructor(props) {
    super(props);
    state:  {
      output: ''
    }
  }
  
  componentDidUpdate() {
    // console.log("DID UPDATE");
    let defaultCode = this.props.editorCode;
    if(this.props.isPlaying) {
      const codeOutput = eval(this.props.editorCode);
      console.log(codeOutput);
      // this.setState({
      //   output: codeOutput
      // });
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

export default JavascriptOutput;
