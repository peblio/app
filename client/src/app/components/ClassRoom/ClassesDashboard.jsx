import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadMemoryConsumed } from '../../action/dashboard';

import TopNav from '../TopNav/TopNav';
import ProgressBar from '../ProgressBar/ProgressBar';

import SideBar from './SideBar/SideBar';
import MyClass from './MyClasses/MyClasses';


import './classesDashboard.scss';

// eslint-disable-next-line no-shadow
const ClassesDashboard = ({ memoryConsumed, loadMemoryConsumed, dashboardView }) => {
  useEffect(() => {
    loadMemoryConsumed();
  }, []);

  const memoizedRenderComponent = useCallback(() => {
    switch (dashboardView) {
      case 'documents':
        return <h1>documents</h1>;
      case 'classes':
        return <MyClass />;
      default:
        return null;
    }
  }, [dashboardView]);

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
        {memoizedRenderComponent()}
      </div>
    </React.Fragment>
  );
};

ClassesDashboard.propTypes = {
  memoryConsumed: PropTypes.number.isRequired,
  loadMemoryConsumed: PropTypes.func.isRequired,
  dashboardView: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    memoryConsumed: state.dashboard.memoryConsumed,
    dashboardView: state.dashboard.dashboardView,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadMemoryConsumed
  }, dispatch);
}
export default (connect(mapStateToProps, mapDispatchToProps)(ClassesDashboard));
