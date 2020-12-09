import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputField from '../../InputField/InputField';

import { gradeAssignment } from '../../../action/classroom.js';

import './student.scss';

export const Student = (props) => {
  const [marks, setMarks] = useState('');

  const curMarks = useRef();

  useEffect(() => {
    curMarks.current = props.marksScored;
    setMarks(props.marksScored);
  }, [props.marksScored]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      props.gradeAssignment({
        assignmentAttemptId: props.selectedAssignment.id,
        marksScored: Number.parseInt(marks, 10)
      }).then(() => {
        curMarks.current = marks;
      }).catch(() => {
        setMarks(curMarks.current);
      });
    }, 1000);

    return (() => {
      clearTimeout(timerId);
    });
  }, [marks]);

  return (
    <button
      className={`assignment-page__container__students__student ${
        props.selectedStudent &&
      props.selectedStudent.user === props.member.user
          ? 'assignment-page__container__students__student--selected'
          : ''
      }`}
      onClick={props.onNameClick}
    >
      <div
        className="assignment-page__container__students__student__name"
      >
        {props.member.firstName}
        {' '}
        {props.member.lastName}
      </div>
      <div className="assignment-page__container__students__student__marks">
        <InputField
          containerWidth="68px"
          state={marks}
          type="number"
          onChange={(e) => {
            if (e.target.value <= Number.parseInt(props.totalMarks, 10) &&
             Number.parseInt(e.target.value, 10) > -1) {
              setMarks(e.target.value);
            } else if (e.target.value === '') {
              setMarks('');
            }
          }}
          style={{ marginRight: '8px' }}
          disabled={props.selectedStudent === null || !props.selectedAssignment || (
            props.selectedStudent.user !== props.member.user
          )}
        />
        <span>
          /
          {props.totalMarks}
        </span>
      </div>
    </button>
  );
};

Student.propTypes = {
  selectedStudent: PropTypes.shape({
    user: PropTypes.string
  }).isRequired,
  totalMarks: PropTypes.number.isRequired,
  marksScored: PropTypes.number.isRequired,
  member: PropTypes.shape({
    user: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  gradeAssignment: PropTypes.func.isRequired,
  onNameClick: PropTypes.func.isRequired,
  selectedAssignment: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  gradeAssignment
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Student);
