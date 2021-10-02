import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import TopNav from '../TopNav/TopNav';
import ProgressBar from '../ProgressBar/ProgressBar';

import SideBar from '../SideBar/SideBar';
import './dashboardBase.scss';

// actions
import { loadMemoryConsumed } from '../../action/dashboard';
import { closeLoginModal, viewLoginModal } from '../../action/mainToolbar.js';
import { fetchCurrentUser } from '../../action/user';


const DashboardBase = ({
  // eslint-disable-next-line no-shadow
  memoryConsumed, loadMemoryConsumed, totalMemory, fetchCurrentUser, children, userName, viewLoginModal, closeLoginModal
}) => {
  const firstRender = useRef(true);
  const loggedOutDashboard = <React.Fragment><TopNav /></React.Fragment>;
  const loggedInDashboard = (
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
            total={totalMemory}
            units="bytes"
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

  useEffect(() => {
    firstRender.current = false;
    fetchCurrentUser();
    loadMemoryConsumed();
  }, []);

  useEffect(() => {
    if (!userName) {
      viewLoginModal();
    } else {
      closeLoginModal();
    }
  }, [userName]);


  if (userName) {
    return loggedInDashboard;
  }
  return loggedOutDashboard;
};

DashboardBase.defaultProps = {
  userName: ''
};

DashboardBase.propTypes = {
  memoryConsumed: PropTypes.number.isRequired,
  totalMemory: PropTypes.number.isRequired,
  loadMemoryConsumed: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  viewLoginModal: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  userName: PropTypes.string
};

function mapStateToProps(state) {
  return {
    memoryConsumed: state.dashboard.memoryConsumed,
    totalMemory: state.dashboard.totalMemory,
    name: PropTypes.string.isRequired,
    userName: state.user.name
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadMemoryConsumed,
    fetchCurrentUser,
    viewLoginModal,
    closeLoginModal
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(DashboardBase));
