import React from 'react';
import { render } from 'react-dom';
const ReactDOM = require('react-dom');

import EditorContainer from './EditorContainer.jsx';
import TextEditor from './TextEditor.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';
import MainToolbar from './MainToolbar.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      editors: {},
      currentEditorId: 'editor-0',
      currentTextEditorId: 'text-editor-0',
      currentTextEditorState: null,
      noOfEditors: 0,
      noOfTextEditors: 0,
      textEditors: {},
      styleMap: {
        STRIKETHROUGH: {
          textDecoration: 'line-through',
        },
        FONT: {
          fontSize: '54pt',
        },
        FONTFACE: {
          fontFamily: 'monospace',
        }
      }
    }

    this.addEditor = this.addEditor.bind(this);
    this.addTextEditor = this.addTextEditor.bind(this);
    this.renderEditors = this.renderEditors.bind(this);
    this.renderTextEditors = this.renderTextEditors.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
    this._onItalicClick = this._onItalicClick.bind(this);
    this._onUnderlineClick = this._onUnderlineClick.bind(this);
    this._onCodeClick = this._onCodeClick.bind(this);
    this._onFontChange = this._onFontChange.bind(this);
    this._onFontfaceChange = this._onFontfaceChange.bind(this);
    this.setCurrentTextEditor = this.setCurrentTextEditor.bind(this);
    this.setCurrentEditor = this.setCurrentEditor.bind(this);
    //for the editorMode
    this.stopCode = this.stopCode.bind(this);
    this.playCode = this.playCode.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.setEditorMode = this.setEditorMode.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.updateOutput = this.updateOutput.bind(this);
  }
  addEditor() {
    let editors = this.state.editors;
    let newEditorId = 'editor-' + this.state.noOfEditors;
    let newEditor = {
      id: newEditorId,
      consoleOutputText: [],
      code: '',
      isPlaying: false,
      editorMode: {
        p5: true,
        javascript: false,
        python: false
      },
    };

    editors[newEditorId]= newEditor;
    this.setState({
      noOfEditors: this.state.noOfEditors+1,
      editors: editors
    })
  }

  renderEditors() {
    let editors = [];
    let ids = Object.keys(this.state.editors);
    ids.forEach((id) => {
      editors.push(<EditorContainer
        playCode = {this.playCode}
        stopCode = {this.stopCode}
        updateCode = {this.updateCode}
        setEditorMode = {this.setEditorMode}
        receiveMessage = {this.receiveMessage}
        updateOutput = {this.updateOutput}
        editorMode = {this.state.editors[id].editorMode}
        editorId={this.state.editors[id].id}
        setCurrentEditor = {this.setCurrentEditor}
        consoleOutputText = {this.state.editors[id].consoleOutputText}
        code = {this.state.editors[id].code}
        isPlaying = {this.state.editors[id].isPlaying}
      />);
    });

    return editors;
  }
  addTextEditor() {
    let textEditors = this.state.textEditors;
    let newTextEditorId = 'text-editor-' + this.state.noOfTextEditors;
    let newTextEditor = {
      id: newTextEditorId,
      editorState: EditorState.createEmpty(),
    };

    textEditors[newTextEditorId]= newTextEditor;

    this.setState({
      noOfTextEditors: this.state.noOfTextEditors+1,
      textEditors: textEditors
    });
  }


  renderTextEditors() {
    let textEditors = [];
    let ids = Object.keys(this.state.textEditors);
    ids.forEach((id) => {
      textEditors.push(<TextEditor
        styleMap={this.state.styleMap}
        editorState={this.state.textEditors[id].editorState}
        onChange={this.onChange}
        handleKeyCommand={this.handleKeyCommand}
        setTextEditor = {this.setTextEditor}
        setCurrentTextEditor = {this.setCurrentTextEditor}
        ref={this.state.textEditors[id].id}
        editorId={this.state.textEditors[id].id}
      />);
    });

    return textEditors;
  }

  onChange(editorState)
  {
    let ids = Object.keys(this.state.textEditors);
    ids.forEach((id) => {
      let ref = this.state.textEditors[id].id;

        if (document.activeElement.parentElement.parentElement.classList.value.localeCompare('DraftEditor-root')==0) {
          if ( document.activeElement.parentElement.parentElement.parentElement === ReactDOM.findDOMNode(this.refs[ref]) ) {
            this.setState({
              currentTextEditorId: id,
            },() => {
              let temp = this.state.textEditors;
              temp[this.state.currentTextEditorId].editorState = editorState;
              this.setState({
                currentTextEditorState: temp[this.state.currentTextEditorId].editorState,
                textEditors: temp
              });
            });
          }
        } else {

          let temp = this.state.textEditors;
          temp[this.state.currentTextEditorId].editorState = editorState;
          this.setState({
            currentTextEditorState: temp[this.state.currentTextEditorId].editorState,
            textEditors: temp
          });
        }
    });
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.currentTextEditorState, 'BOLD'));
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.currentTextEditorState, 'ITALIC'));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.currentTextEditorState, 'UNDERLINE'));
  }
  _onCodeClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.currentTextEditorState, 'STRIKETHROUGH'));
  }
  _onFontChange(event) {
    const newFontSize = event.target.value + 'pt';
    const tempStyleMap = this.state.styleMap;
    tempStyleMap.FONT.fontSize = newFontSize;
    this.setState({styleMap: tempStyleMap});
    const selection = this.state.currentTextEditorState.getSelection();
    const content = this.state.currentTextEditorState.getCurrentContent();
    const newContent = Modifier.applyInlineStyle(content, selection, 'FONT');
    this.onChange(EditorState.push(this.state.currentTextEditorState, newContent, 'change-inline-style'));
  }
  _onFontfaceChange(event) {
    const newFontface = event.target.value;
    const tempStyleMap = this.state.styleMap;
    tempStyleMap.FONTFACE.fontFamily = newFontface;
    this.setState({ styleMap: tempStyleMap });
    const selection = this.state.currentTextEditorState.getSelection();
    const content = this.state.currentTextEditorState.getCurrentContent();
    const newContent = Modifier.applyInlineStyle(content, selection, 'FONTFACE');
    this.onChange(EditorState.push(this.state.currentTextEditorState, newContent, 'change-inline-style'));
  }
  setCurrentTextEditor(textEditorState,textEditorId) {
    this.setState({
      currentTextEditorState: textEditorState,
      currentTextEditorId: textEditorId
    });
  }
  setCurrentEditor(editorId) {
    this.setState({
      currentEditorId: editorId
    });
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.currentTextEditorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  //for the editorMode
  updateCode(value) {
    let editors = this.state.editors;
    // debugger;
    editors[this.state.currentEditorId].code = value;
    this.setState({
      editors: editors
    });

  }
  stopCode() {
    let editors = this.state.editors;
    editors[this.state.currentEditorId].isPlaying = false;
    editors[this.state.currentEditorId].consoleOutputText = [];
    this.setState({
      editors: editors
    });
  }
  playCode() {
    let editors = this.state.editors;
    editors[this.state.currentEditorId].isPlaying = true;
    this.setState({
      editors: editors
    });
  }
  receiveMessage(event) {
    this.updateOutput(event.data.arguments.join());
  }
  updateOutput(consoleOutputText) {
    let editors = this.state.editors;
    const tempOutput = editors[this.state.currentEditorId].consoleOutputText.slice()
    tempOutput.push(consoleOutputText);
    editors[this.state.currentEditorId].consoleOutputText = tempOutput;
    this.setState({
      editors: editors
    });
  }
  setEditorMode(event) {
    let editors = this.state.editors;
    let editorMode = editors[this.state.currentEditorId].editorMode;
    let editorKeys = Object.keys(editorMode);
    editorKeys.forEach(function(editorKey) {
      editorMode[editorKey] = false;
    });
    editorMode[event.target.value] = true;
    this.setState({
      editors: editors
    })
  }

  render() {
    const Editors = this.renderEditors();;
    const TextEditors = this.renderTextEditors();
    return (
      <div>
        <nav>
          <MainToolbar
            _onBoldClick = {this._onBoldClick}
            _onItalicClick = {this._onItalicClick}
            _onUnderlineClick = {this._onUnderlineClick}
            _onCodeClick = {this._onCodeClick}
            _onFontChange = {this._onFontChange}
            _onFontfaceChange = {this._onFontfaceChange}
            addEditor = {this.addEditor}
            addTextEditor = {this.addTextEditor}
          />
        </nav>
        <section>

          {Editors}
          {TextEditors}
        </section>
      </div>
    );
  }

}

export default App;
