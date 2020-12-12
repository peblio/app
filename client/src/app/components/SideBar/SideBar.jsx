import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './sideBar.scss';

const showClassroomOption = process.env.SHOW_CLASSROOMS_AND_PRICING === 'true';

const SideBar = ({ children, ...props }) => (
  <div className='sidebar'>
    <ul className="sidebar__nav-links">
      <li className="sidebar__nav-link">
        <NavLink
          to='/documents'
          className={window.location.href.split('/')[3] === 'dashboard' ? 'active' : ''}
          activeClassName='active'
        >
          Documents
        </NavLink>
      </li>
      {showClassroomOption && (
        <li className="sidebar__nav-link">
          <NavLink to='/classroom' activeClassName='active'>My Classes</NavLink>
        </li>
      )
      }
      <li className="sidebar__nav-link">
        <NavLink to='/trash' activeClassName='active'>Trash</NavLink>
      </li>
      <li className="sidebar__nav-link">
        <NavLink to='/account' activeClassName='active'>Account</NavLink>
      </li>
      <li className="sidebar__nav-link">
        <NavLink to='/profile' activeClassName='active'>Profile Preview</NavLink>
      </li>
    </ul>
    {children}
  </div>
);

SideBar.propTypes = {
  children: PropTypes.element,
};

SideBar.defaultProps = {
  children: {}
};

export default SideBar;
