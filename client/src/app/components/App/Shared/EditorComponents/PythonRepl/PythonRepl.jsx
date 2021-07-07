import { ReactReplView } from 'awesome-react-repl';
import React from 'react';
import PropTypes from 'prop-types';
import Sk from 'skulpt';

class PythonRepl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: []
    };
  }

  outf = (text) => {
    const lines = this.state.lines;
    lines.push({ type: 'output', value: text });
    this.props.updateReplLines({ type: 'output', value: text });
    this.setState({ lines });
  }

  onSubmit = (input) => {
    Sk.configure({ output: this.outf, read: this.builtinRead, retainglobals: true });
    const lines = this.state.lines;
    lines.push({ type: 'input', value: input });
    this.props.updateReplLines({ type: 'input', value: input });
    this.setState({ lines });

    const myPromise = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('repl', false, input, true));
    myPromise.then((mod) => {
      console.log('success');
    },
    (err) => {
      const lines = this.state.lines;
      lines.push({ type: 'error', value: err.toString() });
      this.props.updateReplLines({ type: 'error', value: err.toString() });
      this.setState({ lines });
    });
  }


  builtinRead = (x) => {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
      throw new Error(`File not found: '${x}'`);
    }
    return Sk.builtinFiles.files[x];
  }

  render() {
    return (
      <div>
        <ReactReplView
          title="My Awesome Repl!"
          tabs={['Python']}
          selectedTab="Python"
          onSubmit={this.onSubmit}
          onClear={console.log('Cleared')}
          height={200}
          lines={this.state.lines}
        />
      </div>
    );
  }
}

PythonRepl.propTypes = {
  updateReplLines: PropTypes.func.isRequired,
  replLines: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired
};


export default PythonRepl;
