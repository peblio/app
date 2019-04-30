import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setDashboardView } from '../../../action/dashboard.js';
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
            {this.renderListItem('Profile', 'account')}

          </ul>
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  setDashboardView: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
};


const mapDispatchToProps = dispatch => bindActionCreators({
  setDashboardView
}, dispatch);

export default connect(null, mapDispatchToProps)(Nav);
