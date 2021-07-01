import { ReactReplView } from 'awesome-react-repl';
import React from 'react';
import Sk from 'skulpt';


class PythonRepl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      inputLines: [],
    };
  }

  outf = (text) => {
    const lines = this.state.lines;
    lines.push({ type: 'output', value: text });
    this.setState(prevState => ({ lines, inputLines: prevState.inputLines }));
  }

  onSubmit = (input) => {
    Sk.configure({ output: this.outf, read: this.builtinRead, retainglobals: true });
    const inputLines = this.state.inputLines;
    inputLines.push({ type: 'input', value: input });
    this.setState(() => ({ lines: [], inputLines }));
    inputLines.forEach((inputLine) => {
      const lines = this.state.lines;
      lines.push({ type: 'input', value: input });
      this.setState(prevState => ({ lines, inputLines: prevState.inputLines }));
      console.log('pushing input', lines);
      const myPromise = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('repl', false, inputLine.value, true));
      myPromise.then((mod) => {
        console.log('success');
      },
      (err) => {
        const existingLines = this.state.lines;
        existingLines.push({ type: 'error', value: err.toString() });
        this.setState(prevState => ({ lines: existingLines, inputLines: prevState.inputLines }));
      });
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
};


export default PythonRepl;
