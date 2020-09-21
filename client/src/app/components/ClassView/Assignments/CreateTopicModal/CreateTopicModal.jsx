import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Modal from '../../../Modal/Modal';
import InputField from '../../../InputField/InputField';
import Button from '../../../Button/Button';

// actions
import { toggleCreateTopicModal, createClassroomTopic } from '../../../../action/classroom';

import './createTopicModal.scss';

// eslint-disable-next-line no-shadow
const CreateTopicModal = ({ toggleCreateTopicModal, createClassroomTopic, submittingData, classId }) => {
  const [topicTitle, setTopicTitle] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      classroomId: classId,
      name: topicTitle
    };
    createClassroomTopic(data);
  };

  useLayoutEffect(() => {
    document.querySelector('.input-field__text-box').focus();
  }, []);

  return (
    <Modal
      header='Create Topic'
      modalClass='create-topic-modal'
    >
      <form onSubmit={onSubmit}>
        <h2 className="create-topic-modal__body__header">
          Enter topic title
        </h2>
        <InputField
          state={topicTitle}
          onChange={(e) => { setTopicTitle(e.target.value); }}
          placeholder='e.g. Unit 15'
          containerWidth="100%"
          style={{
            height: '50px'
          }}
        />
        <div className="create-topic-modal__buttons-container">
          <Button
            className='secondary'
            style={{ marginRight: '16px' }}
            onClick={() => { toggleCreateTopicModal(); }}
          >
            Cancel
          </Button>
          <Button
            className='primary'
            disabled={!topicTitle.trim() || submittingData}
          >
            Create topic
          </Button>
        </div>
      </form>
    </Modal>
  );
};

CreateTopicModal.propTypes = {
  toggleCreateTopicModal: PropTypes.func.isRequired,
  createClassroomTopic: PropTypes.func.isRequired,
  submittingData: PropTypes.bool.isRequired,
  classId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  submittingData: state.classroom.submittingData,
  classId: state.classroom.currentClassroom.id
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleCreateTopicModal,
  createClassroomTopic
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopicModal);
