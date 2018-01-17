import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';

import EditorContainer from './EditorContainer.jsx';
import Iframe from './Iframe.jsx';
import TextEditor from './TextEditor.jsx';

class Canvas extends React.Component {
  renderCodeEditor(editor, index) {
    return (
      <EditorContainer
        index={index}
        id={editor.id}
        editorMode={editor.editorMode}
        code={editor.code}
        consoleOutputText={editor.consoleOutputText}
        isPlaying={editor.isPlaying}
        preview={this.props.preview}
        setCurrentEditor={this.props.setCurrentEditor}
        removeEditor={this.props.removeEditor}
        setEditorMode={this.props.setEditorMode}
        playCode={this.props.playCode}
        stopCode={this.props.stopCode}
        updateCode={this.props.updateCode}
        updateConsoleOutput={this.props.updateConsoleOutput}
      />
    );
  }

  renderTextEditor(editor, index) {
    return (
      <TextEditor
        index={index}
        id={editor.id}
        ref={editor.id}
        editorState={editor.editorState}
        onChange={this.props.updateTextChange}
        preview={this.props.preview}
        setCurrentEditor={this.props.setCurrentEditor}
        removeEditor={this.props.removeEditor}
      />
    );
  }

  renderIframe(editor, index) {
    return (
      <Iframe
        index={index}
        id={editor.id}
        iframeURL={editor.url}
        preview={this.props.preview}
        removeEditor={this.props.removeEditor}
        setCurrentEditor={this.props.setCurrentEditor}
        setIframeURL={this.props.setIframeURL}
      />
    );
  }

  render() {
    const extendsProps = index => ({
      onMouseEnter: () => { this.props.setCurrentEditor(index); }
    });
    return (
      <section className={`canvas ${this.props.preview ? 'preview-mode' : ''}`}>
        { this.props.editors.map((editor, index) => (
          <Rnd
            key={editor.id}
            className="resize-container"
            size={{ width: editor.width, height: editor.height }}
            position={{ x: editor.x, y: editor.y }}
            onDragStop={(e, d) => { this.props.setEditorPosition(index, d.x, d.y); }}
            dragHandleClassName={`.drag__${editor.id}`}
            onResize={(e, direction, ref, delta, position) => {
              this.props.setEditorSize(index, ref.offsetWidth, ref.offsetHeight);
            }}
            minWidth={editor.minWidth}
            minHeight={editor.minHeight}
            extendsProps={extendsProps(index)}
            bounds=".canvas"
            enableResizing={{
              bottom: !this.props.preview,
              bottomLeft: !this.props.preview,
              bottomRight: !this.props.preview,
              left: !this.props.preview,
              right: !this.props.preview,
              top: !this.props.preview,
              topLeft: !this.props.preview,
              topRight: !this.props.preview
            }}
          >
            {(() => {
              switch (editor.type) {
                case 'code': return this.renderCodeEditor(editor, index);
                case 'text': return this.renderTextEditor(editor, index);
                case 'iframe': return this.renderIframe(editor, index);
                default: return null;
              }
            })()}
          </Rnd>
        ))}
      </section>
    );
  }
}

Canvas.propTypes = {
  preview: PropTypes.bool.isRequired,
  editors: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired,
  setEditorSize: PropTypes.func.isRequired,
  setEditorPosition: PropTypes.func.isRequired,

  playCode: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  updateTextChange: PropTypes.func.isRequired,
  setIframeURL: PropTypes.func.isRequired
};

export default Canvas;
