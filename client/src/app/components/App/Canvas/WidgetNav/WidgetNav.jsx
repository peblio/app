import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from 'react-tooltip-lite';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CloseSVG from '../../../../images/close.svg';
import CopySVG from '../../../../images/copy.svg';
import DragSVG from '../../../../images/drag.svg';

import { duplicateEditor, removeEditor } from '../../../../action/editors.js';

require('./widgetNav.scss');

class WidgetNav extends React.Component {
  constructor(props) {
    super(props);
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.duplicateEditor = () => {
      this.props.duplicateEditor(this.props.id);
    };
  }

  render() {
    return (
      <nav className="widget__nav">
        <Tooltip content="Duplicate">
          <button
            className="widget__close"
            onClick={this.duplicateEditor.bind(this)}
            data-test="widget__duplicate"
          >
            <CopySVG alt="duplicate widget" />
          </button>
        </Tooltip>
        <Tooltip content="Drag and Drop">
          <button
            className={`widget__close widget__drag drag__${this.props.id}`}
          >
            <DragSVG alt="drag widget" />
          </button>
        </Tooltip>
        <Tooltip content="Delete">
          <button
            className="widget__close"
            onClick={this.removeEditor.bind(this)}
            data-test="widget__close"
          >
            <CloseSVG alt="close element" />
          </button>
        </Tooltip>
      </nav>
    );
  }
}

WidgetNav.propTypes = {
  duplicateEditor: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  removeEditor: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  duplicateEditor,
  removeEditor
}, dispatch);

export default connect(null, mapDispatchToProps)(WidgetNav);
