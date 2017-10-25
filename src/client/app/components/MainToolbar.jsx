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
            _onFontChange = {this.props._onFontChange}
            _onFontfaceChange = {this.props._onFontfaceChange}
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
