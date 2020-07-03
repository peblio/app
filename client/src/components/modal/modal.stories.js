import React, { useState } from 'react';
import Modal from '../../app/components/Modal/Modal';

import InputField from '../../app/components/InputField/InputField';
import Dropdown from '../../app/components/Dropdown/Dropdown';
import TextareaField from '../../app/components/TextareaField/TextareaField';
import Button from '../../app/components/Button/Button';

export default { title: 'Modal' };

export const modal = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [room, setRoom] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Modal header="Create Class" modalWidth="893px" modalBodyStyle={{position: 'relative'}}>
      <div style={{position: 'absolute', top: '13px', right: '26px', color: '#667378', fontSize:'14px'}}> *required</div>
      <InputField
        state={className}
        setState={setClassName}
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
              name: '6th',
              value: 6
            }
          ]}
        />
        <InputField
          state={room}
          setState={setRoom}
          label="Room"
          placeholder="enter subject"
          containerWidth="199px"
          style={{ marginRight: '30px' }}
        />
        <InputField
          state={subject}
          setState={setSubject}
          label="Subject"
          placeholder="enter subject"
          containerWidth="199px"
        />
      </div>
      <TextareaField
        state={description}
        setState={setDescription}
        label="Description"
        placeholder="type description..."
        containerWidth="813px"
        textareaHeight="96px"
        style={{ marginTop: '40px' }}
      />
      <div style={{ display: 'flex', marginTop: '40px' }}>
        <Button className="secondary" style={{marginLeft: 'auto', marginRight: '16px'}}>
          Cancel
        </Button>
        <Button className="primary" disabled>
          Create class
        </Button>
      </div>
    </Modal>
  )
};
