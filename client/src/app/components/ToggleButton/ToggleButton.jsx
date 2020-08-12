import React from 'react';
import PropTypes from 'prop-types';

import './toggleButton.scss';

const ToggleButton = ({ state, onClick, ...props }) => (
  <button
    onClick={onClick}
    className={`toggle-button ${state ? 'toggle-button--active' : ''}`}
    {...props}
  >
    <span className="toggle-button__toggle">
    </span>
  </button>
);

ToggleButton.propTypes = {
  state: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ToggleButton;
