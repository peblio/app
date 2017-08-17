import React from 'react';
import { render } from 'react-dom';

class MainToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button
          onClick = {this.props.addEditor}
        >
          Editor
        </button>
        <button
          onClick = {this.props.addTextEditor}
        >
          TextEditor
        </button>
      </div>
    );
  }

}

export default MainToolbar;
