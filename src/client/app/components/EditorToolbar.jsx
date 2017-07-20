import React from 'react';
import { render } from 'react-dom';

class EditorToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button
          onClick = {this.props.playCode}
        >
          Play
        </button>
        <button
          onClick = {this.props.stopCode}
        >
          Stop
        </button>
      </div>
    );
  }

}

export default EditorToolbar;
