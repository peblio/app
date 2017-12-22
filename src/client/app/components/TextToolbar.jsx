import React, { PropTypes } from 'react';
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

TextToolbar.propTypes = {
  currentTextEditorState: PropTypes.shape.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextToolbar;
