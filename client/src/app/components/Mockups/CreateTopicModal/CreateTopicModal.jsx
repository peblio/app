import React, { useState } from 'react';

import Modal from '../../Modal/Modal';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';

import './createTopicModal.scss';

const CreateTopicModal = () => {
  const [topicTitle, setTopicTitle] = useState('');

  return (
    <Modal
      header='Create Topic'
      modalClass='create-topic-modal'
    >
      <h2 className="create-topic-modal__body__header">
        Enter topic title
      </h2>
      <InputField
        state={topicTitle}
        onChange={(e) => { setTopicTitle(e.target.value); }}
        placeholder='e.g. Unit 15'
        containerWidth="100%"
      />
      <div className="create-topic-modal__buttons-container">
        <Button className='secondary' style={{ marginRight: '16px' }}>Cancel</Button>
        <Button className='primary' disabled={!topicTitle.trim()}>Create topic</Button>
      </div>
    </Modal>
  );
};

export default CreateTopicModal;
