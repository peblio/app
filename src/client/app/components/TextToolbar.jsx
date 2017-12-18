import React from 'react';
import { RichUtils } from 'draft-js';

class TextToolbar extends React.Component {
  render() {
    return (
      <div className="textToolbar__container">
        <button
          className="textToolbar__button"
          onClick={() => { this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'BOLD')); }}
        >
          Bold
        </button>
        <button
          className="textToolbar__button"
          onClick={() => { this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'UNDERLINE')); }}
        >
          Underline
        </button>
        <button
          className="textToolbar__button"
          onClick={() => { this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'ITALIC')); }}
        >
          Italics
        </button>
        <button
          className="textToolbar__button"
          onClick={() => { this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'STRIKETHROUGH')); }}
        >
          Strike
        </button>
      </div>
    );
  }
}

export default TextToolbar;
