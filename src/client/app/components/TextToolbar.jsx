import React from 'react';
import {RichUtils} from 'draft-js';

class TextToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="textToolbar__container">
        <button className="textToolbar__button"
          onClick={() => {this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'BOLD'))}}
        >
          Bold
        </button>
        <button className="textToolbar__button"
          onClick={() => {this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'UNDERLINE'))}}
        >
          Underline
        </button>
        <button className="textToolbar__button"
          onClick={() => {this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'ITALIC'))}}
        >
          Italics
        </button>
        <button className="textToolbar__button"
          onClick={() => {this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'STRIKETHROUGH'))}}
        >
          Strike
        </button>
        <select className="textToolbar__select" name="fontface" onChange={this.props._onFontfaceChange}>
          <option value="Arial, Helvetica, sans-serif">Arial</option>
          <option value="Impact, Charcoal, sans-serif">Impact</option>
          <option value="Times New Roman, Times, serif">Times New Roman</option>
        </select>
        <select className="textToolbar__select" name="font-size" onChange={this.props._onFontChange}>
          <option value="20">20</option>
          <option value="24">24</option>
          <option value="32">32</option>
          <option value="48">48</option>
        </select>
      </div>
    );
  }
}

export default TextToolbar;
