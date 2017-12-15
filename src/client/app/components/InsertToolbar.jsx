import React from 'react';
import { render } from 'react-dom';
import EditorSVG from '../images/editor.svg';
import TextSVG from '../images/text.svg';
import EmbedSVG from '../images/embed.svg';

class InsertToolbar extends React.Component {
  render() {
    return (
      <div className="insertToolbar__container">
        <button
          onClick={this.props.addEditor}
          className="insertToolbar__button"
        >
          <EditorSVG alt="add editor" />
          editor
        </button>
        <button
          onClick={this.props.addTextEditor}
          id="elementButton" className="insertToolbar__button"
        >
          <TextSVG alt="add text" />
          text box
        </button>
        <button
          onClick={this.props.addIframe}
          className="insertToolbar__button"
        >
          <EmbedSVG alt="add embed" />
          embed
        </button>
      </div>
    );
  }

}

export default InsertToolbar;
