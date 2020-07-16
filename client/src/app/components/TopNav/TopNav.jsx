import React from 'react';
import PropTypes from 'prop-types';

import PeblioLogo from '../../images/logo.svg';
import './topNav.scss';

const TopNav = ({ className, children, ...props }) => (
  <div className={`top-nav ${className || ''}`}>
    <a href="https://peblio.com" className={`top-nav__brand ${`${className}__brand` || ''}`}>
      <PeblioLogo />
    </a>
    <ul className={`top-nav__nav-links ${`${className}__nav-links` || ''}`}>
      {children}
    </ul>
  </div>
);

TopNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

TopNav.defaultProps = {
  className: '',
  children: null
};

export default TopNav;
