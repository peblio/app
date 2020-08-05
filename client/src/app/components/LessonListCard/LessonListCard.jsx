import React from 'react';
import './lessonListCard.scss';

import PropTypes from 'prop-types';

const LessonListCard = ({ children, color, ...props }) => (
  <div className="lesson-list-card" {...props}>
    <span className={`lesson-list-card__color ${color}`}></span>
    {children}
  </div>
);

LessonListCard.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

export default LessonListCard;
