import React from 'react';

import './sideBar.scss';

const SideBar = ({ ...props }) => (
  <div className='student-sidebar'>
    <ul className="student-sidebar__nav-links">
      <li className="student-sidebar__nav-link">
        <button className="active">
          All
        </button>
      </li>
      <li className="student-sidebar__nav-link">
        <button>Assignments</button>
      </li>
      <li className="student-sidebar__nav-link">
        <button>Resources</button>
      </li>
    </ul>
  </div>
);

export default SideBar;
