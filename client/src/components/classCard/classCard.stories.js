import React from 'react';
import ClassCard from '../../app/components/ClassCard/ClassCard';

export default { title: 'Class Card' };

export const classCard = () => (
  <ClassCard
    tabIndex="0"
    classCode="Qwe123p"
    classTitle="Class Title"
    subject="Subject"
    grade="6th"
    studentCount="30"
  />
);
