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
                  <a className="fileModal__link" onClick={this.props.viewPagesModal}>
                    Open
                  </a>
                </li>
                <li className="fileModal__item">
                  <a className="fileModal__link" onClick={this.props.savePage}>
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
  viewPagesModal: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default FileModal;
