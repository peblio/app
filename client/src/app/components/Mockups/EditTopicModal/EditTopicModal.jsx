import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../Modal/Modal';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';

import './editTopicModal.scss';

const EditTopicModal = ({ currentTitle }) => {
  const [topicTitle, setTopicTitle] = useState(currentTitle);

  return (
    <Modal
      header='Edit Topic'
      modalClass='create-topic-modal'
    >
      <h2 className="create-topic-modal__body__header">
        Edit topic title
      </h2>
      <InputField
        state={topicTitle}
        onChange={(e) => { setTopicTitle(e.target.value); }}
        placeholder='e.g. Unit 15'
        containerWidth="100%"
      />
      <div className="create-topic-modal__buttons-container">
        <Button className='secondary' style={{ marginRight: '16px' }}>Cancel</Button>
        <Button className='primary' disabled={!topicTitle.trim() || currentTitle === topicTitle}>Save topic</Button>
      </div>
    </Modal>
  );
};

EditTopicModal.propTypes = {
  currentTitle: PropTypes.string.isRequired
};

export default EditTopicModal;
