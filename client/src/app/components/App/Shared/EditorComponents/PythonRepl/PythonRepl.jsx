import { ReactReplView } from 'awesome-react-repl';
import React from 'react';
import PropTypes from 'prop-types';
import Sk from 'skulpt';

require('./pythonRepl.scss');

class PythonRepl extends React.Component {
  componentDidMount() {
    if (this.props.isPlaying) {
      this.startSketch();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isRefreshing === false && this.props.isRefreshing === true) {
      this.props.stopCodeRefresh();
      this.startSketch();
    }
  }

  outf = (text) => {
    this.props.updateReplLines({ type: 'output', value: text });
  }

  startSketch=() => {
    Sk.configure({ output: this.outf, read: this.builtinRead });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = `python-graphic-output-${this.props.id}`;
    this.state = {
      lines: []
    };
    const myPromise = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, this.props.files[0].content, true));
    myPromise.then((mod) => {},
      (err) => {
        this.props.updateReplLines({ type: 'error', value: err.toString() });
      });
    this.props.stopCode();
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
      <div className="python-repl-wrapper">
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
  id: PropTypes.string.isRequired,
  updateReplLines: PropTypes.func.isRequired,
  pythonReplLines: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  stopCode: PropTypes.func.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
};


export default PythonRepl;
