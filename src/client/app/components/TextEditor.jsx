import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import PropTypes from 'prop-types';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.setCurrentEditor = () => { this.props.setCurrentEditor(this.props.id); };
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.onChange = (state) => { this.props.onChange(this.props.id, state); };
  }

  render() {
    return (

      <div className={`text-editor__container${this.props.preview ? '' : '--edit'}`}>
        <Editor
          id={this.props.id}
          toolbarOnFocus
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji','history'], //eslint-disable-line
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough']
            },
            blockType: {
              isDropDown: true,
              options: ['H1', 'H2', 'Blockquote', 'Code'],
            },
            list: {
              inDropdown: true,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['unordered', 'ordered'],
            },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true }

          }}
          toolbarClassName="text-editor__toolbar"
          editorClassName="text-editor__content"
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
