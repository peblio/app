import React from 'react';
import PropTypes from 'prop-types';

class PythonTurtleOutput extends React.Component {
  render() {
    return (
      <div id={`python-graphic-output-${this.props.id}`}>
      </div>
    );
  }
}

PythonTurtleOutput.propTypes = {
  id: PropTypes.string.isRequired
};

export default PythonTurtleOutput;
