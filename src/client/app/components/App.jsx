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
      currentTextEditorId: 0,
      currentTextEditorState: null,
      noOfEditors: 0,
      noOfTextEditors: 0,
      textEditor: [],
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
    this.renderEditor = this.renderEditor.bind(this);
    this.renderTextEditor = this.renderTextEditor.bind(this);
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
    console.log('Editors: ' , this.state.noOfEditors);
  }
  addTextEditor() {
    let textEditors = this.state.textEditor;
    let newTextEditor = {
      id: 'text-editor-' + this.state.noOfTextEditors,
      editorState: EditorState.createEmpty(),
    };
    textEditors.push(newTextEditor);
    console.log(textEditors);
    this.setState({
      noOfTextEditors: this.state.noOfTextEditors+1,
      textEditor: textEditors,
    })
    console.log('Text Editors: ' , this.state.noOfTextEditors);
  }

  renderEditor() {
    let editors = [];
    if (this.state.noOfEditors> 0) {
      for (let i=0; i < this.state.noOfEditors; i++) {
        editors.push(<EditorContainer />);
      }
      return editors;
    }
    else return [];
  }
  renderTextEditor() {
    let textEditors = [];
    if (this.state.noOfTextEditors > 0) {
      for (let i=0; i < this.state.noOfTextEditors; i++) {
        textEditors.push(<TextEditor
          styleMap={this.state.styleMap}
          editorState={this.state.textEditor[i].editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          setCurrentEditor = {this.setCurrentEditor}
          ref={this.state.textEditor[i].id}
          editorId={this.state.textEditor[i].id}
        />);
      }
      // console.log(textEditors);
      return textEditors;
    }
    else return [];
  }
  onChange(editorState)
  {
    for(let i =0;i<this.state.noOfTextEditors;i++) {
      let ref = this.state.textEditor[i].id;
      console.log(document.activeElement);
      if(document.activeElement.parentElement.parentElement){
        if ( document.activeElement.parentElement.parentElement.parentElement === ReactDOM.findDOMNode(this.refs[ref]) ) {
          this.setState({
            currentTextEditorId: i,
          },() => {
            const temp = this.state.textEditor;
            console.log()
            temp[this.state.currentTextEditorId].editorState = editorState;
            this.setState({
              currentTextEditorState: temp[this.state.currentTextEditorId].editorState,
              textEditor: temp
            });
          });
        }
      } else {
        const temp = this.state.textEditor;
        temp[this.state.currentTextEditorId].editorState = editorState;
        this.setState({
          currentTextEditorState: temp[this.state.currentTextEditorId].editorState,
          textEditor: temp
        });
      }
    }
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
    console.log(newFontSize);
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
    console.log(newFontface);
    const tempStyleMap = this.state.styleMap;
    tempStyleMap.FONTFACE.fontFamily = newFontface;
    this.setState({ styleMap: tempStyleMap });
    const selection = this.state.currentTextEditorState.getSelection();
    const content = this.state.currentTextEditorState.getCurrentContent();
    const newContent = Modifier.applyInlineStyle(content, selection, 'FONTFACE');
    this.onChange(EditorState.push(this.state.currentTextEditorState, newContent, 'change-inline-style'));
  }
  setCurrentEditor(textEditorState,textEditorId) {
    console.log(textEditorState);
    this.setState({
      currentTextEditorState: textEditorState,
      currentTextEditorId: textEditorId
    });
  }
  handleKeyCommand(command) {
    console.log(this.state.currentTextEditorState);
    const newState = RichUtils.handleKeyCommand(this.state.currentTextEditorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const Editors = this.renderEditor();
    const TextEditors = this.renderTextEditor();
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
