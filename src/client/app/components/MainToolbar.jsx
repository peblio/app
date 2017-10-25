import React from 'react';
import TextToolbar from './TextToolbar.jsx';
import InsertToolbar from './InsertToolbar.jsx';

class MainToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <TextToolbar
            onChange = {this.props.onChange}
            currentTextEditorState = {this.props.currentTextEditorState}

          />
        <InsertToolbar
          addEditor = {this.props.addEditor}
          addTextEditor = {this.props.addTextEditor}
        />
      </div>
    );
  }
}

export default MainToolbar;
