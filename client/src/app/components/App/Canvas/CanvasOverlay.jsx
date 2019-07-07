import PropTypes from 'prop-types';
import React from 'react';

class CanvasOverlay extends React.Component {
  restorePage=() => {
    this.props.savePage();
  }

  render() {
    return (
      <div className="canvas-overlay__container">
        <div className="canvas-overlay__button-container">
          <button
            className="canvas-overlay__button"
            onClick={() => { this.restorePage(); }}
          >
            Restore
          </button>
          <button
            className="canvas-overlay__button"
            onClick={() => {
              this.props.loadCurrentPage(this.props.id);
              this.props.hideOldPageVersion();
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

CanvasOverlay.propTypes = {
  isImageSmall: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  openFileUpload: PropTypes.func.isRequired,
  openImageResizer: PropTypes.func.isRequired
};

export default CanvasOverlay;
