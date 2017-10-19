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
            _onBoldClick = {this.props._onBoldClick}
            _onItalicClick = {this.props._onItalicClick}
            _onUnderlineClick = {this.props._onUnderlineClick}
            _onCodeClick = {this.props._onCodeClick}
            _onFontChange = {this.props._onFontChange}
            _onFontfaceChange = {this.props._onFontfaceChange}

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
