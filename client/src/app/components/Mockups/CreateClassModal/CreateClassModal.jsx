import React, { useState, useEffect } from 'react';

import Modal from '../../Modal/Modal';
import InputField from '../../InputField/InputField';
import Dropdown from '../../Dropdown/Dropdown';
import TextareaField from '../../TextareaField/TextareaField';
import Button from '../../Button/Button';

export const CreateClassroomModal = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [room, setRoom] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);

  useEffect(() => {
    console.log('create', isCreateEnabled);
  });

  const onClassNameChange = (e) => {
    const value = e.target.value.trim();
    setClassName(() => value);
    if (value) {
      setIsCreateEnabled(() => true);
    } else {
      setIsCreateEnabled(() => false);
    }
  };

  // could move to utility functions

  return (
    <Modal header="Create Class" modalWidth="893px" modalBodyStyle={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '13px',
        right: '26px',
        color: '#667378',
        fontSize: '14px'
      }}
      >
        *required
      </div>
      <InputField
        state={className}
        onChange={onClassNameChange}
        label="*Class Name"
        placeholder="enter class name"
        containerWidth="813px"
      />
      <div className="" style={{ display: 'flex', marginTop: '40px' }}>
        <Dropdown
          placeholder="Grade"
          style={{ width: '100px', marginTop: '28px', marginRight: '30px' }}
          state={grade}
          setState={setGrade}
          options={[
            {
              name: '10th',
              value: 10
            },
            {
              name: '9th',
              value: 9
            },
            {
              name: '8th',
              value: 8
            }, {
              name: '7th',
              value: 7
            },
            {
              name: '6th Standard',
              value: 6
            }
          ]}
        />
        <InputField
          state={room}
          onChange={(e) => { setRoom(e.target.value.trim()); }}
          label="Room"
          placeholder="enter subject"
          containerWidth="199px"
          style={{ marginRight: '30px' }}
        />
        <InputField
          state={subject}
          onChange={(e) => { setSubject(e.target.value.trim()); }}
          label="Subject"
          placeholder="enter subject"
          containerWidth="199px"
        />
      </div>
      <TextareaField
        state={description}
        onChange={(e) => { setDescription(e.target.value.trim()); }}
        label="Description"
        placeholder="type description..."
        containerWidth="813px"
        textareaHeight="96px"
        style={{ marginTop: '40px' }}
      />
      <div style={{ display: 'flex', marginTop: '40px' }}>
        <Button className="secondary" style={{ marginLeft: 'auto', marginRight: '16px' }}>
          Cancel
        </Button>
        <Button className="primary" disabled={!isCreateEnabled}>
          Create class
        </Button>
      </div>
    </Modal>
  );
};

export default CreateClassroomModal;
