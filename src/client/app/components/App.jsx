import React from 'react';
import { render } from 'react-dom';

import EditorContainer from './EditorContainer.jsx';
import TextArea from './TextArea.jsx';
import TextToolbar from './TextToolbar.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      consoleOutputText: [],
      styleMap: {
        'STRIKETHROUGH': {
          textDecoration: 'line-through',
        },
        'FONT': {
          fontSize: '54pt',
        },
        'FONTFACE': {
          fontFamily: 'monospace',
        }
      },
      code: "",
      isPlaying: false,
      editorMode: {
        p5: true,
        javascript: false,
        python: false
      }
    }
    this.receiveMessage = this.receiveMessage.bind(this);
    this.updateOutput = this.updateOutput.bind(this);

    this.stopCode = this.stopCode.bind(this);
    this.playCode = this.playCode.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.setEditorMode = this.setEditorMode.bind(this);

    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
    this._onItalicClick = this._onItalicClick.bind(this);
    this._onUnderlineClick = this._onUnderlineClick.bind(this);
    this._onCodeClick = this._onCodeClick.bind(this);
    this._onFontChange = this._onFontChange.bind(this);
    this._onFontfaceChange = this._onFontfaceChange.bind(this);
  }
  updateOutput(consoleOutputText) {
    console.log('updateOutput');
    const tempOutput = this.state.consoleOutputText.slice()
    tempOutput.push(consoleOutputText);
    this.setState({ consoleOutputText: tempOutput })
  }
  receiveMessage(event) {
    console.log('recieveMessage');
    this.updateOutput(event.data.arguments.join());
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
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  _onCodeClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
  }
  _onFontChange(event) {
    const newFontSize = event.target.value + 'pt';
    console.log(newFontSize);
    const tempStyleMap = this.state.styleMap;
    tempStyleMap.FONT.fontSize = newFontSize;
    this.setState({styleMap: tempStyleMap});
    const selection = this.state.editorState.getSelection();
    const content = this.state.editorState.getCurrentContent();
    const newContent = Modifier.applyInlineStyle(content, selection, 'FONT');
    this.onChange(EditorState.push(this.state.editorState, newContent, 'change-inline-style'));
  }
  _onFontfaceChange(event) {
    const newFontface = event.target.value;
    console.log(newFontface);
    const tempStyleMap = this.state.styleMap;
    tempStyleMap.FONTFACE.fontFamily = newFontface;
    this.setState({ styleMap: tempStyleMap });
    const selection = this.state.editorState.getSelection();
    const content = this.state.editorState.getCurrentContent();
    const newContent = Modifier.applyInlineStyle(content, selection, 'FONTFACE');
    this.onChange(EditorState.push(this.state.editorState, newContent, 'change-inline-style'));
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
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
          <TextToolbar
              editorState = {this.state.editorState}
              styleMap = {this.state.styleMap}
              onChange = {this.onChange}
              handleKeyCommand = {this.handleKeyCommand}
              _onBoldClick = {this._onBoldClick}
              _onItalicClick = {this._onItalicClick}
              _onUnderlineClick = {this._onUnderlineClick}
              _onCodeClick = {this._onCodeClick}
              _onFontChange = {this._onFontChange}
              _onFontfaceChange = {this._onFontfaceChange}
            />
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
            receiveMessage = {this.receiveMessage}
            consoleOutputText = {this.state.consoleOutputText}
          />
          <TextArea
            styleMap={this.state.styleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </section>
      </div>
    );
  }

}

export default App;
