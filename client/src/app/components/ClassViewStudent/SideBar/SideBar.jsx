import React from 'react';
import PropTypes from 'prop-types';

import './sideBar.scss';

const SideBar = ({ children, ...props }) => (
  <div className='student-sidebar' {...props}>
    <div className="student-sidebar__container">
      {children}
    </div>
  </div>
);

SideBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default SideBar;
