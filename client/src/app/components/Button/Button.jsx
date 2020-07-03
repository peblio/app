import React from 'react';
import './button.scss';

const Button = ({className, children, ...props }) => {
  return (
    <button className={`button ${className ? className:''}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
