import React, { PropTypes } from 'react';
import P5Output from './P5Output.jsx'
import JavascriptOutput from './JavascriptOutput.jsx'
import PythonOutput from './PythonOutput.jsx'

class OutputContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        {(() => { // eslint-disable-line
          if (this.props.editorMode.p5) {
            return (
              <P5Output
                editorCode = {this.props.editorCode}
                updateCode = {this.props.updateCode}
                isPlaying = {this.props.isPlaying}
              />
            );
          } else if (this.props.editorMode.javascript) {
            return (
              <JavascriptOutput
                editorCode = {this.props.editorCode}
                updateCode = {this.props.updateCode}
                isPlaying = {this.props.isPlaying}
              />
            );
          }
        })()}

      </div>
    );
  }

}

export default OutputContainer;
