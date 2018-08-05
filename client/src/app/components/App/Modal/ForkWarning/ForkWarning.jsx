import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateShowForkWarning
} from '../../../../action/preferences';

require('./forkWarning.scss');

class ForkWarning extends Component {

  updateForkWarningPreference = (e) => {
    this.props.updateShowForkWarning(!e.target.checked);
    if (e.target.checked) {
      localStorage.setItem(process.env.LOCALSTORAGE_FORK_WARNING_VARIABLE, 1);
    } else {
      localStorage.removeItem(process.env.LOCALSTORAGE_FORK_WARNING_VARIABLE);
    }
  }
  render() {
    return (
      <section className="fork-warning__content">
        <h2 className="fork-warning__subtitle">
        Would you like to fork the page?
        </h2>
        <p className="fork-warning__text">
          Looks like this is another users page. Forking this page will save a copy to your account and allow you to save your changes.
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
            onClick={() => {
              this.props.closeForkWarning();
              this.props.savePage();
            }}
          >
            Fork
          </button>

        </div>
        <div
          className="fork-warning__option"
        >
          <input
            type="checkbox"
            onClick={this.updateForkWarningPreference}
          />
          <p className="fork-warning__option-text">
            Do not ask me again
          </p>
        </div>
      </section>
    );
  }
}

ForkWarning.propTypes = {
  closeForkWarning: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired,
  updateShowForkWarning: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // showForkWarning: state.preferences.showForkWarning
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateShowForkWarning
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForkWarning);
