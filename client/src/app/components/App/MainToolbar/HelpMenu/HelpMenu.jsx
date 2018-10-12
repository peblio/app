import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../../../utils/history';
import * as mainToolbarActions from '../../../../action/mainToolbar.js';

class HelpMenu extends React.Component {
  render() {
    return (
      <ul className="file-modal__list">
        <li className="file-modal__item">
          <a
            className="file-modal__link"
            href="https://demo.peblio.co/pebl/XeJAt6pVQ"
            onMouseDown={(e) => { e.preventDefault(); }}
            onKeyDown={(e) => { e.preventDefault(); }}
            target="_blank"
          >
            <i className="fas fa-book"></i>
            {' '}
            Guide
          </a>
        </li>
        <li className="file-modal__item">
          <button
            className="file-modal__link"
            onMouseDown={() => {
              this.props.viewWelcomeModal();
              this.props.toggleHelpDropdown();
            }}
            onKeyDown={() => {
              this.props.viewWelcomeModal();
              this.props.toggleHelpDropdown();
            }}
          >
            <i className="fas fa-chalkboard-teacher"></i>
            {' '}
            Tutorial
          </button>
        </li>
        <li className="file-modal__item">
          <a
            className="file-modal__link"
            href="https://demo.peblio.co/pebl/yWzLLSWLM"
            onMouseDown={(e) => { e.preventDefault(); }}
            onKeyDown={(e) => { e.preventDefault(); }}
            target="_blank"
          >
            <i className="fas fa-comment-alt"></i>
            {' '}
            Feedback
          </a>
        </li>
      </ul>
    );
  }
}

HelpMenu.propTypes = {
  toggleHelpDropdown: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  ...mainToolbarActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(HelpMenu);
