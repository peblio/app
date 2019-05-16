import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setDashboardView, setDocumentSort } from '../../../action/dashboard.js';
import PeblioLogo from '../../../images/logo.svg';
import UserAccount from '../../Shared/UserAccount/UserAccount.jsx';

import './nav.scss';

class Nav extends React.Component {
  renderListItem=(displayText, viewName) => (
    <li className="dashboard-nav__list-item">
      <button
        className="dashboard-nav__button"
        onClick={() => { this.props.setDashboardView(viewName); }}
      >
        {displayText}
      </button>
    </li>
  )

  setDocumentSort = (e) => {
    this.props.setDocumentSort(e.target.value);
  }

  render() {
    return (
      <div className="dashboard-nav__container">
        <div className="dashboard-nav__upper-container">
          <a
            className="logo_toolbar"
            href="https://www.peblio.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PeblioLogo alt="logo in toolbar" />
          </a>
          <UserAccount
            container='profile'
            location={this.props.location}
          />
        </div>
        <div className="dashboard-nav__lower-container">
          <ul className="dashboard-nav__list">
            {this.renderListItem('Documents', 'documents')}
            {this.renderListItem('Account', 'account')}
            {this.renderListItem('Trash', 'account')}
            {this.renderListItem('Profile', 'profile')}
          </ul>
          {this.props.dashboardView === 'documents' && (
            <div>
              <select
                className="dashboard-nav__dropdown"
                id="dashboard-sort"
                name="dashboard-sort"
                onChange={this.setDocumentSort}
                ref={(dashboardSort) => { this.dashboardSort = dashboardSort; }}
                value={this.props.documentSort}
              >
                <option value="-updatedAt">Updated At</option>
                <option value="title">Title</option>
              </select>
              <label
                className="signup-modal__label"
                htmlFor="student"
              >
                <input
                  required
                  type="radio"
                  className="signup-modal__radio"
                  name="documentView"
                  value="block"
                  onChange={(e) => {
                    this.props.setDocumentView('block');
                  }}
                />
                Block
              </label>
              <label
                className="signup-modal__label"
                htmlFor="student"
              >
                <input
                  required
                  type="radio"
                  className="signup-modal__radio"
                  name="documentView"
                  value="line"
                  onChange={(e) => {
                    this.props.setDocumentView('line');
                  }}
                />
                Line
              </label>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  setDashboardView: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    dashboardView: state.dashboard.dashboardView
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setDashboardView,
  setDocumentSort
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
