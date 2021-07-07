import { ReactReplView } from 'awesome-react-repl';
import React from 'react';
import PropTypes from 'prop-types';
import Sk from 'skulpt';

class PythonRepl extends React.Component {
  outf = (text) => {
    this.props.updateReplLines({ type: 'output', value: text });
  }

  onSubmit = (input) => {
    Sk.configure({ output: this.outf, read: this.builtinRead, retainglobals: true });
    this.props.updateReplLines({ type: 'input', value: input });

    const myPromise = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('repl', false, input, true));
    myPromise.then((mod) => {
      console.log('success');
    },
    (err) => {
      this.props.updateReplLines({ type: 'error', value: err.toString() });
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
          lines={this.props.pythonReplLines}
        />
      </div>
    );
  }
}

PythonRepl.propTypes = {
  updateReplLines: PropTypes.func.isRequired,
  pythonReplLines: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired
};


export default PythonRepl;
