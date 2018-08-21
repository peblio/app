import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';
import FrontEndOutput from './FrontEndOutput.jsx';
import ProcessingOutput from './ProcessingOutput.jsx';

const NOT_EXTERNAL_LINK_REGEX = /^(?!(http:\/\/|https:\/\/))/;

class CodeOutput extends React.Component {
  render() {
    return (
      <div>
        {
          ['p5', 'html', 'webdev'].includes(this.props.editorMode) && (
            <FrontEndOutput
              id={this.props.id}
              clearConsoleOutput={this.props.clearConsoleOutput}
              files={this.props.files}
              isPlaying={this.props.isPlaying}
              isRefreshing={this.props.isRefreshing}
              stopCodeRefresh={this.props.stopCodeRefresh}
              updateConsoleOutput={this.props.updateConsoleOutput}
            />
          )}
        {
          ['processing'].includes(this.props.editorMode) && (
            <ProcessingOutput
              id={this.props.id}
              clearConsoleOutput={this.props.clearConsoleOutput}
              files={this.props.files}
              isPlaying={this.props.isPlaying}
              isRefreshing={this.props.isRefreshing}
              stopCodeRefresh={this.props.stopCodeRefresh}
              updateConsoleOutput={this.props.updateConsoleOutput}
            />
          )
        }

      </div>
    );
  }
}

CodeOutput.propTypes = {
  id: PropTypes.string.isRequired,
  clearConsoleOutput: PropTypes.func.isRequired,
  editorMode: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired
};

export default CodeOutput;
