import React from 'react';
import { render } from 'react-dom';
const ReactDOM = require('react-dom');

import EditorContainer from './EditorContainer.jsx';
import TextEditor from './TextEditor.jsx';
import TextToolbar from './TextToolbar.jsx';
import MainToolbar from './MainToolbar.jsx';
import ConsoleOutput from './ConsoleOutput.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
    this.setCurrentEditor = this.setCurrentEditor.bind(this);
  }
  addEditor() {
    this.setState({
      noOfEditors: this.state.noOfEditors+1,
    })
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
      textEditors: textEditors,
    });
  }

  renderEditors() {
    let editors = [];
    if (this.state.noOfEditors> 0) {
      for (let i=0; i < this.state.noOfEditors; i++) {
        editors.push(<EditorContainer />);
      }
      return editors;
    }
    else return [];
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
        setCurrentEditor = {this.setCurrentEditor}
        ref={this.state.textEditors[id].id}
        editorId={this.state.textEditors[id].id}
      />);
    });

    return textEditors;
  }

  onChange(editorState)
  {
    console.log('calling onChange');
    // console.log(this.state.currentTextEditorId);
    // let textEditors = this.state.textEditors;
    // console.log(textEditors);
    // console.log(this.state.currentTextEditorId);
    // textEditors[this.state.currentTextEditorId].editorState = editorState;
    // this.setState({
    //   currentTextEditorState: editorState,
    //   textEditors: textEditors
    // });

    let ids = Object.keys(this.state.textEditors);
    ids.forEach((id) => {
      let ref = this.state.textEditors[id].id;
      console.log( );
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
          console.log(this.state.textEditors);
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
  setCurrentEditor(textEditorState,textEditorId) {
    this.setState({
      currentTextEditorState: textEditorState,
      currentTextEditorId: textEditorId
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

  render() {
    const Editors = this.renderEditors();
    const TextEditors = this.renderTextEditors();
    return (
      <div>
        <nav>
          <TextToolbar
              _onBoldClick = {this._onBoldClick}
              _onItalicClick = {this._onItalicClick}
              _onUnderlineClick = {this._onUnderlineClick}
              _onCodeClick = {this._onCodeClick}
              _onFontChange = {this._onFontChange}
              _onFontfaceChange = {this._onFontfaceChange}

            />
        </nav>
        <section>
          <MainToolbar
            addEditor = {this.addEditor}
            addTextEditor = {this.addTextEditor}
          />
          {Editors}
          {TextEditors}
        </section>
      </div>
    );
  }

}

export default App;
