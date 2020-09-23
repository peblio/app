import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import DatePickerField from '../DatePickerField/DatePickerField';
import DashboardView from '../DashboardBase/DashboardBase';
import Loader from '../GenericLoader/LoadingMessage';
import InputField from '../InputField/InputField';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';

import {
  fetchCurrentClassroomDetails,
  fetchCurrentAssignmentDetails,
  clearCurrentAssignmentDetails,
  fetchAssignmentAttempts,
} from '../../action/classroom';

import RightCrumbIcon from '../../images/right.svg';
import './assignmentPage.scss';

const AssignmentPage = (props) => {
  const [dueDate, setDueDate] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [totalMarks, setTotalMarks] = useState('100');
  const [selectedAssignment, setSelectedAssignment] = useState();


  useEffect(() => {
    setDataLoading(true);
    props.fetchCurrentClassroomDetails(props.match.params.classroomId);
    props.fetchCurrentAssignmentDetails(props.match.params.assignmentId)
      .then(() => {
        setDataLoading(false);
        props.fetchAssignmentAttempts(props.match.params.assignmentId);
      });

    return () => {
      props.clearCurrentAssignmentDetails();
    };
  }, []);

  useEffect(() => {
    if (props.currentAssignment.dueDate) {
      setDueDate(props.currentAssignment.dueDate);
    }
  }, [props.currentAssignment]);

  useEffect(() => {
    document.getElementById('assignment-pebl');
  }, [selectedAssignment]);

  return (
    <DashboardView>
      {dataLoading ? <Loader />
        : (
          <main className="assignment-page">
            <div className="assignment-page__header-area">
              <div className="assignment-page__header-area__bread-crumbs">
                <NavLink to={`/classroom/teacher/${props.match.params.classroomId}`}>
                  {props.currentClassroom && props.currentClassroom.name}
                </NavLink>
                <RightCrumbIcon />
                <span>{props.currentAssignment && props.currentAssignment.title}</span>
              </div>
              <div className="assignment-page__header-area__date-label">
                Due date
              </div>
              <DatePickerField
                containerWidth="171px"
                calendarPosition="right"
                state={dueDate}
                setState={setDueDate}
              />
            </div>
            <div className="assignment-page__action-area">
              <div className="assignment-page__action-area__dropdowns">
                <Dropdown
                  placeholder="A-Z"
                  style={{
                    width: '111px',
                    marginRight: '100px'
                  }}
                  options={[
                    {
                      name: 'A-Z',
                      value: 'A-Z',
                      onClick: () => { console.log('A-Z'); }
                    },
                    {
                      name: 'Z-A',
                      value: 'Z-A',
                      onClick: () => { console.log('Z-A'); }
                    }
                  ]}
                />
                <InputField
                  containerWidth='119px'
                  state={totalMarks}
                  onChange={(e) => { setTotalMarks(e.target.value); }}
                  placeholder="total grade"
                />
              </div>
              <Button className="primary">Publish grades</Button>
              <div className="assignment-page__action-area__turned-in">
                <span>18</span>
                {' '}
                turned in /
                {' '}
                <span>25</span>
                {' '}
                asigned
              </div>
            </div>
            <div className="assignment-page__container">
              <div className="assignment-page__container__students">
                {
                  props.currentClassroom.members &&
                  props.currentClassroom.members.map(member => (
                    member.role !== 'teacher' && (
                      <div className={`assignment-page__container__students__student ${
                        selectedAssignment &&
                        selectedAssignment.user === member.user
                          ? 'assignment-page__container__students__student--selected'
                          : ''
                      }`}
                      >
                        <button
                          className="assignment-page__container__students__student__name"
                          onClick={() => {
                            setSelectedAssignment(
                              props.assignmentAttempts.filter(assignment => assignment.user === member.user)[0]
                            );
                          }}
                        >
                          {member.firstName}
                          {' '}
                          {member.lastName}
                        </button>
                        <div className="assignment-page__container__students__student__marks">
                          <InputField containerWidth="68px" style={{ marginRight: '8px' }} />
                          <span>
                            /100
                          </span>
                        </div>
                      </div>
                    )
                  ))
                }
              </div>
              <div className="assignment-page__container__pebl">
                <div className="assignment-page__container__pebl__assignment">
                  {
                    selectedAssignment && selectedAssignment.myPeblUrl && (
                      <iframe
                        id="assignment-pebl"
                        src={`/fullscreen/${selectedAssignment.myPeblUrl.split('/')[4]}`}
                        title={selectedAssignment.myPeblUrl.split('/')[4]}
                      />
                    )
                  }
                </div>
                <div className="assignment-page__container__pebl__comment">
                  <InputField
                    placeholder="type comment..."
                    disabled={
                      !(selectedAssignment && selectedAssignment.myPeblUrl)
                    }
                  />
                  <Button
                    className="secondary"
                    disabled={
                      !(selectedAssignment && selectedAssignment.myPeblUrl)
                    }
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </main>

        )
      }
    </DashboardView>
  );
};

AssignmentPage.propTypes = {
  currentClassroom: PropTypes.shape({
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
    }))
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      assignmentId: PropTypes.string,
      classroomId: PropTypes.string
    })
  }).isRequired,
  fetchCurrentClassroomDetails: PropTypes.func.isRequired,
  fetchCurrentAssignmentDetails: PropTypes.func.isRequired,
  currentAssignment: PropTypes.shape({
    title: PropTypes.string,
    classroomId: PropTypes.string,
    dueDate: PropTypes.instanceOf(Date)
  }).isRequired,
  clearCurrentAssignmentDetails: PropTypes.func.isRequired,
  fetchAssignmentAttempts: PropTypes.func.isRequired,
  assignmentAttempts: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCurrentClassroomDetails,
  fetchCurrentAssignmentDetails,
  clearCurrentAssignmentDetails,
  fetchAssignmentAttempts,
}, dispatch);

const mapStateProps = state => ({
  currentClassroom: state.classroom.currentClassroom,
  currentAssignment: state.classroom.currentAssignment,
  assignmentAttempts: state.classroom.assignmentAttempts,
});

export default connect(mapStateProps, mapDispatchToProps)(AssignmentPage);
