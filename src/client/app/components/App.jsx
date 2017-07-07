import React from 'react';
import { render } from 'react-dom';

import P5Editor from './p5Editor.jsx'
import EditorToolbar from './EditorToolbar.jsx';
import TextToolbar from './TextToolbar.jsx';
import Output from './Output.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "poo"
    }
    this.updateCode = this.updateCode.bind(this);
  }
  updateCode(value) {
    console.log("updating code");
    console.log(value);
    console.log(this.state.code);
    this.setState({
      code: value
    });
  }
  render() {
    return (
      <div>
        <nav>
          <EditorToolbar/>
          <TextToolbar/>
        </nav>
        <section>
          <P5Editor
            editorCode = {this.state.code}
            updateCode = {this.updateCode}
          />
          <Output
            editorCode = {this.state.code}
          />
        </section>
      </div>
    );
  }

}

export default App;
