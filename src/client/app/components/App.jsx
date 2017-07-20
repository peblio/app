import React from 'react';
import { render } from 'react-dom';

import EditorContainer from './EditorContainer.jsx';
import TextArea from './TextArea.jsx';
import TextToolbar from './TextToolbar.jsx';

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
    this.stopCode = this.stopCode.bind(this);
    this.playCode = this.playCode.bind(this);
    this.updateCode = this.updateCode.bind(this);
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
    this.setState({
      code: value
    });
  }
  stopCode() {
    this.setState({
      isPlaying: false
    })
  }
  playCode() {
    this.setState({
      isPlaying: true
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
            playCode = {this.playCode}
            stopCode = {this.stopCode}
            editorMode = {this.state.editorMode}
            setEditorMode= {this.setEditorMode}
          />
          <TextArea/>
        </section>
      </div>
    );
  }

}

export default App;
