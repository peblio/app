import React from 'react';
import { render } from 'react-dom';


const editorButton = require('../../images/editor.svg');
const textButton = require('../../images/text.svg');
const embedButton = require('../../images/embed.svg');

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
        <InlineSVG src={editorButton} alt="add Editor" />
          editor
        </button>
        <button
          onClick = {this.props.addTextEditor}
          id="elementButton" className = 'insertToolbar__button'
        >
        <InlineSVG src={textButton} alt="add textBox" />
          text box
        </button>
        <button
          onClick = {this.props.addIframe}
          className = 'insertToolbar__button'
        >
        <InlineSVG src={embedButton} alt="add embed" />

          embed
        </button>
      </div>
    );
  }

}

export default InsertToolbar;
