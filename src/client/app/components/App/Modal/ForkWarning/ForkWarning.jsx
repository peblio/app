import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('./forkWarning.scss');

class ForkWarning extends Component {

  render() {
    return (
      <section className="fork-warning__content">
        <h2 className="fork-warning__subtitle">
        Would you like to fork the page?
        </h2>
        <p className="fork-warning__text">
          Forking this page will save a copy to your account and allow you to save your changes.
        </p>
        <div className="fork-warning__buttons">
          <button
            className="fork-warning__button"
            type="submit"
            value="Submit"
            onClick={this.props.closeForkWarning}
          >
            Just Browsing
          </button>
          <button
            className="fork-warning__button"
            type="submit"
            value="Submit"
          >
            Fork
          </button>
        </div>
      </section>
    );
  }
}

ForkWarning.propTypes = {
  closeForkWarning: PropTypes.func.isRequired
};

export default ForkWarning;
