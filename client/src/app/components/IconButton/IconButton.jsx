import React from 'react';
import './iconButton.scss';

import PropTypes from 'prop-types';

const IconButton = ({ children, icon, ...props }) => (
  <button className="icon-button" type="button" {...props}>
    <div className="icon-button__icon">
      {icon}
    </div>
    <div className="icon-button__text">
      {children}
    </div>
  </button>
);

IconButton.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

export default IconButton;
