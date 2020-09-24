import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import TopNav from '../TopNav/TopNav';
import RightCrumbIcon from '../../images/right.svg';
import KidsIllustration from '../../images/kids-illu.svg';


import SideBar from './SideBar/SideBar';
import AssignmentCard from './AssignmentCard/AssignmentCard';

import history from '../../utils/history';

import {
  fetchClassrooms,
  fetchTopics,
  fetchStudentAssignments,
  fetchCurrentClassroomDetails,
  clearStudentAssignments,
  clearTopics,
  clearCurrentAssignmentDetails,
  clearCurrentClassroom,
} from '../../action/classroom';

import './classViewStudent.scss';

const ClassViewStudent = (props) => {
  const [classroomName, setClassroomName] = useState('Loading...');
  const [dropdownTriggered, setDropdownTriggered] = useState(false);
  const [members, setMembers] = useState([]);

  const closeOptionsHandler = () => {
    setDropdownTriggered(false);
    document.removeEventListener('click', closeOptionsHandler);
  };

  useEffect(() => {
    props.fetchClassrooms();
    props.fetchStudentAssignments(props.match.params.classId);
    props.fetchTopics(props.match.params.classId);
    props.fetchCurrentClassroomDetails(props.match.params.classId);

    return () => {
      document.removeEventListener('click', closeOptionsHandler);
      props.clearStudentAssignments();
      props.clearTopics();
      props.clearCurrentAssignmentDetails();
      props.clearCurrentClassroom();
    };
  }, [props.match.params.classId]);

  useEffect(() => {
    if (props.currentClassroom && props.currentClassroom.name) {
      setClassroomName(
        props.currentClassroom.name
      );
      setMembers(prevData => [...prevData,
        ...props.currentClassroom.members.filter(
          member => member.role === 'teacher' ||
          member.user === props.userId
        )
      ]);
    }
  }, [props.currentClassroom, props.match.params.classId]);

  return (
    <div className='class-view-studet'>
      <TopNav />
      <div className='class-view-student__body'>
        <div className='class-view-student__header-area'>
          <div className='class-view-student__header-area__bread-crumbs'>
            <NavLink to='/classroom'>My Classes</NavLink>
            <RightCrumbIcon />
            <div className='class-view-student__header-area__bread-crumbs__dropdown'>
              <button
                className='class-view-student__header-area__bread-crumbs__dropdown__trigger'
                onClick={() => {
                  if (!dropdownTriggered) {
                    document.addEventListener('click', closeOptionsHandler);
                  }
                  setDropdownTriggered(val => !val);
                }}
              >
                {classroomName}
              </button>
              <svg
                width='24'
                height='24'
                viewBox='0 0 32 32'
                fill='none'
                className={`${dropdownTriggered && 'triggered'}`}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M9.33334 13.3333L16 20L22.6667 13.3333H9.33334Z' />
              </svg>
              <div
                className={`class-view-student__header-area__bread-crumbs__dropdown__options
                 ${
    dropdownTriggered
      ? 'class-view-student__header-area__bread-crumbs__dropdown__options--active'
      : ''
    }`}
              >
                {props.classrooms &&
                  props.classrooms.map(classroom => (
                    <div
                      className='class-view-student__header-area__bread-crumbs__dropdown__option-container'
                      key={classroom.id}
                    >
                      <button
                        className='class-view-student__header-area__bread-crumbs__dropdown__option'
                        onClick={() => {
                          if (props.match.params.classId !== classroom.id) {
                            history.push(
                              `/classroom/${classroom.myMemberShipDetail.role}/${classroom.id}`
                            );
                            window.location.reload();
                          }
                        }}
                      >
                        {classroom.name}
                      </button>
                      <span
                        className='class-view-student__header-area__bread-crumbs__dropdown__tooltip
                        class-view-student__header-area__bread-crumbs__dropdown__tooltip--option'
                      >
                        {classroom.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <KidsIllustration style={{ marginLeft: 'auto', marginTop: 'auto' }} />
        </div>
        <div className='class-view-student__body__container'>
          <SideBar>
            {
              <div className='student-sidebar__topic__resources'>
                {props.studentAssignments.classroomAllAssignmentsAndMaterials &&
                  props.studentAssignments.classroomAllAssignmentsAndMaterials.map(
                    assignment => assignment.topicId === null && (
                      <button
                        key={assignment.id}
                        onClick={() => {
                          document.getElementById(assignment.id).scrollIntoView();
                        }
                        }
                      >
                        {assignment.title}
                      </button>
                    )
                  )}
              </div>
            }
            {props.topics &&
              props.topics.map(topic => (
                <div className='student-sidebar__topic' key={topic._id}>
                  <button
                    className='student-sidebar__topic__name'
                    onClick={() => {
                      // setCurrnetTopic(topic);
                      document.getElementById(topic._id).scrollIntoView();
                    }}
                  >
                    {topic.name}
                  </button>
                  <div className='student-sidebar__topic__resources'>
                    {props.studentAssignments
                      .classroomAllAssignmentsAndMaterials &&
                      props.studentAssignments.classroomAllAssignmentsAndMaterials.map(
                        assignment => assignment.topicId === topic._id && (
                          <button
                            key={assignment.id}
                            onClick={() => {
                              document.getElementById(assignment.id).scrollIntoView();
                            }}
                          >
                            {assignment.title}
                          </button>
                        )
                      )}
                  </div>
                </div>
              ))}
          </SideBar>
          <div className='class-view-student__body__container__assignments-area'>
            {props.studentAssignments.classroomAllAssignmentsAndMaterials &&
              props.studentAssignments.classroomAllAssignmentsAndMaterials.map(
                (assignment) => {
                  const attempt = props.studentAssignments.assignmentsAttemptedByStudent.filter(
                    // eslint-disable-next-line no-shadow
                    attempt => attempt.assignmentId === assignment.id
                  );
                  return (
                    assignment.topicId === null && (
                      <AssignmentCard
                        key={assignment.id}
                        id={assignment.id}
                        title={assignment.title}
                        areGradesPublished={assignment.areGradesPublished}
                        description={assignment.description}
                        dueDate={assignment.dueDate}
                        type={assignment.type}
                        classroomId={props.match.params.classId}
                        peblUrl={assignment.peblUrl}
                        url={assignment.url}
                        hasStarted={attempt.length !== 0}
                        turnedIn={attempt.length !== 0 && attempt[0].turnedIn}
                        attemptPeblUrl={attempt.length !== 0 && attempt[0].myPeblUrl}
                        marksScored={attempt.length !== 0 && attempt[0].marksScored}
                        comments={attempt.length !== 0 && attempt[0].comments}
                        attemptId={attempt.length !== 0 && attempt[0].id}
                        members={members}
                      />
                    )
                  );
                }
              )}
            {props.topics &&
              props.topics.map(topic => (
                <React.Fragment key={topic._id}>
                  <div
                    className='class-view-student__body__container__assignments-area__topic-name'
                    id={topic._id}
                  >
                    {topic.name}
                  </div>
                  {props.studentAssignments.classroomAllAssignmentsAndMaterials &&
                    props.studentAssignments.classroomAllAssignmentsAndMaterials.map(
                      (assignment) => {
                        const attempt = props.studentAssignments.assignmentsAttemptedByStudent.filter(
                          // eslint-disable-next-line no-shadow
                          attempt => attempt.assignmentId === assignment.id
                        );
                        return (
                          assignment.topicId === topic._id && (
                            <AssignmentCard
                              key={assignment.id}
                              id={assignment.id}
                              title={assignment.title}
                              description={assignment.description}
                              dueDate={assignment.dueDate}
                              type={assignment.type}
                              classroomId={props.match.params.classId}
                              peblUrl={assignment.peblUrl}
                              url={assignment.url}
                              areGradesPublished={assignment.areGradesPublished}
                              hasStarted={attempt.length !== 0}
                              turnedIn={attempt.length !== 0 && attempt[0].turnedIn}
                              attemptPeblUrl={attempt.length !== 0 && attempt[0].myPeblUrl}
                              marksScored={attempt.length !== 0 && attempt[0].marksScored}
                              comments={attempt.length !== 0 && attempt[0].comments}
                              attemptId={attempt.length !== 0 && attempt[0].id}
                              members={members}
                            />
                          )
                        );
                      }
                    )}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ClassViewStudent.propTypes = {
  fetchClassrooms: PropTypes.func.isRequired,
  fetchTopics: PropTypes.func.isRequired,
  fetchStudentAssignments: PropTypes.func.isRequired,
  fetchCurrentClassroomDetails: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  studentAssignments: PropTypes.shape({
    assignmentsAttemptedByStudent: PropTypes.arrayOf(PropTypes.shape({})),
    classroomAllAssignmentsAndMaterials: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      classId: PropTypes.string,
    }),
  }).isRequired,
  classrooms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentClassroom: PropTypes.shape({
    name: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({
    }))
  }).isRequired,
  userId: PropTypes.string.isRequired,
  clearStudentAssignments: PropTypes.func.isRequired,
  clearTopics: PropTypes.func.isRequired,
  clearCurrentAssignmentDetails: PropTypes.func.isRequired,
  clearCurrentClassroom: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  topics: state.classroom.topics,
  studentAssignments: state.classroom.studentAssignments,
  classrooms: state.classroom.classrooms,
  currentClassroom: state.classroom.currentClassroom,
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchClassrooms,
    fetchTopics,
    fetchStudentAssignments,
    fetchCurrentClassroomDetails,
    clearStudentAssignments,
    clearTopics,
    clearCurrentAssignmentDetails,
    clearCurrentClassroom,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ClassViewStudent);
