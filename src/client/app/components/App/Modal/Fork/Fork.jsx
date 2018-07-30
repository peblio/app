import React from 'react';
import PropTypes from 'prop-types';

require('./fork.scss');

class Fork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true
    };

    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleCheckBoxChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ isChecked: value });
  }

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
                this.props.setShowForkModal(!this.state.isChecked);
                this.props.closeForkModal();
              }}
            />
            <input
              className="fork-modal__button"
              value="Fork"
              onClick={() => {
                this.props.setShowForkModal(!this.state.isChecked);
                this.props.closeForkModal();
                this.props.savePage();
              }}
            />
          </form>
          <div className="fork-modal__checkbox-container">
            <input
              id="fork-modal__dont-ask"
              name="fork-modal__dont-ask"
              type="checkbox"
              className="fork-modal__checkbox"
              onChange={this.handleCheckBoxChange}
              checked={this.state.isChecked}
            />
            <label htmlFor="fork-modal__dont-ask">Don‘t ask me again</label>
          </div>
        </div>
      </div>
    );
  }

}

Fork.propTypes = {
  closeForkModal: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
  setShowForkModal: PropTypes.func.isRequired
};

export default Fork;
