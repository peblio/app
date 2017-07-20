import React from 'react';
import { render } from 'react-dom';

import EditorContainer from './EditorContainer.jsx';
import TextToolbar from './TextToolbar.jsx';
import OutputContainer from './OutputContainer.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
      isPlaying: false,
      editorMode: {
        p5: true,
        javascript: false,
        python: false
      }
    }
    this.updateCode = this.updateCode.bind(this);
    this.executeCode = this.executeCode.bind(this);
    this.setEditorMode = this.setEditorMode.bind(this);
  }
  setEditorMode(event) {
    console.log(event.target.value);
    if(!event.target.value.localeCompare("p5")) {
      this.setState({
        editorMode: {
          p5: true,
          javascript: false,
          python: false
        }
      })
    } else if(!event.target.value.localeCompare("javascript")) {
      this.setState({
        editorMode: {
          p5: false,
          javascript: true,
          python: false
        }
      })
    } else if(!event.target.value.localeCompare("python")) {
      this.setState({
        editorMode: {
          p5: false,
          javascript: false,
          python: true
        }
      })
    }
  }

  updateCode(value) {
    console.log("updating code");
    console.log(value);
    console.log(this.state.code);
    this.setState({
      code: value
    });
  }
  executeCode(value) {
    console.log("toggle sketch playing");
    console.log('********');
    console.log(this.state.isPlaying);
    console.log('********');
    this.setState ({
      isPlaying: !this.state.isPlaying
    })
  }
  render() {
    return (
      <div>
        <nav>
          <TextToolbar/>
        </nav>
        <section>
          <EditorContainer
            editorCode = {this.state.code}
            updateCode = {this.updateCode}
            isPlaying = {this.state.isPlaying}
            executeCode = {this.executeCode}
            editorMode = {this.state.editorMode}
            setEditorMode= {this.setEditorMode}
          />
        <OutputContainer
            editorCode = {this.state.code}
            isPlaying = {this.state.isPlaying}
            editorMode = {this.state.editorMode}
          />
        </section>
      </div>
    );
  }

}

export default App;
