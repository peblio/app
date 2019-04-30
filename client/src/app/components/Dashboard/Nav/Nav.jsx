import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setDashboardView } from '../../../action/dashboard.js';
import PeblioLogo from '../../../images/logo.svg';
import UserAccount from '../../Shared/UserAccount/UserAccount.jsx';

import './nav.scss';

class Nav extends React.Component {
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
            <li className="dashboard-nav__list-item">
              <button
                className="dashboard-nav__button"
                onClick={() => { this.props.setDashboardView(0); }}
              >
              Documents
              </button>
            </li>
            <li className="dashboard-nav__list-item">
              <button
                className="dashboard-nav__button"
                onClick={() => { this.props.setDashboardView(1); }}
              >
              Account
              </button>
            </li>
            <li className="dashboard-nav__list-item">
              <button
                className="dashboard-nav__button"
              >
              Trash
              </button>
            </li>
            <li className="dashboard-nav__list-item">
              <button
                className="dashboard-nav__button"
              >
              Profile
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  blurb: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
  updateProfileBlurb: PropTypes.func.isRequired,
  setProfileBlurb: PropTypes.func.isRequired
};
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  setDashboardView
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
