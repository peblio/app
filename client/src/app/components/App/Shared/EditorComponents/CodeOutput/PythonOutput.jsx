import React from 'react';
import PropTypes from 'prop-types';
import Sk from 'skulpt';

class PythonOutput extends React.Component {
  componentDidMount() {
    this.startSketch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isRefreshing === false && this.props.isRefreshing === true) {
      this.props.stopCodeRefresh();
      this.stopSketch();
      this.startSketch();
    }
  }

  componentWillUnmount() {
    this.stopSketch();
  }

  outf = (text) => {
    this.props.updateReplLines({ type: 'output', value: text });
  }

  builtinRead = (x) => {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
      throw new Error(`File not found: '${x}'`);
    }
    return Sk.builtinFiles.files[x];
  }


  startSketch=() => {
    Sk.configure({ output: this.outf, read: this.builtinRead });
    this.stopSketch();
    this.state = {
      lines: []
    };
    const myPromise = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, this.props.files[0].content, true));
    myPromise.then((mod) => {},
      (err) => {
        this.props.updateReplLines({ type: 'error', value: err.toString() });
      });
  }

  stopSketch=() => {
    this.props.clearConsoleOutput();
  }

  render() {
    return (
      <div
        title="python output"
        ref={(element) => { this.iframe = element; }}
        id="code-output"
        data-test="sketch-output"
        name="python-output"
      >
        {this.state.lines.map(line => <div>{line}</div>)}
      </div>
    );
  }
}

PythonOutput.propTypes = {
  clearConsoleOutput: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  updateReplLines: PropTypes.func.isRequired,
};

export default PythonOutput;
