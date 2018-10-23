import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { submitPage } from '../../../../action/page.js';
import * as PageDefaults from '../../../../constants/pageConstants.js';

require('./shareWorkspace.scss');

class ShareWorkspace extends React.Component {
  constructor(props) {
    super(props);
  }

  saveAndShareWorkspace=() => {
    const tempEditor = this.props.workspace;
    tempEditor.id = 'editor-0';
    tempEditor.index = 0;
    tempEditor.type = 'code';
    tempEditor.innerWidth = 200;
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
      <section className='share-workspace__container'>
        <div className='share-workspace__option'>
          <h1 className='share-workspace__text-primary'>
            Save and share your project!
          </h1>
          <p className='share-workspace__text-secondary'>
            You will have a chance to edit your project page.
          </p>
          <label
            htmlFor='share-workspace__title'
            className='share-workspace__label'
          >
            title
          </label>
          <input
            id='share-workspace__title'
            className='share-workspace__title'
            ref={(element) => { this.title = element; }}
          />

          <div className='share-workspace__button-container'>
            <button
              className='share-workspace__button'
              onClick={this.props.closeModal}
            >
            Cancel
            </button>
            <button
              className='share-workspace__button'
              onClick={this.saveAndShareWorkspace}
            >
            Continue
            </button>
          </div>
        </div>

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
