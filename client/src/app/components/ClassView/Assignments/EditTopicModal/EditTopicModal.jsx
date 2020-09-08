import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Modal from '../../../Modal/Modal';
import InputField from '../../../InputField/InputField';
import Button from '../../../Button/Button';

// actions
import {
  toggleEditTopicModal,
  editClassroomTopic
} from '../../../../action/classroom';

import './editTopicModal.scss';


const EditTopicModal = ({
  editingTopic,
  // eslint-disable-next-line no-shadow
  toggleEditTopicModal,
  submittingData,
  // eslint-disable-next-line no-shadow
  editClassroomTopic,
  classroomId
}) => {
  const [topicTitle, setTopicTitle] = useState(editingTopic.title || '');

  const handleSubmit = () => {
    const topicData = {
      name: topicTitle,
      id: editingTopic.id
    };
    editClassroomTopic({ topicData, classroomId });
  };

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
        <Button
          className='secondary'
          style={{ marginRight: '16px' }}
          onClick={() => { toggleEditTopicModal(); }}
        >
          Cancel
        </Button>
        <Button
          className='primary'
          disabled={!topicTitle.trim() || editingTopic.title === topicTitle || submittingData}
          onClick={handleSubmit}
        >
          Save topic
        </Button>
      </div>
    </Modal>
  );
};

EditTopicModal.propTypes = {
  editingTopic: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  toggleEditTopicModal: PropTypes.func.isRequired,
  submittingData: PropTypes.bool.isRequired,
  editClassroomTopic: PropTypes.func.isRequired,
  classroomId: PropTypes.string.isRequired
};


const mapStateToProps = state => ({
  submittingData: state.classroom.submittingData,
  classId: state.classroom.currentClassroom.id
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleEditTopicModal,
  editClassroomTopic
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditTopicModal);
