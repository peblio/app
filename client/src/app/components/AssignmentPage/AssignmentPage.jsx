import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import Student from './Student/Student';

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
  clearAssignmentAttempt,
  clearCurrentClassroom,
  commentOnAssignment,
  publishGrades,
} from '../../action/classroom';

import RightCrumbIcon from '../../images/right.svg';
import './assignmentPage.scss';

const AssignmentPage = (props) => {
  const [dueDate, setDueDate] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [totalMarks, setTotalMarks] = useState('100');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [comment, setComment] = useState('');
  const [totalAssigned, setTotalAssigned] = useState();
  const [totalTurnedIn, setTotalTurnedIn] = useState();

  // marks passed to student component, to prevent unnecessary state updates
  const [passedMarks, setPassedMarks] = useState(totalMarks);

  useEffect(() => {
    if (selectedAssignment && selectedAssignment.myPeblUrl) {
      const iframe = document.getElementById('assignment-pebl');
      console.log(iframe.contentDocument);
      setTimeout(() => {
        const body = iframe.contentDocument.querySelector('body');
        body.style.transform = 'scale(0.75)';
        body.style.display = 'flex';
        body.style.justifyContent = 'center';
      }, 300);
    }
  }, [selectedAssignment]);

  useEffect(() => {
    const updateTimer = setTimeout(() => {
      setPassedMarks(totalMarks);
    }, 800);

    return () => {
      clearTimeout(updateTimer);
    };
  }, [totalMarks]);

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
      props.clearAssignmentAttempt();
      props.clearCurrentClassroom();
    };
  }, []);

  useEffect(() => {
    if (props.currentAssignment.dueDate) {
      setDueDate(props.currentAssignment.dueDate);
    }
  }, [props.currentAssignment]);

  useEffect(() => {
    let val = 0;
    if (props.currentClassroom.members) {
      val = props.currentClassroom.members
        .reduce((acc, member) => {
          if (member.role === 'student') {
            return acc + 1;
          }
          return acc;
        }, 0);
    }
    setTotalAssigned(val);
  }, [props.currentClassroom]);

  useEffect(() => {
    let val = 0;
    if (props.assignmentAttempts.allStudentsAttemptForAssignment) {
      val = props.assignmentAttempts.allStudentsAttemptForAssignment
        .reduce((acc, attempt) => {
          if (attempt.turnedIn) {
            return acc + 1;
          }
          return acc;
        }, 0);
    }
    setTotalTurnedIn(val);
  }, [props.assignmentAttempts.allStudentsAttemptForAssignment]);

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
              <Button
                className="primary"
                disabled={
                  props.assignmentAttempts.classroomAssignment &&
                  props.assignmentAttempts.classroomAssignment.areGradesPublished
                }
                onClick={() => {
                  props.publishGrades(props.currentAssignment.id)
                    .then(() => {
                      props.fetchAssignmentAttempts(props.match.params.assignmentId);
                    });
                }}
              >
                Publish grades
              </Button>
              <div className="assignment-page__action-area__turned-in">
                <span>{totalTurnedIn}</span>
                {' '}
                turned in /
                {' '}
                <span>{totalAssigned}</span>
                {' '}
                asigned
              </div>
            </div>
            <div className="assignment-page__container">
              <div className="assignment-page__container__students">
                {
                  props.currentClassroom.members &&
                  props.currentClassroom.members.map((member) => {
                    let attempt = [];
                    if (props.assignmentAttempts.allStudentsAttemptForAssignment) {
                      attempt = props.assignmentAttempts
                        // eslint-disable-next-line react/prop-types
                        .allStudentsAttemptForAssignment.filter(assignment => assignment.user === member.user);
                    }
                    return (
                      member.role !== 'teacher' && (
                        <Student
                          member={member}
                          selectedStudent={selectedStudent}
                          selectedAssignment={selectedAssignment}
                          onNameClick={() => {
                            if (attempt.length !== 0) {
                              setSelectedAssignment(
                                attempt[0]
                              );
                            } else {
                              setSelectedAssignment(null);
                            }
                            setSelectedStudent(member);
                          }}
                          totalMarks={passedMarks}
                          marksScored={attempt.length !== 0 ? attempt[0].marksScored : ''}
                        />
                      )
                    );
                  })
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
                <form
                  className="assignment-page__container__pebl__comment"
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.commentOnAssignment({
                      text: comment,
                      assignmentAttemptId: selectedAssignment.id
                    }).then(() => {
                      setComment('');
                    });
                  }}
                >
                  <InputField
                    placeholder="type comment..."
                    disabled={
                      !(selectedAssignment && selectedAssignment.myPeblUrl)
                    }
                    state={comment}
                    onChange={(e) => { setComment(e.target.value); }}
                  />
                  <Button
                    className="secondary"
                    disabled={
                      !comment ||
                      !selectedAssignment
                    }
                  >
                    Send
                  </Button>
                </form>
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
    id: PropTypes.string,
    title: PropTypes.string,
    classroomId: PropTypes.string,
    dueDate: PropTypes.instanceOf(Date)
  }).isRequired,
  clearCurrentAssignmentDetails: PropTypes.func.isRequired,
  clearAssignmentAttempt: PropTypes.func.isRequired,
  commentOnAssignment: PropTypes.func.isRequired,
  clearCurrentClassroom: PropTypes.func.isRequired,
  fetchAssignmentAttempts: PropTypes.func.isRequired,
  publishGrades: PropTypes.func.isRequired,
  assignmentAttempts: PropTypes.shape({
    allStudentsAttemptForAssignment: PropTypes.arrayOf(PropTypes.shape({
    })),
    classroomAssignment: PropTypes.shape({
      areGradesPublished: PropTypes.bool
    })
  }).isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCurrentClassroomDetails,
  fetchCurrentAssignmentDetails,
  clearCurrentAssignmentDetails,
  fetchAssignmentAttempts,
  clearAssignmentAttempt,
  clearCurrentClassroom,
  commentOnAssignment,
  publishGrades,
}, dispatch);

const mapStateProps = state => ({
  currentClassroom: state.classroom.currentClassroom,
  currentAssignment: state.classroom.currentAssignment,
  assignmentAttempts: state.classroom.assignmentAttempts,
});

export default connect(mapStateProps, mapDispatchToProps)(AssignmentPage);
