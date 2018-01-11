import React, { PropTypes } from 'react';
import { RichUtils } from 'draft-js';
import BoldSVG from '../images/textbox/bold.svg';
import ItalicsSVG from '../images/textbox/italics.svg';
import StrikethroughSVG from '../images/textbox/strikethrough.svg';
import UnderlineSVG from '../images/textbox/underline.svg';





class TextToolbar extends React.Component {
  render() {
    return (
      <div className="textToolbar__container">
        <button
          className="textToolbar__button"
          onClick={() => { this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'BOLD')); }}
        >
          <BoldSVG alt="bold text" />
        </button>
        <button
          className="textToolbar__button"
          onClick={() => { this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'UNDERLINE')); }}
        >
          <UnderlineSVG alt="underline text" />
        </button>
        <button
          className="textToolbar__button"
          onClick={() => { this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'ITALIC')); }}
        >
          <ItalicsSVG alt="italicise text" />
        </button>
        <button
          className="textToolbar__button"
          onClick={() => { this.props.onChange(RichUtils.toggleInlineStyle(this.props.currentTextEditorState, 'STRIKETHROUGH')); }}
        >
          <StrikethroughSVG alt="strikethrough text" />
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
