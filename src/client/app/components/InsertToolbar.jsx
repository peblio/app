import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import EditorSVG from '../images/editor.svg';
import TextSVG from '../images/text.svg';
import EmbedSVG from '../images/embed.svg';

class InsertToolbar extends React.Component {
  render() {
    return (
      <div className="insertToolbar__container">
        <button
          onClick={this.props.addCodeEditor}
          className="insertToolbar__button"
        >
          <EditorSVG alt="add code editor" />
          EDITOR
        </button>
        <button
          onClick={this.props.addTextEditor}
          id="elementButton" className="insertToolbar__button"
        >
          <TextSVG alt="add text" />
          TEXTBOX
        </button>
        <button
          onClick={this.props.addIframe}
          className="insertToolbar__button"
        >
          <EmbedSVG alt="add embed" />
          EMBED
        </button>
      </div>
    );
  }

}

InsertToolbar.propTypes = {
  addCodeEditor: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired
};

export default InsertToolbar;
