import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const Button = ({ className, children, ...props }) => (
  <button className={`button ${className}`} {...props}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default Button;
