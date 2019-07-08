import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pageVersionAction from '../../../action/pageVersion.js';
import { loadCurrentPage, setPreviewMode } from '../../../action/page.js';

require('./pageVersion.scss');

class PageVersion extends React.Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.loadHistoryForPage(this.props.id);
    }
  }

  displayOldVersion = (id, versionId) => {
    this.props.loadPageVersion(id, versionId);
    this.props.showOldPageVersion(versionId);
    this.props.setPreviewMode(true);
  }

  loadCurrentPage = (id) => {
    this.props.loadCurrentPage(id);
    this.props.hideOldPageVersion();
    this.props.setPreviewMode(false);
  }

  renderCurrentVersionButton = id => (
    <li>
      <button
        className={
          `navigation__item-title page-version__button
          ${this.props.isOldVersionShowing ? '' : 'page-version__button--selected'}`
        }
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
        className={
          `navigation__item-title page-version__button
            ${(this.props.selectedPageVersion === historyItem.version_id)
            ? 'page-version__button--selected' : ''}`}
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
        {this.props.isPageVersionOpen && this.props.pageVersion && (
          <section
            className="navigation__container navigation__container--expanded page-version__container"
          >
            <h1 className="navigation__item-title page-version__title">
              History
            </h1>
            <ul className="navigation__items page-version__items">
              {this.renderCurrentVersionButton(this.props.id)}
              {
                this.props.pageVersion.slice().reverse().map(
                  (historyItem, i) => this.renderPageVersionButton(historyItem)
                )
              }
            </ul>
          </section>
        )}
      </div>
    );
  }
}

PageVersion.propTypes = {
  hideOldPageVersion: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isOldVersionShowing: PropTypes.bool.isRequired,
  isPageVersionOpen: PropTypes.bool.isRequired,
  loadCurrentPage: PropTypes.func.isRequired,
  loadHistoryForPage: PropTypes.func.isRequired,
  loadPageVersion: PropTypes.func.isRequired,
  openNavigationContent: PropTypes.func.isRequired,
  pageVersion: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedPageVersion: PropTypes.string.isRequired,
  setPreviewMode: PropTypes.func.isRequired,
  showOldPageVersion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  id: state.page.id,
  isOldVersionShowing: state.pageVersion.isOldVersionShowing,
  isPageVersionOpen: state.pageVersion.isPageVersionOpen,
  pageVersion: state.pageVersion.pageVersion,
  preview: state.page.preview,
  selectedPageVersion: state.pageVersion.selectedPageVersion
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...pageVersionAction,
  loadCurrentPage,
  setPreviewMode
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageVersion);
