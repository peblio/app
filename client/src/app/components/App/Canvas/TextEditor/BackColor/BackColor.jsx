import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import BackColorSVG from '../../../../../images/backColor.svg';

require('./backColor.scss');

class BackColor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  handleChangeComplete(color) {
    this.props.setBackColor(color.hex);
  }

  render() {
    return (
      <div
        className="back-color__container"
      >
        <button
          className="rdw-option-wrapper back-color__button"
          onClick={this.props.toggleCollapse}
        >
          <BackColorSVG alt="background color" />

        </button>
        { this.props.expanded && (
          <div className="back-color__sub-container">
            <SketchPicker
              color={this.props.backColor}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        )}

      </div>
    );
  }
}

BackColor.propTypes = {
  backColor: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  setBackColor: PropTypes.func.isRequired
};

export default BackColor;
