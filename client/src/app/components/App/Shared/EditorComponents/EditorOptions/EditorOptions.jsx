import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import EditorSplitSVG from '../../../../../images/editor-split.svg';
import EditorTabbedSVG from '../../../../../images/editor-tabbed.svg';

require('./EditorOptions.scss');

class EditorOptions extends React.Component {
  setTabbedView=(e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.setEditorView('tabbed');
    this.props.setCurrentFile(-1);
    if (this.props.isConsoleOpen) {
      this.props.toggleConsole();
    }
  }

  setSplitView=(e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.setEditorView('split');
    this.props.setCurrentFile(0);
  }

  render() {
    const editorViewClass = classNames('editor-options__view-button', {
      'editor-options__view-button--disabled': (this.props.isLocked),
    });
    const editorTabbedViewClass = classNames({
      'editor-options__view-button--active': (this.props.editorView === 'tabbed'),
    });
    const editorSplitViewClass = classNames({
      'editor-options__view-button--active': (this.props.editorView === 'split'),
    });

    return (
      <section className="editor-options__container">
        <ul className="editor-options__view-list">
          <li className="editor-options__view">
            <button
              className={classNames(editorSplitViewClass, editorViewClass)}
              onMouseDown={(e) => {
                this.setSplitView(e);
              }}
              onKeyDown={(e) => {
                this.setSplitView(e);
              }}
              disabled={this.props.isLocked}
            >
              <EditorSplitSVG alt="split editor" />
            </button>
          </li>
          <li className="editor-options__view">
            <button
              className={classNames(editorTabbedViewClass, editorViewClass)}
              onMouseDown={(e) => {
                this.setTabbedView(e);
              }}
              onKeyDown={(e) => {
                this.setTabbedView(e);
              }}
              disabled={this.props.isLocked}
            >
              <EditorTabbedSVG alt="tabbed editor" />
            </button>
          </li>
        </ul>
      </section>
    );
  }
}

EditorOptions.propTypes = {
  editorView: PropTypes.string.isRequired,
  isConsoleOpen: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setEditorView: PropTypes.func.isRequired,
  toggleConsole: PropTypes.func.isRequired
};

export default EditorOptions;
