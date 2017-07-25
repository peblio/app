import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      styleMap: {
        'STRIKETHROUGH': {
          textDecoration: 'line-through',
        },
        'FONT': {
          fontSize: '54pt',
        }
      }
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
    this._onItalicClick = this._onItalicClick.bind(this);
    this._onUnderlineClick = this._onUnderlineClick.bind(this);
    this._onCodeClick = this._onCodeClick.bind(this);
    this._onFontChange = this._onFontChange.bind(this);
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
    this.setState(styleMap: tempStyleMap);
    const selection = this.state.editorState.getSelection();
    const content = this.state.editorState.getCurrentContent();
    const newContent = Modifier.applyInlineStyle(content, selection, 'FONT');
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
  componentDidUpdate() {

    console.log(this.state.editorState);
  }
  render() {
    return (
      <div>
        <div>
          <button
            onClick={this._onBoldClick}
          >
            B
          </button>
          <button
            onClick={this._onUnderlineClick}
          >
            U
          </button>
          <button
            onClick={this._onItalicClick}
          >
            I
          </button>
          <button
            onClick={this._onCodeClick}
          >
            -
          </button>
          <select name="font-size" onChange={this._onFontChange}>
            <option value="20">20</option>
            <option value="24">24</option>
            <option value="32">32</option>
            <option value="48">48</option>
          </select>
        </div>

        <Editor
          customStyleMap={this.state.styleMap}
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Enter some text..."
          handleKeyCommand={this.handleKeyCommand}
        />
      </div>
    );
  }
}

export default TextArea;
