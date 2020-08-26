import React from 'react';
import './iconButton.scss';

import PropTypes from 'prop-types';

const IconButton = ({ children, icon, ...props }) => (
  <button className={`icon-button ${children.length !== 0 ? '' : 'icon-button--no-label'}`} type="button" {...props}>
    <div className="icon-button__icon">
      {icon}
    </div>
    {
      children.length !== 0 && (
        <div className="icon-button__text">
          {children}
        </div>
      )
    }
  </button>
);

IconButton.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.element.isRequired
};

IconButton.defaultProps = {
  children: []
};

export default IconButton;
