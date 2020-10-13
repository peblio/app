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
  </div>
);

TeacherCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default TeacherCard;
