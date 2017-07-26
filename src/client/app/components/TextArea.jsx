import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    console.log('test');
  }


  render() {
    return (
      <div>
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

export default TextArea;
