import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import CloseSVG from '../../../../images/close.svg';
import CopySVG from '../../../../images/copy.svg';
import DragSVG from '../../../../images/drag.svg';
import * as descriptions from '../../../../constants/imageDescConstants.js';

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
        <ReactTooltip
          delayShow={descriptions.SHOW_DESC_DELAY}
          className="tooltip"
        />
        <button
          className="widget__close"
          onClick={this.duplicateEditor.bind(this)}
          data-tip={descriptions.WIDGET_DUPLICATE_DESC}
        >
          <CopySVG alt="duplicate widget" />
        </button>
        <button
          className={`widget__close widget__drag drag__${this.props.id}`}
          data-tip={descriptions.WIDGET_DRAG_DESC}
        >
          <DragSVG alt="drag widget" />
        </button>
        <button
          className="widget__close"
          onClick={this.removeEditor.bind(this)}
          data-tip={descriptions.WIDGET_DELETE_DESC}
        >
          <CloseSVG alt="close element" />
        </button>
      </nav>
    );
  }
}

WidgetNav.propTypes = {
  duplicateEditor: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  removeEditor: PropTypes.func.isRequired,
};

export default WidgetNav;
