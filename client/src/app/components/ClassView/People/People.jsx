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
import { fetchAssignmentsByStudentsForTeacher } from '../../../action/classroom';

import './people.scss';

const People = (props) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setTeachers(props.members.filter(member => member.role === 'teacher'));
    setStudents(props.members.filter(member => member.role === 'student'));
  }, []);

  const sortByNameAZ = () => {
    setStudents(() => {
      [...students].sort((x, y) => (x.name.toUpperCase() < y.name.toUpperCase() ? 1 : -1));
    });
  };

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
                <StudentAssignmentCard
                  title="P5 Introduction"
                  status="Turned in"
                  dueDate="12/04/20"
                  comments="sent"
                  gradeTotal={100}
                  gradeObtained={88}
                />
              ) : (
                <p>Select a student to see their assignments here</p>
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
};

const mapStateToPtops = state => ({
  members: state.classroom.currentClassroom.members,
  currentClassroom: state.classroom.currentClassroom
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAssignmentsByStudentsForTeacher,
}, dispatch);

export default connect(mapStateToPtops, mapDispatchToProps)(People);
