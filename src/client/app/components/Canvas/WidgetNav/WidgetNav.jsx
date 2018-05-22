import React from 'react';
import PropTypes from 'prop-types';
import CloseSVG from '../../../images/close.svg';
import CopySVG from '../../../images/copy.svg';
import DragSVG from '../../../images/drag.svg';

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
          <CopySVG alt="duplicate element" />
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
