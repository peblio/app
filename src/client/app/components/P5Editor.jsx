import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/javascript/javascript';

require('../styles/codemirror.css');
require('../styles/3024-night.css');

class P5Editor extends React.Component {
  componentDidMount() {
    this.cm = CodeMirror(this.codemirrorContainer, {
      value: CodeMirror.Doc(this.props.files[0].content, 'htmlmixed'),
      mode: 'htmlmixed',
      lineNumbers: true,
      autoCloseBrackets: true,
      inputStyle: 'contenteditable',
      styleActiveLine: true,
    });
    this.cm.on('keyup', () => {
      this.props.updateFile(0, this.cm.getValue());
    });
  }

  render() {
    return (
      <div>
        <div ref={(element) => { this.codemirrorContainer = element; }}>
        </div>
      </div>
    );
  }
}

P5Editor.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired,
  updateCode: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired
};

export default P5Editor;
