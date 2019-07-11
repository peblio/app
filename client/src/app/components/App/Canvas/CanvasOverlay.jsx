import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCurrentToVersion } from '../../../action/pageVersion.js';
import { setPreviewMode } from '../../../action/page.js';

class CanvasOverlay extends React.Component {
  restorePage = () => {
    this.props.saveCurrentToVersion(this.props.id);
    this.props.savePage();
    this.props.hideOldPageVersion();
    this.props.setPreviewMode(false);
  }

  cancelPageVersion = () => {
    this.props.loadCurrentPage(this.props.id);
    this.props.hideOldPageVersion();
    this.props.setPreviewMode(false);
  }

  render() {
    return (
      <div className="canvas-overlay__container">
        <div className="canvas-overlay__button-container">
          <button
            className="canvas-overlay__button"
            onClick={this.restorePage}
          >
            Restore to this Version
          </button>
          <button
            className="canvas-overlay__button"
            onClick={this.cancelPageVersion}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

CanvasOverlay.propTypes = {
  hideOldPageVersion: PropTypes.func.isRequired,
  loadCurrentPage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  saveCurrentToVersion: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
  setPreviewMode: PropTypes.func.isRequired,
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
  setPreviewMode
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CanvasOverlay);
