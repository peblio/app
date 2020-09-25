/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';
import LessonListCard from '../../../LessonListCard/LessonListCard';
import LinkAlt from '../../../../images/link-alt.svg';

import './studentAssignmentCard.scss';

const StudentAssignmentCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`student-assignment-card ${
      expanded ? 'student-assignment-card--expanded' : ''
    }`}
    >
      <LessonListCard color="yellow">
        <div className="student-assignment-card__details">
          <div className="student-assignment-card__details__title">
            {
              props.attemptPeblUrl
                ? (
                  <a
                    href={props.attemptPeblUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {props.title}
                  </a>
                )
                // eslint-disable-next-line no-nested-ternary
                : props.peblUrl ? (
                  <a
                    href={props.peblUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {props.title}
                  </a>
                )
                  : props.url ? (
                    <a
                      href={props.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {props.title}
                    </a>
                  )
                    : props.title
            }
          </div>
          <div
            className={`student-assignment-card__details__status ${
              props.status === 'Turned in'
                ? 'student-assignment-card__details__status--success'
                : ''
            } ${
              props.status === 'Started'
                ? 'student-assignment-card__details__status--started'
                : ''
            } ${
              props.status === 'Missing' || props.status === 'Turned in late'
                ? 'student-assignment-card__details__status--danger'
                : ''
            }
        `}
          >
            {props.status}
          </div>
          <div className="student-assignment-card__details__due">
            {props.dueDate ? moment(props.dueDate).format('MM/DD/YY') : '...'}
          </div>
          <div className="student-assignment-card__details__grade">
            {`${props.gradeObtained || '...'} / ${props.gradeTotal}`}
          </div>
          <div className="student-assignment-card__details__options">
            <button
              className="student-assignment-card__details__options__options-btn"
              onClick={() => {
                setExpanded(prevState => !prevState);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </LessonListCard>
      <div className="student-assignment-card__link-details">
        {
          (props.peblUrl || props.url) && (
            <div className="student-assignment-card__link-details__image">
              <LinkAlt />
            </div>
          )
        }
        <div className="student-assignment-card__link-details__text">
          <div className="student-assignment-card__link-details__text__title">
            {props.title}
          </div>
          <div className="student-assignment-card__link-details__text__description">
            {props.description.length > 170 ? `${props.description.slice(0, 170)}...` : props.description}
          </div>
        </div>
      </div>
    </div>
  );
};

StudentAssignmentCard.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string.isRequired,
  gradeObtained: PropTypes.number,
  gradeTotal: PropTypes.number.isRequired,
  attemptPeblUrl: PropTypes.string,
  peblUrl: PropTypes.string,
  url: PropTypes.string,
};

StudentAssignmentCard.defaultProps = {
  gradeObtained: null,
  attemptPeblUrl: '',
  peblUrl: '',
  url: '',
};

export default StudentAssignmentCard;
