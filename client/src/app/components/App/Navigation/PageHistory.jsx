import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationAction from '../../../action/navigation.js';

require('./navigation.scss');

class PageHistory extends React.Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.loadHistoryForPage(this.props.id);
    }
  }

  render() {
    return (
      <div>
        <button
          className="navigation__open-button"
          onClick={this.props.openNavigationContent}
        >
          <Tooltip content="Table of Contents">
            <i className="fas fa-bars"></i>
          </Tooltip>
        </button>
        {this.props.isNavigationOpen && this.props.pageHistory && (
          <section
            className="navigation__container navigation__container--expanded history__container"
          >
            <nav className="navigation__options">
              {this.props.preview || (
                <Tooltip content="Refresh">
                  <button
                    className="navigation__option-button"
                  >
                    <i className="fas fa-redo"></i>
                  </button>
                </Tooltip>
              )}
              <Tooltip content="Close">
                <button
                  className="navigation__option-button"
                  onClick={this.props.closeNavigationContent}
                >
                  <i className="fas fa-times"></i>
                </button>
              </Tooltip>
            </nav>
            <li className="navigation__items">
              {
                this.props.pageHistory.map((historyItem, i) => (
                  <ul className="navigation__item navigation__item-title">
                    {historyItem.createdAt}
                  </ul>
                ))
              }
            </li>
          </section>
        )}
      </div>
    );
  }
}

PageHistory.propTypes = {
  closeNavigationContent: PropTypes.func.isRequired,
  isNavigationOpen: PropTypes.bool.isRequired,
  openNavigationContent: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  loadHistoryForPage: PropTypes.func.isRequired,
  pageHistory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  isNavigationOpen: state.navigation.isNavigationOpen,
  preview: state.page.preview,
  id: state.page.id,
  pageHistory: state.navigation.pageHistory
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...navigationAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageHistory);
