import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import TopNav from '../TopNav/TopNav';
import ProgressBar from '../ProgressBar/ProgressBar';

import SideBar from '../SideBar/SideBar';
import './dashboardBase.scss';

// actions
import { loadMemoryConsumed } from '../../action/dashboard';
import { fetchCurrentUser } from '../../action/user';

// eslint-disable-next-line no-shadow
const DashboardBase = ({ memoryConsumed, loadMemoryConsumed, fetchCurrentUser, children }) => {
  useEffect(() => {
    fetchCurrentUser();
    loadMemoryConsumed();
  }, []);

  return (
    <React.Fragment>
      <TopNav />
      <div className="dashboard">
        <SideBar>
          <ProgressBar
            style={{
              padding: '25px',
              borderTop: '1px solid #CCD0D2'
            }}
            label="STORAGE"
            completed={memoryConsumed}
            total={1024}
            units="MB"
            containerWidth="100%"
          />
        </SideBar>
        <div className="dashboard__children">
          <div className="dashboard__children__container">
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

DashboardBase.propTypes = {
  memoryConsumed: PropTypes.number.isRequired,
  loadMemoryConsumed: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

function mapStateToProps(state) {
  return {
    memoryConsumed: state.dashboard.memoryConsumed,
    name: PropTypes.string.isRequired,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadMemoryConsumed,
    fetchCurrentUser
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(DashboardBase));
