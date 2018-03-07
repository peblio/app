import React from 'react';
import PropTypes from 'prop-types';

import EditorContainer from './EditorContainer.jsx';
import Questions from './Questions.jsx';
import Iframe from './Iframe.jsx';
import TextEditor from './TextEditor.jsx';

const ReactGridLayout = require('react-grid-layout');

class Canvas extends React.Component {

  renderCodeEditor(editor) {
    return (
      <EditorContainer
        id={editor.id}
        currentFile={editor.currentFile}
        clearConsoleOutput={this.props.clearConsoleOutput}
        code={editor.code}
        consoleOutputText={editor.consoleOutputText}
        editorMode={editor.editorMode}
        files={editor.files}
        innerHeight={editor.innerHeight}
        innerWidth={editor.innerWidth}
        isPlaying={editor.isPlaying}
        isRefreshing={editor.isRefreshing}
        playCode={this.props.playCode}
        preview={this.props.preview}
        removeEditor={this.props.removeEditor}
        setCurrentEditor={this.props.setCurrentEditor}
        setEditorMode={this.props.setEditorMode}
        startCodeRefresh={this.props.startCodeRefresh}
        setCurrentFile={this.props.setCurrentFile}
        setInnerWidth={this.props.setInnerWidth}
        setInnerHeight={this.props.setInnerHeight}
        stopCode={this.props.stopCode}
        stopCodeRefresh={this.props.stopCodeRefresh}
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
      <div key={editor.id}>
        <Iframe
          id={editor.id}
          iframeURL={editor.url}
          preview={this.props.preview}
          removeEditor={this.props.removeEditor}
          setCurrentEditor={this.props.setCurrentEditor}
          setIframeURL={this.props.setIframeURL}
        />
      </div>
    );
  }

  renderQuestion(editor) {
    return (
      <div key={editor.id}>
        <Questions
          id={editor.id}
          answer={editor.answer}
          preview={this.props.preview}
          question={editor.question}
          removeEditor={this.props.removeEditor}
          setCurrentEditor={this.props.setCurrentEditor}
          updateAnswerChange={this.props.updateAnswerChange}
          updateQuestionChange={this.props.updateQuestionChange}
        />
      </div>
    );
  }

  render() {
    const extendsProps = id => ({
      onMouseEnter: () => { this.props.setCurrentEditor(id); }
    });
    const ids = Object.keys(this.props.editors);
    const toRender = [];
    const storageLayout = this.props.layout;
    const localLayout = {};
    storageLayout.map((x) => {
      const key = x.i;
      localLayout[key] = x;
    });

    return (
      <section className={`canvas ${this.props.preview ? 'preview-mode' : 'canvas-extra-margin'}`}>
        <ReactGridLayout
          cols={this.props.rgl.col}
          width={this.props.rgl.width}
          rowHeight={this.props.rgl.rowHeight}
          layout={this.props.layout}
          onLayoutChange={this.props.setPageLayout}
          compactType={null}
          margin={this.props.rgl.margin}
          draggableHandle=".element__drag"
          containerPadding={this.props.rgl.padding}
        >
          {ids.map(id => (
            <div
              key={id}
              data-grid={localLayout[id]}
            >
              {(() => {
                // if (this.props.editors[id].type === 'code') {
                //   return this.renderCodeEditor(this.props.editors[id]);
                // } else if (this.props.editors[id].type === 'text') {
                //   return this.renderTextEditor(this.props.editors[id]);
                // }
                switch (this.props.editors[id].type) {
                  case 'code': return this.renderCodeEditor(this.props.editors[id]);
                  case 'text': return this.renderTextEditor(this.props.editors[id]);
                  case 'iframe': return this.renderIframe(this.props.editors[id]);
                  case 'question': return this.renderQuestion(this.props.editors[id]);
                  default: return null;
                }
              })()}
            </div>
        ))}
        </ReactGridLayout>
      </section>
    );
  }
}

Canvas.propTypes = {
  clearConsoleOutput: PropTypes.func.isRequired,
  editors: PropTypes.shape.isRequired,
  layout: PropTypes.arrayOf(PropTypes.shape).isRequired,
  preview: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired,
  rgl: PropTypes.shape.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  setIframeURL: PropTypes.func.isRequired,
  setInnerHeight: PropTypes.func.isRequired,
  setInnerWidth: PropTypes.func.isRequired,
  setPageLayout: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  updateAnswerChange: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
  updateQuestionChange: PropTypes.func.isRequired,
  updateTextChange: PropTypes.func.isRequired
};

export default Canvas;
