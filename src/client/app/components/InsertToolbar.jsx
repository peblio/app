import React from 'react';
import PropTypes from 'prop-types';

import EditorSVG from '../images/editor.svg';
import EmbedSVG from '../images/embed.svg';
import QuestionSVG from '../images/question.svg';
import TextSVG from '../images/text.svg';

class InsertToolbar extends React.Component {
  render() {
    return (
      <div className="insert-toolbar__container">
        <button
          onClick={this.props.addCodeEditor}
          className="insert-toolbar__button"
        >
          <EditorSVG alt="add code editor" />
          Editor
        </button>
        <button
          onClick={this.props.addTextEditor}
          id="elementButton" className="insert-toolbar__button"
        >
          <TextSVG alt="add text" />
          Textbox
        </button>
        <button
          onClick={this.props.addIframe}
          className="insert-toolbar__button"
        >
          <EmbedSVG alt="add embed" />
          Embed
        </button>
        <button
          onClick={this.props.addQuestionEditor}
          id="elementButton" className="insert-toolbar__button"
        >
          <QuestionSVG alt="add question" />
          Question
        </button>
      </div>
    );
  }

}

InsertToolbar.propTypes = {
  addCodeEditor: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  addQuestionEditor: PropTypes.func.isRequired
};

export default InsertToolbar;
