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
    const i = this.props.index;
    this.setCurrentEditor = () => { this.props.setCurrentEditor(i); };
    this.removeEditor = () => { this.props.removeEditor(i); };
    this.onChange = (state) => { this.props.onChange(i, state); };
  }

  render() {
    return (
      <div id={this.props.id} onFocus={this.setCurrentEditor} className="textEditor__container">
        { this.props.preview ||
          <nav>
            <button
              className="element__close"
              onClick={this.removeEditor}
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
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough']
            }
          }}
          toolbarClassName="textEditor__toolbar"
          editorClassName="textEditor__content"
          // wrapperClassName="wrapperClassName"
          editorState={this.props.editorState}
          onEditorStateChange={this.onChange}
          placeholder="Enter some text..."
          spellCheck={!this.props.preview}
          readOnly={this.props.preview}
        />
      </div>
    );
  }
}

TextEditor.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  editorState: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired
};

export default TextEditor;
