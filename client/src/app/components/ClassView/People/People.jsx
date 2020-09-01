import React from 'react';

import PlusIcon from '../../../images/add.svg';

import IconButton from '../../IconButton/IconButton';
import TeacherCard from './TeacherCard/TeacherCard';

import './people.scss';

const People = () => (
  <div className="class-view__people">
    <div className="class-view__people__section">
      <div className="class-view__people__section__section-header">
        <div className="class-view__people__section__section-header__header">
          Teacher
        </div>
        <IconButton icon={<PlusIcon />}>
          Add Teacher
        </IconButton>
      </div>
      <TeacherCard name="John Doe" />
      <TeacherCard name="John Doe" />
    </div>
    <div className="class-view__people__section" style={{ marginTop: '40px' }}>
      <div className="class-view__people__section__section-header">
        <div className="class-view__people__section__section-header__header">
          Students
        </div>
        <IconButton icon={<PlusIcon />}>
          Add Student
        </IconButton>
      </div>
    </div>
  </div>
);

export default People;
