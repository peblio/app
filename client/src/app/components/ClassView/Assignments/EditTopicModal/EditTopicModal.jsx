import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Modal from '../../../Modal/Modal';
import InputField from '../../../InputField/InputField';
import Button from '../../../Button/Button';

// actions
import { toggleEditTopicModal } from '../../../../action/classroom';

import './editTopicModal.scss';


// eslint-disable-next-line no-shadow
const EditTopicModal = ({ currentTitle, toggleEditTopicModal, submittingData }) => {
  const [topicTitle, setTopicTitle] = useState(currentTitle || '');

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
          disabled={!topicTitle.trim() || currentTitle === topicTitle || submittingData}
        >
          Save topic
        </Button>
      </div>
    </Modal>
  );
};

EditTopicModal.propTypes = {
  currentTitle: PropTypes.string.isRequired,
  toggleEditTopicModal: PropTypes.func.isRequired,
  submittingData: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  submittingData: state.classroom.submittingData,
  classId: state.classroom.currentClassroom.id
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleEditTopicModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditTopicModal);
