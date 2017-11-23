import React from 'react';
import { render } from 'react-dom';

class InsertToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='insertToolbar__container'>
        <button
          onClick = {this.props.addEditor}
          className = 'insertToolbar__button'
        >
          Editor
        </button>
        <button
          onClick = {this.props.addTextEditor}
          className = 'insertToolbar__button'
        >
          TextEditor
        </button>
        <button
          onClick = {this.props.addIframe}
          className = 'insertToolbar__button'
        >
          Iframe
        </button>
      </div>
    );
  }

}

export default InsertToolbar;
