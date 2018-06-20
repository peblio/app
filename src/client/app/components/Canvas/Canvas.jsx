import React from 'react';
import PropTypes from 'prop-types';

import EditorContainer from './EditorContainer/EditorContainer.jsx';
import Questions from './Question/Question.jsx';
import Iframe from './Iframe/Iframe.jsx';
import Image from './Image/Image.jsx';
import TextEditor from './TextEditor/TextEditor.jsx';
import WidgetNav from './WidgetNav/WidgetNav.jsx';

const ReactGridLayout = require('react-grid-layout');

require('./canvas.scss');

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
        backColor={editor.backColor}
        editorState={editor.editorState}
        onChange={this.props.updateTextChange}
        preview={this.props.preview}
        setCurrentEditor={this.props.setCurrentEditor}
        updateTextBackColor={this.props.updateTextBackColor}
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
          setCurrentEditor={this.props.setCurrentEditor}
          setIframeURL={this.props.setIframeURL}
        />
      </div>
    );
  }

  renderImage(editor) {
    return (
      <div key={editor.id}>
        <Image
          id={editor.id}
          imageURL={editor.url}
          name={this.props.name}
          onChange={this.props.updateImageChange}
          preview={this.props.preview}
          removeEditor={this.props.removeEditor}
          setCurrentEditor={this.props.setCurrentEditor}
          setImageURL={this.props.setImageURL}
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
          innerHeight={editor.innerHeight}
          minHeight={editor.minHeight}
          preview={this.props.preview}
          question={editor.question}
          setCurrentEditor={this.props.setCurrentEditor}
          setQuestionInnerHeight={this.props.setQuestionInnerHeight}
          updateAnswerChange={this.props.updateAnswerChange}
          updateQuestionChange={this.props.updateQuestionChange}
        />
      </div>
    );
  }

  render() {
    const ids = Object.keys(this.props.editors);
    const storageLayout = this.props.layout;
    const localLayout = {};
    storageLayout.forEach((x) => { // eslint-disable-line
      const key = x.i;
      /* TODO: change the code to simplify the layout logic */
      localLayout[key] = x;
      localLayout[key].maxW = 30;
      localLayout[key].maxH = 30;

      if (this.props.editors[key]) {
        switch (this.props.editors[key].type) {
          case 'text': {
            localLayout[key].minW = 4;
            localLayout[key].w = (localLayout[key].w < 4) ? 4 : localLayout[key].w;
            localLayout[key].minH = 3;
            localLayout[key].h = (localLayout[key].h < 3) ? 3 : localLayout[key].h;
            break;
          }
          case 'code': {
            localLayout[key].minW = 10;
            localLayout[key].w = (localLayout[key].w < 10) ? 10 : localLayout[key].w;
            localLayout[key].minH = 11;
            localLayout[key].h = (localLayout[key].h < 11) ? 11 : localLayout[key].h;
            break;
          }
          case 'question' : {
            localLayout[key].minW = 6;
            localLayout[key].w = (localLayout[key].w < 6) ? 6 : localLayout[key].w;
            localLayout[key].minH = 5;
            localLayout[key].h = (localLayout[key].h < 5) ? 5 : localLayout[key].h;
            break;
          }
          case 'iframe' : {
            localLayout[key].minW = 10;
            localLayout[key].w = (localLayout[key].w < 10) ? 10 : localLayout[key].w;
            localLayout[key].minH = 12;
            localLayout[key].h = (localLayout[key].h < 12) ? 12 : localLayout[key].h;
            break;
          }
          case 'image' : {
            localLayout[key].minW = 10;
            localLayout[key].w = (localLayout[key].w < 10) ? 10 : localLayout[key].w;
            localLayout[key].minH = 12;
            localLayout[key].h = (localLayout[key].h < 12) ? 12 : localLayout[key].h;
            break;
          }
          default: {
            break;
          }
        }
      }
    });

    return (
      <section className={`canvas ${this.props.preview ? 'preview-mode' : 'canvas-extra-margin'}`}>
        <ReactGridLayout
          cols={this.props.rgl.cols}
          width={this.props.rgl.width}
          rowHeight={this.props.rgl.rowHeight}
          layout={this.props.layout}
          onLayoutChange={this.props.setPageLayout}
          compactType="vertical"
          autoSize
          margin={this.props.rgl.margin}
          draggableHandle=".widget__drag"
          containerPadding={this.props.rgl.padding}
          isResizable={!this.props.preview}
        >
          {ids.map(id => (
            <div
              key={id}
              data-grid={localLayout[id]}
              className={`${this.props.editors[id].type === 'text' ? 'canvas-high' : ''}`}
            >
              <div className="element__iframe-container" id={this.props.id} onFocus={this.setCurrentEditor}>
                { this.props.preview ||
                <WidgetNav
                  id={id}
                  layout={this.props.layout}
                  setPageLayout={this.props.setPageLayout}
                  removeEditor={this.props.removeEditor}
                  duplicateEditor={this.props.duplicateEditor}
                />
              }
                {(() => {
                  switch (this.props.editors[id].type) {
                    case 'code': return this.renderCodeEditor(this.props.editors[id]);
                    case 'question': return this.renderQuestion(this.props.editors[id]);
                    case 'iframe': return this.renderIframe(this.props.editors[id]);
                    case 'image': return this.renderImage(this.props.editors[id]);
                    case 'text': return this.renderTextEditor(this.props.editors[id]);
                    default: return null;
                  }
                })()}
              </div>
            </div>
        ))}
        </ReactGridLayout>
      </section>
    );
  }
}

Canvas.propTypes = {
  clearConsoleOutput: PropTypes.func.isRequired,
  duplicateEditor: PropTypes.func.isRequired,
  editors: PropTypes.shape.isRequired,
  id: PropTypes.string.isRequired,
  layout: PropTypes.arrayOf(PropTypes.shape).isRequired,
  name: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired,
  rgl: PropTypes.shape.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setEditorMode: PropTypes.func.isRequired,
  setIframeURL: PropTypes.func.isRequired,
  setImageURL: PropTypes.func.isRequired,
  setInnerHeight: PropTypes.func.isRequired,
  setInnerWidth: PropTypes.func.isRequired,
  setPageLayout: PropTypes.func.isRequired,
  setQuestionInnerHeight: PropTypes.func.isRequired,
  startCodeRefresh: PropTypes.func.isRequired,
  stopCode: PropTypes.func.isRequired,
  stopCodeRefresh: PropTypes.func.isRequired,
  updateAnswerChange: PropTypes.func.isRequired,
  updateConsoleOutput: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
  updateImageChange: PropTypes.func.isRequired,
  updateQuestionChange: PropTypes.func.isRequired,
  updateTextBackColor: PropTypes.func.isRequired,
  updateTextChange: PropTypes.func.isRequired
};

export default Canvas;
