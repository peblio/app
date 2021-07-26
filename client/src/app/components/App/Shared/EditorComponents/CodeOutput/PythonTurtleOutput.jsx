import React from 'react';
import PropTypes from 'prop-types';

require('./pythonTurtleOutput.scss');

class PythonTurtleOutput extends React.Component {
  render() {
    return (
      <div id={`python-graphic-output-${this.props.id}`} className="console__output-text">
      </div>
    );
  }
}

PythonTurtleOutput.propTypes = {
  id: PropTypes.string.isRequired
};

export default PythonTurtleOutput;
