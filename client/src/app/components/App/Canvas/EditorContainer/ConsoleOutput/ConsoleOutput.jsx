import React from 'react';
import PropTypes from 'prop-types';

require('./consoleOutput.scss');

class ConsoleOutput extends React.Component {
  render() {
    return (
      <div className="console_outputDiv">
        <p className="console__output-text">
          {' '}
          {this.props.consoleOutputText.join('\n')}
          {' '}
        </p>
      </div>
    );
  }
}

ConsoleOutput.propTypes = {
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ConsoleOutput;
