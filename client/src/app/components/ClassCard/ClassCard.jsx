import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import './classCard.scss';
import CopyIcon from '../../images/copy.svg';


const ClassCard = ({
  classCode,
  classLink,
  classTitle,
  subject,
  grade,
  studentCount,
  ...props
}) => {

  const onCodeCopyClick = () => {
    navigator.clipboard.writeText(classCode)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div className="class-card" {...props}>
      <button className="class-card__code" onClick={onCodeCopyClick}>
        {classCode}
        <img src={CopyIcon} alt="" />
      </button>
      <div className="class-card__name">
        {classTitle}
      </div>
      <div className="class-card__subject">
        {subject}
      </div>
      <div className="class-card__card-footer">
        {grade}
        {' '}
        GRADE
        <span className="circle"></span>
        {studentCount}
        {' '}
        STUDENTS
      </div>
    </div>
  );
};

ClassCard.propTypes = {
  classCode: PropTypes.string.isRequired,
  classLink: PropTypes.string.isRequired,
  classTitle: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
  studentCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ClassCard;
