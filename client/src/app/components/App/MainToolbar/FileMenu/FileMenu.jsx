import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toggleFileDropdown,
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
            data-test="file-menu__new-link"
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
                data-test="file-menu__pages-button"
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
                data-test="file-menu__save-button"
              >
                <i className="fas fa-check"></i>
                {' '}
                Save
              </button>
            </li>
          </div>
        )}
      </ul>
    );
  }
}

FileMenu.propTypes = {
  name: PropTypes.string.isRequired,
  savePage: PropTypes.func.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  toggleFileDropdown,
  viewPagesModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FileMenu);
