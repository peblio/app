import React from 'react';
import ReactDOM from 'react-dom';
import TextToolbar from './TextToolbar.jsx';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus=this.onFocus.bind(this);
  }

  onFocus() {
    this.props.setCurrentTextEditor(this.props.id, this.props.editorState);
  }

  render() {
    let dragClassName="element__close drag__" +this.props.id;
    return (
      <div id={this.props.id} onFocus={this.onFocus} className="textEditor__container">
        <nav>
          <button className="element__close" onClick={()=> this.props.removeTextEditor(this.props.id)}>&#x2613;</button>
          <button className={dragClassName}>&#x2612;</button>
        </nav>
        <Editor
          id={this.props.id}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          placeholder="Enter some text..."
        />
        {(()=> {
          if(this.props.id==this.props.currentTextEditorId){
            return(
              <TextToolbar
                onChange={this.props.onChange}
                currentTextEditorState={this.props.currentTextEditorState}
              />
            )
          }
        }

        )()}

      </div>
    );
  }
}

export default TextEditor;
