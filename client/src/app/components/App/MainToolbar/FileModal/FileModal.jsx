import React from 'react';
import PropTypes from 'prop-types';
import history from '../../../../utils/history';

require('./fileModal.scss');

class FileModal extends React.Component {
  render() {
    return (
      <ul className="file-modal__list">
        <li className="file-modal__item">
          <a
            className="file-modal__link"
            href="/"
            onMouseDown={(e) => { e.preventDefault(); }}
            onKeyDown={(e) => { e.preventDefault(); }}
          >
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
                Save
              </button>
            </li>
          </div>
        )}
      </ul>
    );
  }
}

FileModal.propTypes = {
  name: PropTypes.string.isRequired,
  savePage: PropTypes.func.isRequired,
  toggleFileDropdown: PropTypes.func.isRequired,
  viewPagesModal: PropTypes.func.isRequired
};

export default FileModal;
