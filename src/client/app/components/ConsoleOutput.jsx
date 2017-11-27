import React, { PropTypes } from 'react';
import CodeMirror from 'codemirror';

class ConsoleOutput extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="console_outputDiv">
        <p className="console_outputText"> {this.props.consoleOutputText.join("\n")} </p>
      </div>
    );
  }
}

export default ConsoleOutput;
