import React from 'react';
import PropTypes from 'prop-types';

require('./fork.scss');

class Fork extends React.Component {
  render() {
    return (
      <div className="fork-modal__content">
        <div>
          <div className="fork-modal__title">
            Would you like to fork the page?
          </div>
          <div className="fork-modal__subtitle">
            Forking this page will save a copy to your account and allow you to save your changes.
          </div>
          <form className="fork-modal__form">
            <input
              className="fork-modal__browse-button"
              value="Just Browsing"
              onClick={() => {
                this.props.closeForkModal();
              }}
            />
            <input
              className="fork-modal__button"
              value="Fork"
              onClick={() => {
                this.props.closeForkModal();
                this.props.savePage();
              }}
            />
          </form>
        </div>
      </div>
    );
  }

}

Fork.propTypes = {
  closeForkModal: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired
};

export default Fork;
