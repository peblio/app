import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setDashboardView } from '../../../action/dashboard';

import './sideBar.scss';

// eslint-disable-next-line no-shadow
const SideBar = ({ children, dashboardView, setDashboardView, ...props }) => (
  <div className='sidebar'>
    <ul className="sidebar__nav-links">
      <li className={`sidebar__nav-link ${dashboardView === 'documents' ? 'active' : ''}`}>
        <button className="sidebar__nav-link__btn" onClick={() => { setDashboardView('documents'); }}>
          Documents
        </button>
      </li>
      <li className={`sidebar__nav-link ${dashboardView === 'classes' ? 'active' : ''}`}>
        <button className="sidebar__nav-link__btn" onClick={() => { setDashboardView('classes'); }}>
          My Classes
        </button>
      </li>
      <li className={`sidebar__nav-link ${dashboardView === 'trash' ? 'active' : ''}`}>
        <button className="sidebar__nav-link__btn" onClick={() => { setDashboardView('trash'); }}>
          Trash
        </button>
      </li>
      <li className={`sidebar__nav-link ${dashboardView === 'account' ? 'active' : ''}`}>
        <button className="sidebar__nav-link__btn" onClick={() => { setDashboardView('account'); }}>
          Account
        </button>
      </li>
      <li className={`sidebar__nav-link ${dashboardView === 'profile' ? 'active' : ''}`}>
        <button className="sidebar__nav-link__btn" onClick={() => { setDashboardView('profile'); }}>
          Profile Preview
        </button>
      </li>
    </ul>
    {children}
  </div>
);

SideBar.propTypes = {
  children: PropTypes.element,
  dashboardView: PropTypes.string.isRequired,
  setDashboardView: PropTypes.func.isRequired
};

SideBar.defaultProps = {
  children: {}
};


function mapStateToProps(state) {
  return {
    dashboardView: state.dashboard.dashboardView,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setDashboardView,
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(SideBar));
