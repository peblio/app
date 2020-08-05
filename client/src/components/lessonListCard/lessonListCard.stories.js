import React from 'react';
import LessonListCard from '../../app/components/LessonListCard/LessonListCard';

export default { title: 'LessonListCard' };

export const lessonListCard = () => (
  <React.Fragment>
    <LessonListCard color="yellow" style={{ marginBottom: '8px' }}>
      LessonListCard
    </LessonListCard>
    <LessonListCard color="light-gray" style={{ marginBottom: '8px' }}>
      LessonListCard
    </LessonListCard>
    <LessonListCard color="dark-gray" style={{ marginBottom: '8px' }}>
      LessonListCard
    </LessonListCard>
  </React.Fragment>
);
