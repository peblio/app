import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCurrentToVersion, savePageVersion } from '../../../action/pageVersion.js';

class CanvasOverlay extends React.Component {
  restorePage=() => {
    this.props.saveCurrentToVersion(this.props.id);
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

const mapStateToProps = state => ({
  parentId: state.page.parentId,
  id: state.page.id,
  title: state.page.pageTitle,
  heading: state.page.pageHeading,
  snapshotPath: '',
  description: state.page.description,
  editors: state.editorsReducer.editors,
  editorIndex: state.editorsReducer.editorIndex,
  layout: state.page.layout,
  workspace: state.workspace.workspace,
  isPublished: state.page.isPublished,
  tags: state.page.tags,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  saveCurrentToVersion,
  savePageVersion
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOverlay);
