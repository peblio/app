import React, { PropTypes } from 'react';
import P5Editor from './p5Editor.jsx'
import JavascriptEditor from './JavascriptEditor.jsx'
import P5Output from './p5Output.jsx'
import JavascriptOutput from './JavascriptOutput.jsx'
import EditorToolbar from './EditorToolbar.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';

class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleOutputText: [],
      code: '',
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
    this.receiveMessage = this.receiveMessage.bind(this);
    this.updateOutput = this.updateOutput.bind(this);
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
  receiveMessage(event) {
    console.log('recieveMessage');
    this.updateOutput(event.data.arguments.join());
  }
  updateOutput(consoleOutputText) {
    console.log('updateOutput');
    const tempOutput = this.state.consoleOutputText.slice()
    tempOutput.push(consoleOutputText);
    this.setState({ consoleOutputText: tempOutput })
  }
  setEditorMode(event) {
    console.log(event.target.value);
    if (!event.target.value.localeCompare('p5')) {
      this.setState({
        editorMode: {
          p5: true,
          javascript: false,
          python: false
        }
      })
    } else if (!event.target.value.localeCompare('javascript')) {
      this.setState({
        editorMode: {
          p5: false,
          javascript: true,
          python: false
        }
      })
    } else if (!event.target.value.localeCompare('python')) {
      this.setState({
        editorMode: {
          p5: false,
          javascript: false,
          python: true
        }
      })
    }
  }
  render() {
    return (
      <div>
        <EditorToolbar
          playCode = {this.playCode}
          stopCode = {this.stopCode}
        />
        <select id="test" onChange={this.setEditorMode}>
          <option value="p5">p5</option>
          <option value="javascript">javascript</option>
          <option value="python">python</option>
        </select>
        {(() => { // eslint-disable-line
          if (this.state.editorMode.p5) {
            return (
              <P5Editor
                editorCode = {this.state.code}
                updateCode = {this.updateCode}
              />
            );
          } else if (this.state.editorMode.javascript) {
            return (
              <JavascriptEditor
                editorCode = {this.state.code}
                updateCode = {this.updateCode}
              />
            );
          }
        })()}
      <ConsoleOutput
        consoleOutputText = {this.state.consoleOutputText}
      />
      {(() => { // eslint-disable-line
        if (this.state.isPlaying) {
          if (this.state.editorMode.p5) {
            return (
              <P5Output
                editorCode = {this.state.code}
                updateCode = {this.updateCode}
                isPlaying = {this.isPlaying}
                receiveMessage = {this.receiveMessage}
              />
            );
          } else if (this.state.editorMode.javascript) {
            return (
              <JavascriptOutput
                editorCode = {this.state.code}
                updateCode = {this.updateCode}
                isPlaying = {this.state.isPlaying}
                receiveMessage = {this.receiveMessage}
                consoleOutputText = {this.state.consoleOutputText}
              />
            );
          }
        }
      })()}

    </div>
    );
  }

}

export default EditorContainer;
