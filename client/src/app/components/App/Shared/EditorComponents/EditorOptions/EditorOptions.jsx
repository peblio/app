import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import EditorSplitSVG from '../../../../../images/editor-split.svg';
import EditorTabbedSVG from '../../../../../images/editor-tabbed.svg';

require('./EditorOptions.scss');

class EditorOptions extends React.Component {
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
    let editorLockButtonText;
    if (this.props.isLocked) {
      editorLockButtonText = 'Locked';
    } else {
      editorLockButtonText = 'Unlocked';
    }
    return (
      <section className="editor-options__container">
        <button
          className="editor-options__button"
          onClick={() => {
            if (!this.props.isLocked) {
              this.props.setEditorLock();
            } else {
              this.props.removeEditorLock();
            }
          }}
        >
          {editorLockButtonText}
        </button>
        <ul className="editor-options__view-list">
          <li className="editor-options__view">
            <button
              className={classNames(editorSplitViewClass, editorViewClass)}
              onClick={() => {
                this.props.setEditorView('split');
                this.props.setCurrentFile(0);
              }}
              disabled={this.props.isLocked}
            >
              <EditorSplitSVG alt="split editor" />
            </button>
          </li>
          <li className="editor-options__view">
            <button
              className={classNames(editorTabbedViewClass, editorViewClass)}
              onClick={() => {
                this.props.setEditorView('tabbed');
                this.props.setCurrentFile(-1);
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
  isLocked: PropTypes.bool.isRequired,
  removeEditorLock: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setEditorView: PropTypes.func.isRequired,
  setEditorLock: PropTypes.func.isRequired,
};

export default EditorOptions;
