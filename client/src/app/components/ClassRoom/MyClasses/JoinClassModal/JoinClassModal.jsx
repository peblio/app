import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleJoinClassroomModal } from '../../../../action/classroom';

import Modal from '../../../Modal/Modal';
import InputField from '../../../InputField/InputField';
import Button from '../../../Button/Button';

import './joinClassModal.scss';

const JoinClassroomModal = ({ toggleJoinClassroomModal }) => {
  const [classCode, setClassCode] = useState('');

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
        onChange={(e) => { setClassCode(e.target.value); }}
        placeholder='e.g. X7dhj3'
        containerWidth="100%"
      />
      <div className="join-class-modal__buttons-container">
        <Button className='secondary' onClick={() => { toggleJoinClassroomModal(); }} style={{ marginRight: '16px' }}>Cancel</Button>
        <Button className='primary' disabled={!classCode.trim()}>Join Class</Button>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  // creatingClassroom: state.classroom.creatingClassroom
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleJoinClassroomModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JoinClassroomModal);
