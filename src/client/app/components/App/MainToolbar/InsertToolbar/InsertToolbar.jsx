import React from 'react';
import PropTypes from 'prop-types';

import EditorSVG from '../../../../images/editor.svg';
import EmbedSVG from '../../../../images/embed.svg';
import ImageSVG from '../../../../images/image.svg';
import QuestionSVG from '../../../../images/question.svg';
import TextSVG from '../../../../images/text.svg';

require('./insertToolbar.scss');


class InsertToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorExpanded: false
    };
    this.toggleEditorOptions = this.toggleEditorOptions.bind(this);
  }

  toggleEditorOptions() {
    this.setState({
      editorExpanded: !this.state.editorExpanded
    });
  }

  render() {
    return (
      <div className="insert-toolbar__container insert-toolbar__expand">
        <button
          className="insert-toolbar__button "
          onClick={this.toggleEditorOptions}
        >
          <EditorSVG alt="add code editor" />
          Editor
          {this.state.editorExpanded &&
          <div className="insert-toolbar__sub-menu">
            <ul className="insert-toolbar__list">
              <li className="insert-toolbar__list-item">
                <button
                  className="insert-toolbar__list-button"
                  onClick={() => {
                    this.props.addCodeEditor('html', this.props.currentWidget);
                    this.toggleEditorOptions();
                  }
                  }
                >
                   HTML
                </button>
              </li>
              <li className="insert-toolbar__list-item">
                <button
                  className="insert-toolbar__list-button"
                  onClick={() => {
                    this.props.addCodeEditor('webdev', this.props.currentWidget);
                    this.toggleEditorOptions();
                  }
                  }
                >
                   HTML/JS/CSS
                </button>
              </li>
              <li className="insert-toolbar__list-item">
                <button
                  className="insert-toolbar__list-button"
                  onClick={() => {
                    this.props.addCodeEditor('p5', this.props.currentWidget);
                    this.toggleEditorOptions();
                  }
                  }
                >
                   P5
                </button>
              </li>
            </ul>
          </div>
        }
        </button>
        <button
          onClick={() => this.props.addTextEditor(this.props.currentWidget)}
          id="elementButton" className="insert-toolbar__button"
        >
          <TextSVG alt="add text" />
          Textbox
        </button>
        <button
          onClick={() => this.props.addIframe(this.props.currentWidget)}
          className="insert-toolbar__button"
        >
          <EmbedSVG alt="add embed" />
          Embed
        </button>
        <button
          onClick={() => this.props.addQuestionEditor(this.props.currentWidget)}
          id="elementButton" className="insert-toolbar__button"
        >
          <QuestionSVG alt="add question" />
          Question
        </button>
        <button
          onClick={() => { this.props.addImage(this.props.currentWidget); }}
          id="elementButton" className="insert-toolbar__button"
        >
          <ImageSVG alt="add image" />
          Image
        </button>
      </div>
    );
  }

}

InsertToolbar.propTypes = {
  addCodeEditor: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  addQuestionEditor: PropTypes.func.isRequired
};

export default InsertToolbar;
