import React from 'react';
import ReactDOM from 'react-dom';
import TextToolbar from './TextToolbar.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    console.log(this.props.id);
    this.props.setCurrentTextEditor(this.props.id, this.props.editorState);
  }

  render() {
    return (
      <div id={this.props.id} onFocus={this.onFocus}>
        {(() => {
          if(this.props.id ==  this.props.currentTextEditorId){
            return(
              <TextToolbar
                onChange = {this.props.onChange}
                currentTextEditorState={this.props.currentTextEditorState}
              />
            )
          }
        }

        )()}

        <Editor
          id={this.props.id}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          placeholder="Enter some text..."
        />
      </div>
    );
  }
}

export default TextEditor;
