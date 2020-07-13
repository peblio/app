import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './sideBar.scss';

const SideBar = ({ children, ...props }) => (
  <div className='sidebar'>
    <ul className="sidebar__nav-links">
      <li className="sidebar__nav-link">
        <a href="#">Documents</a>
      </li>
      <li className="sidebar__nav-link active">
        <a href="#">My Classes</a>
      </li>
      <li className="sidebar__nav-link">
        <a href="#">Trash</a>
      </li>
      <li className="sidebar__nav-link">
        <a href="#">Account</a>
      </li>
      <li className="sidebar__nav-link">
        <a href="#">Profile Preview</a>
      </li>
    </ul>
    {children}
  </div>
);

SideBar.propTypes = {
  children: PropTypes.node
};

SideBar.defaultProps = {
  children: {}
};

export default SideBar;
