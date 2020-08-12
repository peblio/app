import React from 'react';
import './assignments.scss';

import IconButton from '../../../IconButton/IconButton.jsx';
import Dropdown from '../../../Dropdown/Dropdown.jsx';
import LessonListCard from '../../../LessonListCard/LessonListCard.jsx';

import ShareIcon from '../../../../images/link.svg';

const Assignments = () => (
  <div classnName="class-view__assignments">
    <div className="class-view__assignments__action-area">
      <IconButton icon={<ShareIcon />} style={{ marginRight: '24px' }}> Publish course </IconButton>
      <IconButton icon={<ShareIcon />} style={{ marginRight: 'auto' }}> Preview student site </IconButton>
      <Dropdown
        className="btn"
        placeholder="New class"
        style={{
          width: '146px'
        }}
        options={[
          {
            name: 'Create class',
            value: 'create',
            onClick: () => { console.log('Create'); }
          }, {
            name: 'Join class',
            value: 'join',
            onClick: () => { console.log('Join'); }
          }
        ]}
      />
    </div>
    <div className="class-view__assignments__unit">
      <div className="class-view__assignments__unit__header-area">
        <h3 className="class-view__assignments__unit__header-area__header">Unit 1</h3>
      </div>
      <div className="class-view__assignments__unit__assignments-table">
        <div className="class-view__assignments__unit__assignments-table__header">
          <div className="">NAME</div>
          <div className="">TURNED IN</div>
          <div className="">DUE</div>
          <div className="">PERMISSION</div>
          <div className="">PUBLISHED</div>
        </div>
      </div>
      <LessonListCard color="yellow">Hello</LessonListCard>
    </div>
  </div>
);

export default Assignments;
