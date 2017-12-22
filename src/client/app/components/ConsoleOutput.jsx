import React, { PropTypes } from 'react';

class ConsoleOutput extends React.Component {

  render() {
    return (
      <div className="console_outputDiv">
        <p className="console_outputText"> {this.props.consoleOutputText.join('\n')} </p>
      </div>
    );
  }
}

ConsoleOutput.propTypes = {
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ConsoleOutput;
