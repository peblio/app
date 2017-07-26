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
    console.log('test');
  }


  render() {
    return (
      <div>
        <div>
          <button
            onClick={this.props._onBoldClick}
          >
            B
          </button>
          <button
            onClick={this.props._onUnderlineClick}
          >
            U
          </button>
          <button
            onClick={this.props._onItalicClick}
          >
            I
          </button>
          <button
            onClick={this.props._onCodeClick}
          >
            -
          </button>
          <select name="fontface" onChange={this.props._onFontfaceChange}>
            <option value="Arial, Helvetica, sans-serif">Arial</option>
            <option value="Impact, Charcoal, sans-serif">Impact</option>
            <option value="Times New Roman, Times, serif">Times New Roman</option>
          </select>
          <select name="font-size" onChange={this.props._onFontChange}>
            <option value="20">20</option>
            <option value="24">24</option>
            <option value="32">32</option>
            <option value="48">48</option>
          </select>
        </div>

        <Editor
          customStyleMap={this.props.styleMap}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          placeholder="Enter some text..."
          handleKeyCommand={this.props.handleKeyCommand}
        />
      </div>
    );
  }
}

export default TextArea;
