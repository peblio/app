import React from 'react';
import PropTypes from 'prop-types';
import srcDoc from 'srcdoc-polyfill';
import Sk from 'skulpt';

class PythonOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: ''
    };
  }

  componentDidMount() {
    Sk.configure({ output: this.outf, read: this.builtinRead });
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
    console.log('Output is', text);
    this.setState({ output: text });
  }

  builtinRead = (x) => {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
      throw new Error(`File not found: '${x}'`);
    }
    return Sk.builtinFiles.files[x];
  }


  startSketch=() => {
    const myPromise = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, this.props.files[0].content, true));
    myPromise.then((mod) => {
      console.log('success');
    },
    (err) => {
      console.log('ERROR', err.toString());
      this.setState({ output: err.toString() });
    });
  }

  stopSketch=() => {
    this.setState({ output: '' });
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
        {this.state.output}
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
  updateConsoleOutput: PropTypes.func.isRequired
};

export default PythonOutput;
