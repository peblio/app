import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// images
import PlusIcon from '../../../images/add.svg';

// component imports
import IconButton from '../../IconButton/IconButton';
import GenericLoader from '../../GenericLoader/LoadingMessage';
import Dropdown from '../../Dropdown/Dropdown';

// page specific components
import StudentAssignmentCard from './StudentAssignmentCard/StudentAssignmentCard';
import TeacherCard from './TeacherCard/TeacherCard';
import AddMemberModal from './AddMemberModal/AddMemberModal';

// actions
import {
  fetchAssignmentsByStudentsForTeacher,
  clearAssignmentPeople,
  toggleAddMemberModal,
} from '../../../action/classroom';

import './people.scss';

const People = (props) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [students, setStudents] = useState([]);
  const [fetchingAssignments, setFetchingAssignments] = useState();
  const [addTriggeredBy, setAddTriggeredBy] = useState();
  const [order, setOrder] = useState('A-Z');
  const initialRender = useRef(true);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setFetchingAssignments(() => true);
    props.fetchAssignmentsByStudentsForTeacher({ memberId: student.id, classroomId: props.currentClassroom.id })
      .then(() => {
        setFetchingAssignments(() => false);
      });
  };

  useEffect(() => {
    setTeachers(props.members.filter(member => member.role === 'teacher'));
    const studentsTemp = props.members.filter(member => member.role === 'student');
    studentsTemp.sort((a, b) => {
      if (a.firstName !== b.firstName) {
        return a.firstName.toUpperCase() < b.firstName.toUpperCase() ? -1 : 1;
      }
      return a.lastName.toUpperCase() < b.lastName.toUpperCase() ? -1 : 1;
    });
    setStudents(studentsTemp);

    setImmediate(() => {
      handleStudentSelect(studentsTemp[0]);
    });

    return () => {
      props.clearAssignmentPeople();
    };
  }, [props.members]);


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
    <React.Fragment>
      <div className="class-view__people">
        <div className="class-view__people__section">
          <div className="class-view__people__section__section-header">
            <div className="class-view__people__section__section-header__header">
              Teacher
            </div>
            <IconButton
              icon={<PlusIcon />}
              onClick={() => {
                setAddTriggeredBy('teacher');
                props.toggleAddMemberModal();
              }}
            >
              Add Teacher
            </IconButton>
          </div>
          {
            teachers.map(teacher => (
              <TeacherCard key={teacher.id} name={`${teacher.firstName} ${teacher.lastName}`} />
            ))
          }
        </div>
        <div
          className="class-view__people__section"
          style={{ marginTop: '40px', height: '100%', paddingBottom: '40px' }}
        >
          <div className="class-view__people__section__section-header">
            <div className="class-view__people__section__section-header__header">
              Students
            </div>
            <IconButton
              icon={<PlusIcon />}
              onClick={() => {
                setAddTriggeredBy('student');
                props.toggleAddMemberModal();
              }}
            >
              Add Student
            </IconButton>
          </div>
          {
            students.length ? (
              <div className="class-view__people__section__student-details">
                <div className="class-view__people__section__student-details__students">
                  <div className="class-view__people__section__student-details__students__header">
                    All students
                    <Dropdown
                      placeholder="A-Z"
                      state={order}
                      setState={setOrder}
                      style={{
                        width: '111px',
                        marginLeft: 'auto'
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
                  </div>
                  {
                    students.map(student => (
                      <button
                        key={student.id}
                        className={`class-view__people__section__student-details__students__student ${
                          selectedStudent && student.id === selectedStudent.id ? 'selected' : ''
                        }`}
                        onClick={() => handleStudentSelect(student)}
                      >
                        {student.firstName}
                        {' '}
                        {student.lastName}
                      </button>
                    ))
                  }
                </div>
                <div className="class-view__people__section__student-details__assignments">
                  <div className="class-view__people__section__student-details__assignments__header">
                    <div>
                      Name
                    </div>
                    <div>
                      Status
                    </div>
                    <div>
                      Due
                    </div>
                    <div>
                      Grade
                    </div>
                  </div>
                  {
                    // eslint-disable-next-line no-nested-ternary
                    selectedStudent ? (
                      fetchingAssignments ? (
                        <div style={{
                          height: '100%'
                        }}
                        >
                          <GenericLoader />
                        </div>
                      ) : (
                        props.assignmentsPeople && props.assignmentsPeople.allClassroomAssignmentsInClassroom &&
                            props.assignmentsPeople.allClassroomAssignmentsInClassroom.map(
                              (assignment) => {
                                const attempt = props
                                  .assignmentsPeople
                                  .allClassroomAssignmentsAttemptedByStudent
                                  .filter(
                                  // eslint-disable-next-line no-shadow
                                    attempt => attempt.assignmentId === assignment.id
                                  );
                                // console.log(attempt);
                                return (
                                  assignment.isPublished && assignment.type === 'assignment' && (
                                    <StudentAssignmentCard
                                      title={assignment.title}
                                      description={assignment.description}
                                      status={
                                        // eslint-disable-next-line no-nested-ternary
                                        attempt.length !== 0
                                          // eslint-disable-next-line no-nested-ternary
                                          ? attempt[0].turnedIn
                                            // eslint-disable-next-line no-nested-ternary
                                            ? !assignment.dueDate ? 'Turned in'
                                              : new Date(attempt[0].turnedInTime) > new Date(assignment.dueDate)
                                                ? 'Turned in late' : 'Turned in'
                                            : 'Started' : 'Missing'
                                      }
                                      dueDate={assignment.dueDate}
                                      gradeTotal={assignment.outOfMarks || '...'}
                                      url={assignment.url}
                                      peblUrl={assignment.peblUrl}
                                      gradeObtained={attempt.length !== 0 && attempt[0].marksScored}
                                      attemptPeblUrl={attempt.length !== 0 && attempt[0].myPeblUrl}
                                    />
                                  )
                                );
                              }
                            )
                      )
                    ) : (
                      <p className="class-view__people__section__student-details__assignments__no-student">
                        Select a student to see their assignments here
                      </p>
                    )
                  }
                </div>
              </div>
            ) : (
              <div className="class-view__people__section__no-student">
                There are no students in this class
              </div>
            )
          }
        </div>
      </div>
      { props.addMemberModal && (
        <AddMemberModal
          triggeredBy={addTriggeredBy}
          classroomId={props.currentClassroom.id}
        />
      ) }
    </React.Fragment>
  );
};

People.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentClassroom: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  fetchAssignmentsByStudentsForTeacher: PropTypes.func.isRequired,
  assignmentsPeople: PropTypes.shape({
    allClassroomAssignmentsAttemptedByStudent: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    allClassroomAssignmentsInClassroom: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  clearAssignmentPeople: PropTypes.func.isRequired,
  addMemberModal: PropTypes.bool.isRequired,
  toggleAddMemberModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  members: state.classroom.currentClassroom.members,
  currentClassroom: state.classroom.currentClassroom,
  assignmentsPeople: state.classroom.assignmentsPeople,
  addMemberModal: state.classroom.addMemberModal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAssignmentsByStudentsForTeacher,
  clearAssignmentPeople,
  toggleAddMemberModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
