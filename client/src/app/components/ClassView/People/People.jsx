import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// images
import PlusIcon from '../../../images/add.svg';

// page specific components
import IconButton from '../../IconButton/IconButton';
import StudentAssignmentCard from './StudentAssignmentCard/StudentAssignmentCard';
import TeacherCard from './TeacherCard/TeacherCard';

// actions
import { fetchAssignmentsByStudentsForTeacher, clearAssignmentPeople } from '../../../action/classroom';

import './people.scss';

const People = (props) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setTeachers(props.members.filter(member => member.role === 'teacher'));
    setStudents(props.members.filter(member => member.role === 'student'));

    return () => {
      props.clearAssignmentPeople();
    };
  }, []);

  // const sortByNameAZ = () => {
  //   setStudents(() => {
  //     [...students].sort((x, y) => (x.name.toUpperCase() < y.name.toUpperCase() ? 1 : -1));
  //   });
  // };

  const handleStudentSelect = (studentName) => {
    console.log(studentName);
    setSelectedStudent(studentName);
    props.fetchAssignmentsByStudentsForTeacher({ studentName, classroomId: props.currentClassroom.id });
  };

  return (
    <div className="class-view__people">
      <div className="class-view__people__section">
        <div className="class-view__people__section__section-header">
          <div className="class-view__people__section__section-header__header">
            Teacher
          </div>
          <IconButton icon={<PlusIcon />}>
            Add Teacher
          </IconButton>
        </div>
        {
          teachers.map(teacher => (
            <TeacherCard key={teacher.userDetail._id} name={teacher.userDetail.name} />
          ))
        }
      </div>
      <div className="class-view__people__section" style={{ marginTop: '40px' }}>
        <div className="class-view__people__section__section-header">
          <div className="class-view__people__section__section-header__header">
            Students
          </div>
          <IconButton icon={<PlusIcon />}>
            Add Student
          </IconButton>
        </div>
        <div className="class-view__people__section__student-details">
          <div className="class-view__people__section__student-details__students">
            <div className="class-view__people__section__student-details__students__header">
              All students
            </div>
            {
              students.map(student => (
                <button
                  key={student.userDetail._id}
                  className="class-view__people__section__student-details__students__student"
                  onClick={() => handleStudentSelect(student.userDetail.name)}
                >
                  {student.userDetail.name}
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
                Comments
              </div>
              <div>
                Grade
              </div>
            </div>
            {
              selectedStudent ? (
                props.assignmentsPeople && props.assignmentsPeople.allClassroomAssignmentsInClassroom.map(
                  assignment => (
                    assignment.isPublished && assignment.type === 'assignment' && (
                      <StudentAssignmentCard
                        title={assignment.title}
                        status={
                          props.assignmentsPeople.allClassroomAssignmentsAttemptedByStudent.includes(assignment)
                            ? 'Turned in' : 'Missing'
                        }
                        dueDate={assignment.dueDate}
                        comments="sent"
                        gradeTotal={100}
                        gradeObtained={assignment.areGradesPublished ? 0 : null}
                      />
                    )
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
      </div>
    </div>
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
  clearAssignmentPeople: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  members: state.classroom.currentClassroom.members,
  currentClassroom: state.classroom.currentClassroom,
  assignmentsPeople: state.classroom.assignmentsPeople,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAssignmentsByStudentsForTeacher,
  clearAssignmentPeople,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
