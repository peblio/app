import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
import ReactHtmlParser from 'react-html-parser';

require('./consoleOutput.scss');

class ConsoleOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolledToBottom: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const out = document.getElementById('console__output-text');
    const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 22;
    if (prevState.isScrolledToBottom !== isScrolledToBottom) {
      this.setState({
        isScrolledToBottom
      });
    }
    if (this.state.isScrolledToBottom) out.scrollTop = out.scrollHeight - out.clientHeight;
  }

  render() {
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
          <p
            id="console__output-text"
            className="console__output-text"
          >
            {this.props.consoleOutputText.map(output => (
              <div>
                {output}
              </div>
            ))}
          </p>
        )}
      </div>
    );
  }
}

ConsoleOutput.propTypes = {
  consoleOutputText: PropTypes.arrayOf(PropTypes.string).isRequired,
  isConsoleOpen: PropTypes.bool.isRequired,
  toggleConsole: PropTypes.func.isRequired
};

export default ConsoleOutput;
