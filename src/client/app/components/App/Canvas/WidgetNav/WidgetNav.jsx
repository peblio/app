import React from 'react';
import PropTypes from 'prop-types';
import CloseSVG from '../../../../images/close.svg';
import CopySVG from '../../../../images/copy.svg';
import DragSVG from '../../../../images/drag.svg';

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
        <button className="widget__close" onClick={this.duplicateEditor.bind(this)}>
          <CopySVG alt="duplicate widget" />
        </button>
        <button
          className={`widget__close widget__drag drag__${this.props.id}`}
        >
          <DragSVG alt="drag widget" />
        </button>
        <button className="widget__close" onClick={this.removeEditor.bind(this)}>
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
