import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import Measure from 'react-measure';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classNames from 'classnames';

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
    const textContainerClassName = classNames('text-editor__container', {
      'text-editor__container_edit': !this.props.preview,
      'text-editor__container_highlight':
      (!this.props.preview && this.props.currentWidget === this.props.id)
    });
    return (
      <Measure ref={(m) => { this.measureComponent = m; }} onResize={this.onResize} bounds>
        {({ measureRef }) => (
          <div
            ref={(element) => { this.textEditor = element; }}
            className={classNames(textContainerClassName)}
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
                  options: ['H1', 'H2', 'Normal', 'Blockquote', 'Code'],
                },
                list: {
                  inDropdown: true,
                  options: ['unordered', 'ordered'],
                },
                fontFamily: {
                  options: ['Arial', 'Arial Black', 'Georgia', 'Impact', 'Tahoma',
                    'Times New Roman', 'Verdana', 'Comic Sans MS', 'Trebuchet MS', 'Courier New'],
                },
                colorPicker: {

                  colors: ['rgb(0,152,135)', 'rgb(215,62,44)', 'rgb(0,106,152)',
                    'rgb(152,0,118)', 'rgb(259,205,17)', 'rgb(55,170,101)', 'rgb(0,21,30)',
                    'rgb(51,68,75)', 'rgb(102,115,120)', 'rgb(153,161,165)', 'rgb(204,208,210)',
                    'rgb(242,243,244)', 'rgb(153,214,207)', 'rgb(239,178,171)', 'rgb(166,202,218)',
                    'rgb(214,153,200)', 'rgb(255,237,160)', 'rgb(175,221,193)', 'rgb(128,179,75)',
                    'rgb(248,152,56)', 'rgb(135,184,227)', 'rgb(248,214,49)', 'rgb(255,255,255)',
                    'rgb(0,0,0,0)'],
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
  currentWidget: PropTypes.string.isRequired,
  editorState: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  removeEditor: PropTypes.func.isRequired,
  updateTextBackColor: PropTypes.func.isRequired,
  isResizing: PropTypes.bool.isRequired
};

export default TextEditor;
