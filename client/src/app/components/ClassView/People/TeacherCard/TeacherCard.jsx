import React from 'react';
import PropTypes from 'prop-types';

import AccountIcon from '../../../../images/account.svg';

import './teacherCard.scss';

const TeacherCard = ({ name }) => (
  <div className="teacher-card">
    <AccountIcon />
    <div className="teacher-card__name">
      {name}
    </div>
    <button className="teacher-card__options">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
);

TeacherCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default TeacherCard;
