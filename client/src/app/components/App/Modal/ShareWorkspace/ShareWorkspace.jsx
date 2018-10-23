import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { submitPage } from '../../../../action/page.js';
import * as PageDefaults from '../../../../constants/pageConstants.js';

// require('./shareModal.scss');

class ShareWorkspace extends React.Component {
  constructor(props) {
    super(props);
  }

  saveAndShareWorkspace=() => {
    const tempEditor = this.props.workspace;
    tempEditor.id = 'editor-0';
    tempEditor.index = 0;
    tempEditor.type = 'code';
    this.props.submitPage(
      '',
      this.title.value,
      this.title.value,
      { 'editor-0': tempEditor },
      1,
      PageDefaults.STARTER_WORKSPACE_LAYOUT,
      'fromWP',
      PageDefaults.DEFAULT_WORKSPACE_MODE
    );
    this.props.closeModal();
  }

  render() {
    return (
      <section className="share-workspace__container">
        <div className="share-workspace__option">
          <h1 className="share-workspace__text-primary">
            Save and share your project!
          </h1>
          <input
            className="share-workspace__title"
            ref={(element) => { this.title = element; }}
          />

          <div className="share-workspace__button-container">
            <button
              className="share-workspace__link"
              onClick={this.props.closeModal}
            >
            Cancel
            </button>
            <button
              className="share-workspace__link"
              onClick={this.saveAndShareWorkspace}
            >
            Continue
            </button>
          </div>
        </div>
        <p className="share-workspace__text-secondary">or</p>
      </section>
    );
  }
}


ShareWorkspace.propTypes = {
  submitPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  submitPage
}, dispatch);

export default connect(null, mapDispatchToProps)(ShareWorkspace);
