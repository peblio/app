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

import { duplicateWidget, removeWidget,
  closeDeleteWidgetWarning, openDeleteWidgetWarning } from '../../../../action/editors.js';

require('./widgetNav.scss');

class WidgetNav extends React.Component {
  constructor(props) {
    super(props);
    this.removeWidget = () => { this.props.removeWidget(this.props.id); };
    this.duplicateWidget = () => {
      this.props.duplicateWidget(this.props.id);
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
            onClick={this.duplicateWidget.bind(this)}
            data-test="widget__duplicate"
            id="widget__duplicate"
          >
            <CopySVG alt="duplicate widget" />
          </button>
        </Tooltip>
        <Tooltip content="Drag and Drop">
          <button
            className={`widget__delete widget__drag drag__${this.props.id}`}
            id="widget__drag"
          >
            <DragSVG alt="drag widget" />
          </button>
        </Tooltip>
        <Tooltip content="Delete">
          <button
            className="widget__delete"
            onClick={this.showDeleteWidgetWarning}
            data-test="widget__delete"
            id="widget__delete"
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
            deleteWidget={this.removeWidget.bind(this)}
            closeModal={this.closeDeleteWidgetWarning}
          />
        </Modal>
      </nav>
    );
  }
}

WidgetNav.propTypes = {
  duplicateWidget: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  showDeleteWidgetWarning: PropTypes.bool.isRequired,
  removeWidget: PropTypes.func.isRequired,
  closeDeleteWidgetWarning: PropTypes.func.isRequired,
  openDeleteWidgetWarning: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  duplicateWidget,
  removeWidget,
  closeDeleteWidgetWarning,
  openDeleteWidgetWarning
}, dispatch);

export default connect(null, mapDispatchToProps)(WidgetNav);
