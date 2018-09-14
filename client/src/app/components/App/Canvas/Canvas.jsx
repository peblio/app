import React from 'react';
import PropTypes from 'prop-types';

import EditorContainer from './EditorContainer/EditorContainer.jsx';
import Questions from './Question/Question.jsx';
import Iframe from './Iframe/Iframe.jsx';
import Image from './Image/Image.jsx';
import TextEditor from './TextEditor/TextEditor.jsx';
import WidgetNav from './WidgetNav/WidgetNav.jsx';
import convertPixelHeightToGridHeight from '../../../utils/pixel-to-grid.js';

import * as WidgetSize from '../../../constants/widgetConstants.js';

const ReactGridLayout = require('react-grid-layout');

require('./canvas.scss');

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isResizingGridItems: {},
      didResizeGridItems: new Set(),
    };

    this.textEditors = {};
    this.timeout = null;
  }

  componentDidUpdate(prevProps) {
    const id = this.props.currentWidget;
    if (this.props.editorIndex > prevProps.editorIndex && document.getElementById(id)) {
      document.getElementById(id).focus({ preventScroll: false });
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  handleGridItemResizeStart = (gridItems) => {
    this.setState(prevState => ({
      isResizingGridItems: {
        ...prevState.isResizingGridItems,
        ...gridItems.reduce((accum, gridItem) => ({ ...accum, [gridItem.i]: true }), {})
      },
      didResizeGridItems: new Set()
    }));
  }

  handleGridItemResize = (gridItems) => {
    for (let gridItemIndex = 0; gridItemIndex < gridItems.length; gridItemIndex += 1) {
      const gridItem = gridItems[gridItemIndex];
      if (this.textEditors.hasOwnProperty(gridItem.i) && this.textEditors[gridItem.i]) {
        const textEditor = this.textEditors[gridItem.i];
        const measureComponent = textEditor.measureComponent;
        if (measureComponent) {
          const height = measureComponent.state.contentRect.bounds.height;
          this.props.updateTextHeight(gridItem.i, height);
        }
      }
    }
  }

  handleGridItemResizeStop = (gridItems) => {
    this.setState((prevState) => {
      const { didResizeGridItems } = prevState;
      for (let gridItemIndex = 0; gridItemIndex < gridItems.length; gridItemIndex += 1) {
        didResizeGridItems.add(gridItems[gridItemIndex].i);
      }
      return {
        isResizingGridItems: {
          ...prevState.isResizingGridItems,
          ...gridItems.reduce((accum, gridItem) => ({ ...accum, [gridItem.i]: false }), {})
        },
        didResizeGridItems
      };
    });

    // clear this.state.didResizeGridItems after a short amount of time
    this.timeout = setTimeout(() => this.setState({ didResizeGridItems: new Set() }), 100);
  }

  resizeTextEditor = (id, height) => {
    const gridItem = this.props.layout.find(x => x.i === id);
    const { margin, rowHeight } = this.props.rgl;
    const newHeight = convertPixelHeightToGridHeight(height, margin, rowHeight, gridItem.maxH);
    // don't autosize the text editor if it was just manually resized
    if (!this.state.didResizeGridItems.has(id) || newHeight > gridItem.h) {
      this.props.resizeTextEditor(id, height);
    }
  }

  renderCodeEditor(editor) {
    return (
      <EditorContainer
        id={editor.id}
        currentFile={editor.currentFile}
        clearConsoleOutput={this.props.clearConsoleOutput}
        code={editor.code}
        consoleOutputText={editor.consoleOutputText}
        editorFontSize={this.props.editorFontSize}
        editorMode={editor.editorMode}
        editorTheme={this.props.editorTheme}
        files={editor.files}
        innerHeight={editor.innerHeight}
        innerWidth={editor.innerWidth}
        isPlaying={editor.isPlaying}
        isRefreshing={editor.isRefreshing}
        playCode={this.props.playCode}
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
        ref={(textEditor) => { if (textEditor) { this.textEditors[editor.id] = textEditor; } }}
        backColor={editor.backColor}
        editorState={editor.editorState}
        onChange={this.props.updateTextChange}
        onResize={this.resizeTextEditor}
        preview={this.props.preview}
        updateTextBackColor={this.props.updateTextBackColor}
        isResizing={this.state.isResizingGridItems[editor.id] || false}
        currentWidget={this.props.currentWidget}
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
          setImageURL={this.props.setImageURL}
          layout={this.props.layout}
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
          setQuestionInnerHeight={this.props.setQuestionInnerHeight}
          updateAnswerChange={this.props.updateAnswerChange}
          updateQuestionChange={this.props.updateQuestionChange}
        />
      </div>
    );
  }

  render() {
    const ids = Object.keys(this.props.editors);
    // need to create copy of the layout because ReactGridLayout tests
    // for object equality when deciding whether to re-render grid items
    // reference: https://github.com/STRML/react-grid-layout/issues/382#issuecomment-299734450
    const storageLayout = JSON.parse(JSON.stringify(this.props.layout));
    const localLayout = {};
    storageLayout.forEach((x) => {
      const key = x.i;
      /* TODO: change the code to simplify the layout logic , ideally the min and default width and height should be contained in the editor object itself */
      localLayout[key] = x;
      localLayout[key].maxW = 30;
      localLayout[key].maxH = 100;

      if (this.props.editors[key]) {
        switch (this.props.editors[key].type) {
          case 'text': {
            localLayout[key].minW = WidgetSize.TEXT_MIN_WIDTH;
            localLayout[key].w = !localLayout[key].w ? WidgetSize.TEXT_DEFAULT_WIDTH : localLayout[key].w;

            const minH = this.props.textHeights[key] || WidgetSize.TEXT_MIN_HEIGHT;
            localLayout[key].minH = minH;
            localLayout[key].h =
              Math.max(minH, (localLayout[key].h < WidgetSize.TEXT_MIN_HEIGHT)
                ? WidgetSize.TEXT_MIN_HEIGHT : localLayout[key].h);
            break;
          }
          case 'code': {
            localLayout[key].minW = WidgetSize.CODE_MIN_WIDTH;
            localLayout[key].w = !localLayout[key].w ? WidgetSize.CODE_DEFAULT_WIDTH : localLayout[key].w;

            localLayout[key].minH = WidgetSize.CODE_MIN_HEIGHT;
            localLayout[key].h =
              (localLayout[key].h < localLayout[key].minH) ? localLayout[key].minH : localLayout[key].h;
            break;
          }
          case 'question' : {
            localLayout[key].minW = WidgetSize.QUESTION_MIN_WIDTH;
            localLayout[key].w = !localLayout[key].w ? WidgetSize.QUESTION_DEFAULT_WIDTH : localLayout[key].w;

            localLayout[key].minH = WidgetSize.QUESTION_MIN_HEIGHT;
            localLayout[key].h =
              (localLayout[key].h < localLayout[key].minH) ? localLayout[key].minH : localLayout[key].h;
            break;
          }
          case 'iframe' : {
            localLayout[key].minW = WidgetSize.IFRAME_MIN_WIDTH;
            localLayout[key].w = !localLayout[key].w ? WidgetSize.IFRAME_DEFAULT_WIDTH : localLayout[key].w;

            localLayout[key].minH = WidgetSize.IFRAME_MIN_HEIGHT;
            localLayout[key].h =
              (localLayout[key].h < localLayout[key].minH) ? localLayout[key].minH : localLayout[key].h;
            break;
          }
          case 'image' : {
            localLayout[key].minW = WidgetSize.IMAGE_MIN_WIDTH;
            localLayout[key].w = !localLayout[key].w ? WidgetSize.IMAGE_DEFAULT_WIDTH : localLayout[key].w;

            localLayout[key].minH = WidgetSize.IMAGE_MIN_HEIGHT;
            localLayout[key].h = !localLayout[key].h ? WidgetSize.IMAGE_DEFAULT_HEIGHT : localLayout[key].h;
            break;
          }
          default: {
            break;
          }
        }
      }
    });

    return (
      <section className={`canvas ${this.props.preview ? 'canvas-preview-mode' : 'canvas-edit-mode'}`}>
        <ReactGridLayout
          cols={this.props.rgl.cols}
          width={this.props.rgl.width}
          rowHeight={this.props.rgl.rowHeight}
          layout={storageLayout}
          onLayoutChange={this.props.setPageLayout}
          compactType="vertical"
          margin={this.props.rgl.margin}
          draggableHandle=".widget__drag"
          containerPadding={this.props.rgl.padding}
          onResizeStart={this.handleGridItemResizeStart}
          onResize={this.handleGridItemResize}
          onResizeStop={this.handleGridItemResizeStop}
          autoSize
        >
          {ids.map(id => (
            <div
              key={id}
              data-grid={localLayout[id]}
              className={`${this.props.currentWidget === id ? 'canvas-high' : ''}`
              }
            >

              <div
                className="widget__container element__iframe-container"
                id={id}
                tabIndex="0"
                onFocus={() => this.props.setCurrentWidget(id)}
              >
                {this.props.preview || (
                  <div className={`widget-nav__container${(this.props.currentWidget === id) ? '_highlighted' : ''}`}>
                    <WidgetNav
                      id={id}
                      layout={storageLayout}
                      setPageLayout={this.props.setPageLayout}
                      removeEditor={this.props.removeEditor}
                      duplicateEditor={this.props.duplicateEditor}
                    />
                  </div>
                )}
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
  currentWidget: PropTypes.string.isRequired,
  duplicateEditor: PropTypes.func.isRequired,
  editorIndex: PropTypes.number.isRequired,
  editorFontSize: PropTypes.number.isRequired,
  editors: PropTypes.shape({}).isRequired,
  editorTheme: PropTypes.string.isRequired,
  layout: PropTypes.arrayOf(PropTypes.shape).isRequired,
  name: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  playCode: PropTypes.func.isRequired,
  removeEditor: PropTypes.func.isRequired,
  resizeTextEditor: PropTypes.func.isRequired,
  rgl: PropTypes.shape({
    cols: PropTypes.number,
    margin: PropTypes.arrayOf(PropTypes.number),
    padding: PropTypes.arrayOf(PropTypes.number),
    rowHeight: PropTypes.number,
    width: PropTypes.number
  }).isRequired,
  setCurrentWidget: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
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
  updateTextChange: PropTypes.func.isRequired,
  updateTextHeight: PropTypes.func.isRequired,
  textHeights: PropTypes.shape({}).isRequired
};

export default Canvas;
