import React, { PropTypes } from 'react';

class FileModal extends React.Component {
  render() {
    return (
      <ul className="fileModal__list">
        <li className="fileModal__item">
          <a className="fileModal__link" href="/">New</a>
        </li>
        {(() => { // eslint-disable-line
          if (this.props.name) {
            return (
              <div>
                <li className="fileModal__item">
                  <a
                    className="fileModal__link" onClick={() => {
                      this.props.viewPagesModal();
                      this.props.toggleFileDropdown();
                    }}
                  >
                    Open
                  </a>
                </li>
                <li className="fileModal__item">
                  <a
                    className="fileModal__link" onClick={() => {
                      this.props.savePage();
                      this.props.toggleFileDropdown();
                    }}
                  >
                    Save
                  </a>
                </li>
              </div>
            );
          }
        })()}
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
