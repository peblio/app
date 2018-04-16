import React from 'react';
import PropTypes from 'prop-types';
import DragSVG from '../images/drag.svg';
import CloseSVG from '../images/close.svg';

class WidgetNav extends React.Component {
  constructor(props) {
    super(props);
    this.removeEditor = () => { this.props.removeEditor(this.props.id); };
    this.duplicateEditor = () => { this.props.duplicateEditor(this.props.id); };
  }

  render() {
    return (
      <nav className="element__nav">
        <button className="element__close" onClick={this.removeEditor.bind(this)}>
          <CloseSVG alt="close element" />
        </button>
        <button
          className={`element__close element__drag drag__${this.props.id}`}
        >
          <DragSVG alt="drag element" />
        </button>
        <button className="element__close" onClick={this.duplicateEditor.bind(this)}>
          <DragSVG alt="duplicate element" />
        </button>
      </nav>
    );
  }
}

WidgetNav.propTypes = {
  id: PropTypes.string.isRequired,
  editorIndex: PropTypes.number.isRequired,
  editors: PropTypes.shape.isRequired,
  removeEditor: PropTypes.func.isRequired,
};

export default WidgetNav;
