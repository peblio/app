import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import TopNav from '../TopNav/TopNav';
import RightCrumbIcon from '../../images/right.svg';

import SideBar from './SideBar/SideBar';
import AssignmentCard from './AssignmentCard/AssignmentCard';

import './classViewStudent.scss';

const ClassViewStudent = props => (
  <div className="class-view-studet">
    <TopNav />
    <div className="class-view-student__body">
      <div className="class-view-student__header-area">
        <div className="class-view-student__header-area__bread-crumbs">
          <NavLink to='/classroom'>
            My Classes
          </NavLink>
          <RightCrumbIcon />
        </div>
      </div>
      <div className="class-view-student__body__container">
        <SideBar />
        <div className="class-view-student__body__container__assignments-area">
          <AssignmentCard />
          <AssignmentCard />
        </div>
      </div>
    </div>
  </div>
);

ClassViewStudent.propTypes = {

};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ClassViewStudent);
