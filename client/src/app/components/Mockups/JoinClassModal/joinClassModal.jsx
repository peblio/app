import React, { useState } from 'react';

import Modal from '../../Modal/Modal';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';

import './joinClassModal.scss';

const JoinClassModal = () => {
  const [classCode, setClassCode] = useState('');
  const [enableButton, setEnableButton] = useState(false);

  const handleClassCodeChange = (e) => {
    const val = e.target.value.trim();
    setClassCode(() => val);
    if (val) {
      setEnableButton(() => true);
    } else {
      setEnableButton(() => false);
    }
  };

  return (
    <Modal
      header='Join Class'
      modalClass='join-class-modal'
    >
      <h2 className="join-class-modal__body__header">
        Enter Class Code
      </h2>
      <InputField
        state={classCode}
        onChange={handleClassCodeChange}
        placeholder='e.g. X7dhj3'
        containerWidth="100%"
      />
      <div className="join-class-modal__buttons-container">
        <Button className='secondary' style={{ marginRight: '16px' }}>Cancel</Button>
        <Button className='primary' disabled={!enableButton}>Join Class</Button>
      </div>
    </Modal>
  );
};

export default JoinClassModal;
