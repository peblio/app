import React from 'react';
import PropTypes from 'prop-types';
import PeblioLogo from '../../../images/logo.svg';

import UserAccount from '../UserAccount/UserAccount.jsx';

import './nav.scss';

class TopNav extends React.Component {
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
            container={this.props.container}
            location={this.props.location}
          />
        </div>
      </div>
    );
  }
}

TopNav.propTypes = {
  container: PropTypes.string.isRequired,
  location: PropTypes.shape({}).isRequired
};

export default TopNav;
