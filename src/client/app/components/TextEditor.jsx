// import { Editor, RichUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import PropTypes from 'prop-types';
import Drag from '../images/drag.svg';
import CloseSVG from '../images/close.svg';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    this.props.setCurrentTextEditor(this.props.id, this.props.editorState);
  }

  render() {
    const dragClassName = `element__close drag__${this.props.id}`;
    return (
      <div id={this.props.id} onFocus={this.onFocus} className="textEditor__container">
        { this.props.preview ||
          <nav>
            <button
              className="element__close"
              onClick={() => this.props.removeTextEditor(this.props.id)}
            >
              <CloseSVG alt="close element" />
            </button>
            <button className={dragClassName}>
              <Drag alt="drag element" />
            </button>
          </nav>
        }
        <Editor
          id={this.props.id}
          toolbarOnFocus
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough']
            }
          }}
          toolbarClassName="textEditor__toolbar"
          // wrapperClassName="wrapperClassName"
          // editorClassName="editorClassName"
          editorState={this.props.editorState}
          onEditorStateChange={this.props.onChange}
          placeholder="Enter some text..."
          spellCheck={!this.props.preview}
          readOnly={this.props.preview}
        />
      </div>
    );
  }
}

TextEditor.propTypes = {
  currentTextEditorId: PropTypes.string.isRequired,
  currentTextEditorState: PropTypes.shape.isRequired,
  editorState: PropTypes.shape.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  removeTextEditor: PropTypes.func.isRequired,
  setCurrentTextEditor: PropTypes.func.isRequired
};

export default TextEditor;
