import { Editor } from 'draft-js';
import React, { PropTypes } from 'react';
import TextToolbar from './TextToolbar.jsx';
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
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          placeholder="Enter some text..."
          spellCheck={!this.props.preview}
          readOnly={this.props.preview}
        />
        { (this.props.id === this.props.currentTextEditorId && !this.props.preview) &&
          <TextToolbar
            onChange={this.props.onChange}
            currentTextEditorState={this.props.currentTextEditorState}
          />
        }
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
