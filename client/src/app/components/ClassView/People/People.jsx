import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlusIcon from '../../../images/add.svg';

import IconButton from '../../IconButton/IconButton';
import StudentAssignmentCard from './StudentAssignmentCard/StudentAssignmentCard';
import TeacherCard from './TeacherCard/TeacherCard';

import './people.scss';

const People = (props) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();

  useEffect(() => {
    setTeachers(props.members.filter(member => member.role === 'teacher'));
  }, []);

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
            <TeacherCard name={teacher.userDetail.name} />
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
              props.members.map((member) => {
                if (member.role !== 'teacher') {
                  return (
                    <div
                      key={member.userDetail._id}
                      className="class-view__people__section__student-details__students__student"
                    >
                      {member.userDetail.name}
                    </div>
                  );
                }

                return null;
              })
            }
            <div
              className="class-view__people__section__student-details__students__student"
            >
              Jon Doe
            </div>
            <div
              className="class-view__people__section__student-details__students__student selected"
            >
              Johanna Doe
            </div>
            <div
              className="class-view__people__section__student-details__students__student"
            >
              Margaret Vooglaid
            </div>
            <div
              className="class-view__people__section__student-details__students__student"
            >
              Regina Vetka
            </div>
            <div
              className="class-view__people__section__student-details__students__student"
            >
              Larry Perry
            </div>
            <div
              className="class-view__people__section__student-details__students__student"
            >
              Regina Vetka
            </div>
            <div
              className="class-view__people__section__student-details__students__student"
            >
              Larry Perry
            </div>
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
            <StudentAssignmentCard
              title="P5 Introduction"
              status="Turned in"
              dueDate="12/04/20"
              comments="sent"
              gradeTotal={100}
              gradeObtained={88}
            />
            <StudentAssignmentCard
              title="P5 Introduction"
              status="Missing"
              dueDate="02/28/20"
              comments="unread"
              gradeTotal={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

People.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToPtops = state => ({
  members: state.classroom.currentClassroom.members
});

export default connect(mapStateToPtops)(People);
