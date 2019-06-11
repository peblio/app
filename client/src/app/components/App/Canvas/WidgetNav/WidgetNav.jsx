import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from 'react-tooltip-lite';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CloseSVG from '../../../../images/close.svg';
import CopySVG from '../../../../images/copy.svg';
import DragSVG from '../../../../images/drag.svg';
import Modal from '../../Modal/Modal.jsx';
import DeleteWidgetWarning from '../../Modal/DeleteWidgetWarning/DeleteWidgetWarning.jsx';

import { duplicateEditor, removeEditor,
  closeDeleteWidgetWarning, openDeleteWidgetWarning } from '../../../../action/editors.js';

require('./widgetNav.scss');

class WidgetNav extends React.Component {
  constructor(props) {
    super(props);
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.duplicateEditor = () => {
      this.props.duplicateEditor(this.props.id);
    };
  }

  showDeleteWidgetWarning = () => {
    this.props.openDeleteWidgetWarning(this.props.id);
  }

  closeDeleteWidgetWarning = () => {
    this.props.closeDeleteWidgetWarning(this.props.id);
  }

  render() {
    return (
      <nav className="widget__nav">
        <Tooltip content="Duplicate">
          <button
            className="widget__delete"
            onClick={this.duplicateEditor.bind(this)}
            data-test="widget__duplicate"
          >
            <CopySVG alt="duplicate widget" />
          </button>
        </Tooltip>
        <Tooltip content="Drag and Drop">
          <button
            className={`widget__delete widget__drag drag__${this.props.id}`}
          >
            <DragSVG alt="drag widget" />
          </button>
        </Tooltip>
        <Tooltip content="Delete">
          <button
            className="widget__delete"
            onClick={this.showDeleteWidgetWarning}
            data-test="widget__delete"
          >
            <CloseSVG alt="close element" />
          </button>
        </Tooltip>
        <Modal
          size="small"
          isOpen={this.props.showDeleteWidgetWarning}
          closeModal={this.closeDeleteWidgetWarning}
        >
          <DeleteWidgetWarning
            deleteWidget={this.removeEditor.bind(this)}
            closeModal={this.closeDeleteWidgetWarning}
          />
        </Modal>
      </nav>
    );
  }
}

WidgetNav.propTypes = {
  duplicateEditor: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  showDeleteWidgetWarning: PropTypes.bool.isRequired,
  removeEditor: PropTypes.func.isRequired,
  closeDeleteWidgetWarning: PropTypes.func.isRequired,
  openDeleteWidgetWarning: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  duplicateEditor,
  removeEditor,
  closeDeleteWidgetWarning,
  openDeleteWidgetWarning
}, dispatch);

export default connect(null, mapDispatchToProps)(WidgetNav);
