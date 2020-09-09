import React from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';
import LessonListCard from '../../../LessonListCard/LessonListCard';

import './studentAssignmentCard.scss';

const StudentAssignmentCard = props => (
  <LessonListCard color="yellow" style={{ marginBottom: '9px' }}>
    <div className="student-assignment-card">
      <div className="student-assignment-card__title">
        {props.title}
      </div>
      <div
        className={`student-assignment-card__status ${
          props.status === 'Turned in'
            ? 'student-assignment-card__status--success'
            : 'student-assignment-card__status--danger'
        }
        `}
      >
        {props.status}
      </div>
      <div className="student-assignment-card__due">
        {props.dueDate ? moment(props.dueDate).format('MM/DD/YY') : '...'}
      </div>
      <div className="student-assignment-card__comments">
        {props.comments}
      </div>
      <div className="student-assignment-card__grade">
        {`${props.gradeObtained || '...'} / ${props.gradeTotal}`}
      </div>
      <div className="student-assignment-card__options">
        <button className="student-assignment-card__options__options-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </LessonListCard>
);

StudentAssignmentCard.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired,
  comments: PropTypes.string.isRequired,
  gradeObtained: PropTypes.number,
  gradeTotal: PropTypes.number.isRequired,
};

StudentAssignmentCard.defaultProps = {
  gradeObtained: null
};

export default StudentAssignmentCard;
