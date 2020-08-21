import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createClassroom, toggleCreateClassroomModal } from '../../../../action/classroom';

import Modal from '../../../Modal/Modal';
import InputField from '../../../InputField/InputField';
import Dropdown from '../../../Dropdown/Dropdown';
import TextareaField from '../../../TextareaField/TextareaField';
import Button from '../../../Button/Button';

import './createClassModal.scss';

export const CreateClassroomModal = ({
  userId,
  creatingClassroom,
  // eslint-disable-next-line no-shadow
  createClassroom,
  // eslint-disable-next-line no-shadow
  toggleCreateClassroomModal
}) => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [room, setRoom] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const classData = {
      name: className,
      subject,
      room,
      grade,
      description,
      user: userId
    };
    createClassroom(classData);
  };

  return (
    <Modal
      header="Create Class"
      modalClass="create-class-modal"
      modalClose={() => toggleCreateClassroomModal()}
    >
      <div className="create-class-modal__required">
        *required
      </div>
      <form action="">
        <div className="create-class-modal__row">
          <InputField
            state={className}
            onChange={(e) => { setClassName(e.target.value); }}
            label="*Class Name"
            placeholder="enter class name"
            containerWidth="100%"
          />
        </div>
        <div className="create-class-modal__row">
          <Dropdown
            placeholder="Grade"
            style={{ width: '100px', marginTop: '28px', marginRight: '30px' }}
            state={grade}
            setState={setGrade}
            options={[
              {
                name: '10th',
                value: '10'
              },
              {
                name: '9th',
                value: '9'
              },
              {
                name: '8th',
                value: '8'
              }, {
                name: '7th',
                value: '7'
              },
              {
                name: '6th Standard',
                value: '6'
              }
            ]}
          />
          <InputField
            state={room}
            onChange={(e) => { setRoom(e.target.value); }}
            label="Room"
            placeholder="enter subject"
            containerWidth="199px"
            style={{ marginRight: '30px' }}
          />
          <InputField
            state={subject}
            onChange={(e) => { setSubject(e.target.value); }}
            label="Subject"
            placeholder="enter subject"
            containerWidth="199px"
          />
        </div>
        <div className="create-class-modal__row">
          <TextareaField
            state={description}
            onChange={(e) => { setDescription(e.target.value); }}
            label="Description"
            placeholder="type description..."
            style={{
              containerWidth: '100%',
              textareaHeight: '96px'
            }}
          />
        </div>
        <div className="create-class-modal__row">
          <Button
            className="secondary"
            onClick={() => { console.log('toggle'); toggleCreateClassroomModal(); }}
            style={{ marginLeft: 'auto', marginRight: '16px' }}
          >
            Cancel
          </Button>
          <Button
            className="primary"
            onClick={handleSubmit}
            disabled={!className.trim() || creatingClassroom}
          >
            Create class
          </Button>
        </div>
      </form>
    </Modal>
  );
};

CreateClassroomModal.propTypes = {
  createClassroom: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  creatingClassroom: PropTypes.bool.isRequired,
  toggleCreateClassroomModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userId: state.user.id,
  creatingClassroom: state.classroom.creatingClassroom
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createClassroom,
  toggleCreateClassroomModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassroomModal);
