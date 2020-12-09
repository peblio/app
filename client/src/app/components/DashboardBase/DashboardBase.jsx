import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import TopNav from '../TopNav/TopNav';
import ProgressBar from '../ProgressBar/ProgressBar';

import SideBar from '../SideBar/SideBar';
import './dashboardBase.scss';

import history from '../../utils/history';

// actions
import { loadMemoryConsumed } from '../../action/dashboard';
import { fetchCurrentUser } from '../../action/user';

// eslint-disable-next-line no-shadow
const DashboardBase = ({ memoryConsumed, loadMemoryConsumed, fetchCurrentUser, children, userId }) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      // console.log({ userId });
      if (!userId) {
        history.push('/');
      }
    }
  }, [userId]);

  useEffect(() => {
    firstRender.current = false;
    fetchCurrentUser();
    loadMemoryConsumed();
  }, []);

  const memoryConsumedInMegaBytes = mem => Math.ceil(mem / 1000000);

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
            completed={memoryConsumedInMegaBytes(memoryConsumed) * 100 / 1024}
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

DashboardBase.defaultProps = {
  userId: ''
};

DashboardBase.propTypes = {
  memoryConsumed: PropTypes.number.isRequired,
  loadMemoryConsumed: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  userId: PropTypes.string
};

function mapStateToProps(state) {
  return {
    memoryConsumed: state.dashboard.memoryConsumed,
    name: PropTypes.string.isRequired,
    userId: state.user.id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadMemoryConsumed,
    fetchCurrentUser
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(DashboardBase));
