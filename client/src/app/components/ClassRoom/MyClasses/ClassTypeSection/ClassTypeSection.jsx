import React from 'react';
import PropTypes from 'prop-types';

import ClassCard from '../../../ClassCard/ClassCard';
import history from '../../../../utils/history';

import './classTypeSection.scss';

const ClassTypeSection = ({ header, classrooms, ...props }) => (
  classrooms.length !== 0 &&
  (
    <div className="classroom__class-type-section" {...props}>
      <div className="classroom__class-type-section__header">
        {header}
      </div>
      <div className="classroom__class-type-section__class-card-container">
        {
          classrooms.map(classroom => (
            <ClassCard
              onClick={() => {
                if (classroom.mymembership.role === 'teacher') {
                  history.push(`/classroom/teacher/${classroom.id}`);
                } else {
                  history.push(`/classroom/student/${classroom.id}`);
                }
              }}
              key={classroom.id}
              classCode={classroom.id}
              classTitle={classroom.name}
              subject={classroom.subject}
              grade={classroom.section}
              studentCount={classroom.studentMemberCount}
            />
          ))
        }
      </div>
    </div>
  )
);

ClassTypeSection.propTypes = {
  header: PropTypes.string.isRequired,
  classrooms: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default ClassTypeSection;
