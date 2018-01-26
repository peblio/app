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

    this.setCurrentEditor = () => { this.props.setCurrentEditor(this.props.id); };
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.onChange = (state) => { this.props.onChange(this.props.id, state); };
  }

  render() {
    return (
      <div id={this.props.id} onFocus={this.setCurrentEditor.bind(this)} className="textEditor__container">
        { this.props.preview ||
          <nav>
            <button
              className="element__close"
              onClick={this.removeEditor.bind(this)}
            >
              <CloseSVG alt="close element" />
            </button>
            <button className={`element__close drag__${this.props.id}`}>
              <Drag alt="drag element" />
            </button>
          </nav>
        }
        <Editor
          id={this.props.id}
          toolbarOnFocus
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'], //eslint-disable-line
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough']
            }
          }}
          toolbarClassName="textEditor__toolbar"
          editorClassName="textEditor__content"
          // wrapperClassName="wrapperClassName"
          editorState={this.props.editorState}
          onEditorStateChange={this.onChange.bind(this)}
          placeholder="Enter some text..."
          spellCheck={!this.props.preview}
          readOnly={this.props.preview}
        />
      </div>
    );
  }
}

TextEditor.propTypes = {
  id: PropTypes.string.isRequired,
  editorState: PropTypes.shape.isRequired,
  onChange: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired
};

export default TextEditor;
