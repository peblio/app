import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toggleFileDropdown,
  viewExamplesModal,
  viewPagesModal } from '../../../../action/mainToolbar.js';

require('./fileMenu.scss');

class FileMenu extends React.Component {
  render() {
    return (
      <ul className="file-modal__list">
        <li className="file-modal__item">
          <a
            className="file-modal__link"
            href="/"
            onMouseDown={(e) => { e.preventDefault(); }}
            onKeyDown={(e) => { e.preventDefault(); }}
            target="_blank"
          >
            <i className="fas fa-plus"></i>
            {' '}
          New
          </a>
        </li>
        {this.props.name && (
          <div>
            <li className="file-modal__item">
              <button
                className="file-modal__link"
                onMouseDown={() => {
                  this.props.viewPagesModal();
                  this.props.toggleFileDropdown();
                }}
                onKeyDown={() => {
                  this.props.viewPagesModal();
                  this.props.toggleFileDropdown();
                }}
                data-test="show-pages-modal"
              >
                <i className="fas fa-bars"></i>
                {' '}
                Open
              </button>
            </li>
            <li className="file-modal__item">
              <button
                className="file-modal__link"
                onMouseDown={() => {
                  this.props.savePage();
                  this.props.toggleFileDropdown();
                }}
                onKeyDown={() => {
                  this.props.savePage();
                  this.props.toggleFileDropdown();
                }}
              >
                <i className="fas fa-check"></i>
                {' '}
                Save
              </button>
            </li>
          </div>
        )}
        <li className="file-modal__item">
          <button
            className="file-modal__link"
            onMouseDown={() => {
              this.props.viewExamplesModal();
              this.props.toggleFileDropdown();
            }}
            onKeyDown={() => {
              this.props.viewExamplesModal();
              this.props.toggleFileDropdown();
            }}
          >
            <i className="fas fa-folder"></i>
            {' '}
            Examples
          </button>
        </li>
      </ul>
    );
  }
}

FileMenu.propTypes = {
  name: PropTypes.string.isRequired,
  savePage: PropTypes.func.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  viewExamplesModal: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  toggleFileDropdown,
  viewExamplesModal,
  viewPagesModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FileMenu);
