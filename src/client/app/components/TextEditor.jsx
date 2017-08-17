import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }
  onFocus() {
    // debugger;
    console.log('calling onFocus');
    this.props.setCurrentEditor(this.props.editorState, this.props.editorId);
  }


  render() {
    return (
      <div onFocus={ this.onFocus }>
        <Editor
          customStyleMap={this.props.styleMap}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          placeholder="Enter some text..."
          handleKeyCommand={this.props.handleKeyCommand}
        />
      </div>
    );
  }
}

export default TextEditor;
