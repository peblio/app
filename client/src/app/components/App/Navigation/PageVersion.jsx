import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pageVersionAction from '../../../action/pageVersion.js';
import { loadCurrentPage } from '../../../action/page.js';

require('./pageVersion.scss');

class PageVersion extends React.Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.loadHistoryForPage(this.props.id);
    }
  }

  displayOldVersion = (id, versionId) => {
    this.props.loadPageVersion(id, versionId);
    this.props.showOldPageVersion();
  }

  loadCurrentPage = (id) => {
    this.props.loadCurrentPage(id);
    this.props.hideOldPageVersion();
  }

  renderCurrentVersionButton = id => (
    <li>
      <button
        className="navigation__item navigation__item-title page-version__button"
        onClick={(e) => {
          this.loadCurrentPage(id);
        }}
      >
        current Version
      </button>
    </li>
  )

  renderPageVersionButton = historyItem => (
    <li>
      <button
        className="navigation__item navigation__item-title page-version__button"
        onClick={(e) => {
          this.displayOldVersion(historyItem.id, historyItem.version_id);
        }}
      >
        {moment(historyItem.createdAt).format('LLL')}
      </button>
    </li>
  )

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
        {this.props.isNavigationOpen && this.props.pageVersion && (
          <section
            className="navigation__container navigation__container--expanded history__container"
          >
            <nav className="navigation__options">
              <Tooltip content="Close">
                <button
                  className="navigation__option-button"
                  onClick={this.props.closeNavigationContent}
                >
                  <i className="fas fa-times"></i>
                </button>
              </Tooltip>
            </nav>
            <ul className="navigation__items">
              {this.renderCurrentVersionButton(this.props.id)}
              {
                this.props.pageVersion.reverse().map((historyItem, i) => this.renderPageVersionButton(historyItem))
              }
            </ul>
          </section>
        )}
      </div>
    );
  }
}

PageVersion.propTypes = {
  closeNavigationContent: PropTypes.func.isRequired,
  isNavigationOpen: PropTypes.bool.isRequired,
  openNavigationContent: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  loadHistoryForPage: PropTypes.func.isRequired,
  pageVersion: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  isNavigationOpen: state.navigation.isNavigationOpen,
  preview: state.page.preview,
  id: state.page.id,
  pageVersion: state.pageVersion.pageVersion
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...pageVersionAction,
  loadCurrentPage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageVersion);
