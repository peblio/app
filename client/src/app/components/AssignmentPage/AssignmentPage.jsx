import React, { useEffect, useState, useRef } from 'react';
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
  editAssignment,
} from '../../action/classroom';

import RightCrumbIcon from '../../images/right.svg';
import './assignmentPage.scss';

const AssignmentPage = (props) => {
  const [dueDate, setDueDate] = useState('');
  const [dataLoading, setDataLoading] = useState(false);
  const [totalMarks, setTotalMarks] = useState('100');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [comment, setComment] = useState('');
  const [totalTurnedIn, setTotalTurnedIn] = useState('');
  const [students, setStudents] = useState([]);
  const [order, setOrder] = useState('A-Z');

  // marks passed to student component, to prevent unnecessary state updates
  const [passedMarks, setPassedMarks] = useState(totalMarks);

  const scrollRef = useRef();
  const initialRender = useRef(true);

  useEffect(() => {
    if (props.currentClassroom && props.currentClassroom.members) {
      const stud = props.currentClassroom.members.filter(member => member.role === 'student');
      stud.sort((a, b) => {
        if (a.firstName !== b.firstName) {
          return a.firstName.toUpperCase() < b.firstName.toUpperCase() ? -1 : 1;
        }
        return a.lastName.toUpperCase() < b.lastName.toUpperCase() ? -1 : 1;
      });
      setStudents(stud);
    }
  }, [props.currentClassroom.members]);

  useEffect(() => {
    if (selectedAssignment && selectedAssignment.myPeblUrl) {
      const iframe = document.getElementById('assignment-pebl');
      setTimeout(() => {
        const body = iframe.contentDocument.querySelector('body');
        body.style.transform = 'scale(0.75)';
        body.style.transformOrigin = 'top';
        body.style.display = 'flex';
        body.style.justifyContent = 'center';
        const app = iframe.contentDocument.querySelector('#app');
        app.style.marginBottom = '-300px';
      }, 300);
      if (scrollRef) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [selectedAssignment]);

  const constructAssignmentObjectForEdit = () => {
    let assignment = ({
      classroomId: props.currentAssignment.classroomId,
      title: props.currentAssignment.title,
      dueDate: props.currentAssignment.dueDate,
      description: props.currentAssignment.description,
      isPublished: props.currentAssignment.isPublished,
      topicId: props.currentAssignment.topicId
    });
    if (props.currentAssignment.peblUrl) {
      assignment = {
        ...assignment,
        peblUrl: props.currentAssignment.peblUrl
      };
    } else if (props.currentAssignment.url) {
      assignment = {
        ...assignment,
        url: props.currentAssignment.url
      };
    }
    return assignment;
  };

  useEffect(() => {
    let isInitialRender;
    if (initialRender.current) {
      isInitialRender = true;
    }

    const updateTimer = setTimeout(() => {
      setPassedMarks(totalMarks);
      if (!isInitialRender && props.currentAssignment) {
        const update = {
          ...constructAssignmentObjectForEdit(),
          outOfMarks: totalMarks
        };
        props.editAssignment({ assignmentId: props.currentAssignment.id, ...update })
          .catch((err) => {
            console.err(err);
          });
      }
    }, 800);

    return () => {
      clearTimeout(updateTimer);
    };
  }, [totalMarks]);

  useEffect(() => {
    if (props.currentAssignment && !initialRender.current && props.currentAssignment.dueDate !== dueDate) {
      const update = {
        ...constructAssignmentObjectForEdit(),
        dueDate
      };
      props.editAssignment({ assignmentId: props.currentAssignment.id, ...update })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dueDate]);

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
    if (props.currentAssignment.outOfMarks) {
      setTotalMarks(props.currentAssignment.outOfMarks);
      setPassedMarks(props.currentAssignment.outOfMarks);
    }
  }, [props.currentAssignment]);

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

  useEffect(() => {
    if (selectedStudent) {
      let attempt = [];
      if (props.assignmentAttempts.allStudentsAttemptForAssignment) {
        attempt = props.assignmentAttempts
        // eslint-disable-next-line react/prop-types
          .allStudentsAttemptForAssignment.filter(assignment => assignment.user === selectedStudent.user);
      }
      setSelectedAssignment(attempt[0]);
    }
  }, [props.assignmentAttempts]);

  useEffect(() => {
    if (!initialRender.current && students) {
      const stud = students.slice();
      if (order === 'A-Z') {
        stud.sort((a, b) => {
          if (a.firstName !== b.firstName) {
            return a.firstName.toUpperCase() < b.firstName.toUpperCase() ? -1 : 1;
          }
          return a.lastName.toUpperCase() < b.lastName.toUpperCase() ? -1 : 1;
        });
        setStudents(stud);
      } else {
        stud.sort((a, b) => {
          if (a.firstName !== b.firstName) {
            return a.firstName.toUpperCase() < b.firstName.toUpperCase() ? 1 : -1;
          }
          return a.lastName.toUpperCase() < b.lastName.toUpperCase() ? 1 : -1;
        });
        setStudents(stud);
      }
    }
  }, [order]);

  // to check if it's initial render
  useEffect(() => {
    initialRender.current = false;

    return () => {
      initialRender.current = true;
    };
  }, []);

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
            {
              students.length !== 0 ? (
                <React.Fragment>
                  <div className="assignment-page__action-area">
                    <div className="assignment-page__action-area__dropdowns">
                      <Dropdown
                        placeholder="A-Z"
                        state={order}
                        setState={setOrder}
                        style={{
                          width: '111px',
                          marginRight: '100px'
                        }}
                        options={[
                          {
                            name: 'A-Z',
                            value: 'A-Z',
                          },
                          {
                            name: 'Z-A',
                            value: 'Z-A',
                          }
                        ]}
                      />
                      <InputField
                        containerWidth='119px'
                        state={totalMarks}
                        onChange={(e) => { setTotalMarks(e.target.value); }}
                        placeholder="total grade"
                        type="number"
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
                      <span>{students.length}</span>
                      {' '}
                      assigned
                    </div>
                  </div>
                  <div className="assignment-page__container">
                    <div className="assignment-page__container__students">
                      {
                        students.length !== 0 &&
                  students.map((member) => {
                    let attempt = [];
                    if (props.assignmentAttempts.allStudentsAttemptForAssignment) {
                      attempt = props.assignmentAttempts
                        // eslint-disable-next-line react/prop-types
                        .allStudentsAttemptForAssignment.filter(assignment => assignment.user === member.user);
                    }
                    return (
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
                      {
                        selectedAssignment && (
                          <div className="assignment-page__container__pebl__comments-container">
                            {
                              selectedAssignment && selectedAssignment.comments.length !== 0 && (

                                <div className="assignment-page__container__pebl__comments-container__comments">
                                  <div className="scroll" ref={scrollRef}>
                                    {
                                      selectedAssignment.comments && selectedAssignment.comments.map(
                                        // eslint-disable-next-line no-shadow
                                        comment => (
                                          <div
                                            key={comment._id}
                                            // eslint-disable-next-line max-len
                                            className="assignment-page__container__pebl__comments-container__comments__comment"
                                          >
                                            <div
                                              className={
                                                // eslint-disable-next-line max-len
                                                `assignment-page__container__pebl__comments-container__comments__comment-from
                                    ${
                                          comment.fromMember.role
                                          }`}
                                            >
                                              {comment.fromMember.firstName}
                                              {' '}
                                              {comment.fromMember.lastName}
                                              :
                                            </div>
                                            <div
                                              className="
                                    assignment-page__container__pebl__comments-container__comments__comment-text"
                                            >
                                              {
                                                comment.text
                                              }
                                            </div>
                                          </div>
                                        )
                                      )
                                    }
                                  </div>
                                </div>
                              )
                            }
                            <form
                              className="assignment-page__container__pebl__comments-container__comment-text-box"
                              onSubmit={(e) => {
                                e.preventDefault();
                                props.commentOnAssignment({
                                  text: comment,
                                  assignmentAttemptId: selectedAssignment.id
                                }).then(() => {
                                  setComment('');
                                  props.fetchAssignmentAttempts(props.match.params.assignmentId);
                                });
                              }}
                            >
                              <InputField
                                placeholder="type comment..."
                                disabled={
                                  !(selectedAssignment)
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
                        )
                      }
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <div className="assignment-page__no-students">
                  There are no students currently enrolled in the class
                </div>
              )
            }
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
    dueDate: PropTypes.string,
    description: PropTypes.string,
    peblUrl: PropTypes.string,
    topicId: PropTypes.string,
    url: PropTypes.string,
    isPublished: PropTypes.bool,
    outOfMarks: PropTypes.number
  }).isRequired,
  clearCurrentAssignmentDetails: PropTypes.func.isRequired,
  clearAssignmentAttempt: PropTypes.func.isRequired,
  commentOnAssignment: PropTypes.func.isRequired,
  clearCurrentClassroom: PropTypes.func.isRequired,
  fetchAssignmentAttempts: PropTypes.func.isRequired,
  editAssignment: PropTypes.func.isRequired,
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
  editAssignment
}, dispatch);

const mapStateProps = state => ({
  currentClassroom: state.classroom.currentClassroom,
  currentAssignment: state.classroom.currentAssignment,
  assignmentAttempts: state.classroom.assignmentAttempts,
});

export default connect(mapStateProps, mapDispatchToProps)(AssignmentPage);
