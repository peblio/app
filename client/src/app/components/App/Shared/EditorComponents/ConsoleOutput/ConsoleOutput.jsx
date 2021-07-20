import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
import ReactHtmlParser from 'react-html-parser';
import PythonTurtleOutput from '../CodeOutput/PythonTurtleOutput';

require('./consoleOutput.scss');

class ConsoleOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolledToBottom: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    /* eslint-disable react/no-did-update-set-state */
    const out = this.output;
    if (out) {
      const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 22;
      if (prevState.isScrolledToBottom !== isScrolledToBottom) {
        this.setState({
          isScrolledToBottom
        });
      }
      if (this.state.isScrolledToBottom) out.scrollTop = out.scrollHeight - out.clientHeight;
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  render() {
    if (this.props.editorMode === 'python') {
      return (
        <div className="console__outputDiv">
          <PythonTurtleOutput id={this.props.id} />
        </div>
      );
    }
    const toggleButton = this.props.isConsoleOpen ? '&or;' : '&and;';
    return (
      <div className="console__outputDiv">
        <nav //eslint-disable-line
          className="console__nav"
          tabIndex="0" //eslint-disable-line
          onClick={this.props.toggleConsole}
        >
          <p className="console__heading"> Console </p>
          <Tooltip content="Toggle Console">
            <button
              className="console__toggle"
            >
              {ReactHtmlParser(toggleButton)}
            </button>
          </Tooltip>
        </nav>
        {this.props.isConsoleOpen && (
          <div>
            <p
              className="console__output-text"
              ref={(output) => { this.output = output; }}
            >
              {this.props.consoleOutputText.map((output) => {
                console.log(output);
                return (
                  <div>
                    {output}
                  </div>
                );
              })}
            </p>
          </div>
        )}
      </div>
    );
  }
}

ConsoleOutput.propTypes = {
  id: PropTypes.string.isRequired,
  editorMode: PropTypes.string.isRequired,
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  isConsoleOpen: PropTypes.bool.isRequired,
  toggleConsole: PropTypes.func.isRequired
};

export default ConsoleOutput;
