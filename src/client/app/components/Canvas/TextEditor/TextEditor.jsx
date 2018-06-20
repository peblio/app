import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import Measure from 'react-measure';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import BackColor from './BackColor/BackColor.jsx';

require('./textEditor.scss');

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };

    this.measureComponent = null;
  }

  componentDidMount() {
    this.setBackColor(this.props.backColor);
  }

  onChange = (state) => {
    this.props.onChange(this.props.id, state);
  }

  onResize = (contentRect) => {
    const { height } = contentRect.bounds;
    if (this.props.preview || this.props.isResizing || height === 0) {
      return;
    }
    this.props.onResize(this.props.id, height);
  }

  setBackColor = (color) => {
    const colorStyle = `background: ${color}`;
    this.textEditor.getElementsByClassName('DraftEditor-editorContainer')[0].setAttribute('style', colorStyle);
    this.updateTextBackColor(color);
  }

  setCurrentEditor = () => {
    this.props.setCurrentEditor(this.props.id);
  }

  removeEditor = () => {
    this.props.removeEditor(this.props.id);
  }

  toggleCollapse = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  updateTextBackColor = (color) => {
    this.props.updateTextBackColor(this.props.id, color);
  }

  render() {
    return (
      <Measure ref={(m) => { this.measureComponent = m; }} onResize={this.onResize} bounds>
        {({ measureRef }) => (
          <div
            ref={(element) => { this.textEditor = element; }}
            className={`text-editor__container${this.props.preview ? '' : '--edit'}`}
          >
            <Editor
              id={this.props.id}
              editorRef={ref => ref && ref.editorContainer && measureRef(ref.editorContainer)}
              toolbarOnFocus
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji','history'], //eslint-disable-line
                inline: {
                  options: ['bold', 'italic', 'underline', 'strikethrough']
                },
                blockType: {
                  isDropDown: true,
                  options: ['H1', 'H2', 'Blockquote', 'Code'],
                },
                list: {
                  inDropdown: true,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ['unordered', 'ordered'],
                },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true }
              }}
              toolbarCustomButtons={[
                <BackColor
                  id={this.props.id}
                  editor={this.textEditor}
                  setBackColor={this.setBackColor}
                  backColor={this.props.backColor}
                  expanded={this.state.expanded}
                  toggleCollapse={this.toggleCollapse}
                />
              ]}
              toolbarClassName="text-editor__toolbar"
              editorClassName="text-editor__content"
              editorState={this.props.editorState}
              onEditorStateChange={this.onChange.bind(this)}
              placeholder="Enter some text..."
              spellCheck={!this.props.preview}
              readOnly={this.props.preview}
            />
          </div>
        )}
      </Measure>
    );
  }
}

TextEditor.propTypes = {
  id: PropTypes.string.isRequired,
  backColor: PropTypes.string.isRequired,
  editorState: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  updateTextBackColor: PropTypes.func.isRequired,
  isResizing: PropTypes.bool.isRequired
};

export default TextEditor;
