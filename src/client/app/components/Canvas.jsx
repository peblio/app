import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';

import EditorContainer from './EditorContainer.jsx';
import Iframe from './Iframe.jsx';
import TextEditor from './TextEditor.jsx';

class Canvas extends React.Component {
  renderCodeEditor(editor) {
    return (
      <EditorContainer
        id={editor.id}
        files={editor.files}
        currentFile={editor.currentFile}
        setCurrentFile={this.props.setCurrentFile}
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
        updateFile={this.props.updateFile}
      />
    );
  }

  renderTextEditor(editor) {
    return (
      <TextEditor
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

  renderIframe(editor) {
    return (
      <Iframe
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
    const extendsProps = id => ({
      onMouseEnter: () => { this.props.setCurrentEditor(id); }
    });
    const ids = Object.keys(this.props.editors);
    return (
      <section className={`canvas ${this.props.preview ? 'preview-mode' : ''}`}>
        { ids.map(id => (
          <Rnd
            key={id}
            className="resize-container"
            size={{ width: this.props.editors[id].width, height: this.props.editors[id].height }}
            position={{ x: this.props.editors[id].x, y: this.props.editors[id].y }}
            onDragStop={(e, d) => { this.props.setEditorPosition(id, d.x, d.y); }}
            dragHandleClassName={`.drag__${id}`}
            onResize={(e, direction, ref, delta, position) => {
              this.props.setEditorSize(id, ref.offsetWidth, ref.offsetHeight);
            }}
            minWidth={this.props.editors[id].minWidth}
            minHeight={this.props.editors[id].minHeight}
            extendsProps={extendsProps(id)}
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
            z={this.props.editors[id].index + 50}
          >
            {(() => {
              switch (this.props.editors[id].type) {
                case 'code': return this.renderCodeEditor(this.props.editors[id]);
                case 'text': return this.renderTextEditor(this.props.editors[id]);
                case 'iframe': return this.renderIframe(this.props.editors[id]);
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
  editors: PropTypes.object.isRequired,
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
