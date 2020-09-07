import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import ToggleButton from '../../../ToggleButton/ToggleButton';
import LessonListCard from '../../../LessonListCard/LessonListCard';

import './assignmentCard.scss';

const AssignmentCard = props => (
  <LessonListCard
    color={
      // eslint-disable-next-line no-nested-ternary
      props.isPublished
        ? props.type === 'assignment' ? 'yellow' : 'dark-gray'
        : 'light-gray'
    }
    style={{
      marginBottom: '9px',
      background: props.isPublished ? '#fff' : '#f7f8f8'
    }}
  >
    <div className="assignment-card">
      <div className="assignment-card__title">
        <NavLink to={`/classroom/assignment/${props.id}`}>
          {props.title}
        </NavLink>
      </div>
      <div className="">
        {props.turnedIn}
      </div>
      <div className="">
        {props.dueDate}
      </div>
      <div className="">
        {
          props.type === 'assignment'
            ? 'copies for each student'
            : 'students can view'
        }
      </div>
      <div className="">
        <ToggleButton state={props.isPublished} />
      </div>
      <div className="assignment-card__options">
        <button className="assignment-card__options__options-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </LessonListCard>
);

AssignmentCard.propTypes = {
  isPublished: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  turnedIn: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default AssignmentCard;
