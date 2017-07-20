import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  componentDidUpdate() {

    console.log(this.state.editorState);
  }
  render() {
    return (
      <div>
        <button
          onClick={this._onBoldClick}
        >
          Bold
        </button>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Enter some text..."
          handleKeyCommand={this.handleKeyCommand}
        />
      </div>
    );
  }
}

export default TextArea;
