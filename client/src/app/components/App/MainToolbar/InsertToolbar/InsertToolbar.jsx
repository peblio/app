import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import EditorSVG from '../../../../images/editor.svg';
import EmbedSVG from '../../../../images/embed.svg';
import ImageSVG from '../../../../images/image.svg';
import QuestionSVG from '../../../../images/question.svg';
import TextSVG from '../../../../images/text.svg';
import PreferencesSVG from '../../../../images/preferences.svg';

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
    const prefButtonClassName = classNames('insert-toolbar__pref', {
      'insert-toolbar__pref--open': this.props.isPreferencesPanelOpen
    });
    return (
      <div className="insert-toolbar__container insert-toolbar__expand">
        <div className="insert-toolbar__container-left">
          <button
            className="insert-toolbar__button "
            onClick={this.toggleEditorOptions}
          >
            <EditorSVG alt="add code editor" />
          Editor
          </button>
          {this.state.editorExpanded && (
            <div className="insert-toolbar__sub-menu">
              <ul className="insert-toolbar__list">
                <li className="insert-toolbar__list-item">
                  <button
                    className="insert-toolbar__list-button"
                    onClick={() => {
                      this.toggleEditorOptions();
                      this.props.addCodeEditor('html');
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
                      this.toggleEditorOptions();
                      this.props.addCodeEditor('webdev');
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
                      this.toggleEditorOptions();
                      this.props.addCodeEditor('p5');
                    }
                    }
                  >
                 P5
                  </button>
                </li>
              </ul>
            </div>
          )}
          <button
            onClick={this.props.addTextEditor}
            id="elementButton"
            className="insert-toolbar__button"
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
            id="elementButton"
            className="insert-toolbar__button"
          >
            <QuestionSVG alt="add question" />
          Question
          </button>
          <button
            onClick={this.props.addImage}
            id="elementButton"
            className="insert-toolbar__button"
          >
            <ImageSVG alt="add image" />
          Image
          </button>
        </div>
        <div className="insert-toolbar__container-right">
          <button
            className="insert-toolbar__button "
            onClick={this.props.togglePreferencesPanel}
          >
            <PreferencesSVG
              className={classNames(prefButtonClassName)}
              alt="open preferences"
            />
          </button>
        </div>

      </div>
    );
  }
}

InsertToolbar.propTypes = {
  addCodeEditor: PropTypes.func.isRequired,
  addIframe: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  addTextEditor: PropTypes.func.isRequired,
  addQuestionEditor: PropTypes.func.isRequired,
  isPreferencesPanelOpen: PropTypes.bool.isRequired,
  togglePreferencesPanel: PropTypes.func.isRequired
};

export default InsertToolbar;
