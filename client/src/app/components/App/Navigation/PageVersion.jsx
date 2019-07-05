import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pageVersionAction from '../../../action/pageVersion.js';

require('./pageVersion.scss');

class PageVersion extends React.Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.loadHistoryForPage(this.props.id);
    }
  }

  displayOldVersion = (id, versionId) => {
    console.log(versionId);
    this.props.loadPageVersion(id, versionId);
  }

  renderPageVersionButton = historyItem => (
    <button
      className="navigation__item navigation__item-title"
      onClick={(e) => {
        this.displayOldVersion(historyItem.id, historyItem.version_id);
      }}
    >
      {historyItem.createdAt}
    </button>
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
                this.props.pageVersion.map((historyItem, i) => this.renderPageVersionButton(historyItem))
              }
            </li>
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
  ...pageVersionAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageVersion);
