import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditorSplitSVG from '../../../../../images/editor-split.svg';
import EditorTabbedSVG from '../../../../../images/editor-tabbed.svg';

require('./EditorOptions.scss');

class EditorOptions extends React.Component {
  render() {
    return (
      <section className="editor-options__container">
        <button
          className="editor-options__button"
          onClick={this.props.toggleEditorLock}
        >
          Locked
        </button>
        <ul className="editor-options__view-list">
          <li className="editor-options__view">
            <button
              onClick={() => {
                this.props.setEditorView('split');
                this.props.setCurrentFile(0);
              }}
            >
              <EditorSplitSVG alt="split editor" />
            </button>
          </li>
          <li className="editor-options__view">
            <button
              onClick={() => {
                this.props.setEditorView('tabbed');
                this.props.setCurrentFile(-1);
              }}
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
  setCurrentFile: PropTypes.func.isRequired,
  setEditorView: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(EditorOptions);
