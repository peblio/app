import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditorSVG from '../../../../images/editor.svg';
import EmbedSVG from '../../../../images/embed.svg';
import ImageSVG from '../../../../images/image.svg';
import QuestionSVG from '../../../../images/question.svg';
import TextSVG from '../../../../images/text.svg';
import VideoSVG from '../../../../images/video.svg';
import {
  addIframe,
  addImage,
  addTextEditor,
  addQuestionEditor,
  addVideo
} from '../../../../action/editors.js';

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
    this.setState(prevState => ({
      editorExpanded: !prevState.editorExpanded
    }));
  }

  render() {
    return (
      <div className="insert-toolbar__container insert-toolbar__expand">
        <div
          className="insert-toolbar__container-left"
          data-test="insert-toolbar__container"
        >
          <button
            onMouseDown={this.props.addTextEditor}
            onKeyDown={this.props.addTextEditor}
            id="elementButton"
            className="insert-toolbar__button"
            data-test="insert-toolbar__add-text-editor"
          >
            <TextSVG alt="add text" />
            Textbox
          </button>
          <button
            onMouseDown={this.props.addIframe}
            onKeyDown={this.props.addIframe}
            className="insert-toolbar__button"
            data-test="insert-toolbar__add-iframe"
          >
            <EmbedSVG alt="add embed" />
            Embed
          </button>
          <button
            onMouseDown={this.props.addVideo}
            onKeyDown={this.props.addVideo}
            className="insert-toolbar__button"
            data-test="insert-toolbar__add-video"
          >
            <VideoSVG alt="add video" />
            Video
          </button>
          <button
            onMouseDown={this.props.addQuestionEditor}
            onKeyDown={this.props.addQuestionEditor}
            id="elementButton"
            className="insert-toolbar__button"
            data-test="insert-toolbar__add-question"
          >
            <QuestionSVG alt="add question" />
            Question
          </button>
          <button
            onMouseDown={this.props.addImage}
            onKeyDown={this.props.addImage}
            id="elementButton"
            className="insert-toolbar__button"
            data-test="insert-toolbar__add-image"
          >
            <ImageSVG alt="add image" />
            Image
          </button>
        </div>
        <div className="insert-toolbar__container-right">

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
  addVideo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addCodeEditor,
  addIframe,
  addImage,
  addTextEditor,
  addQuestionEditor,
  addVideo
}, dispatch);

export default connect(null, mapDispatchToProps)(InsertToolbar);
