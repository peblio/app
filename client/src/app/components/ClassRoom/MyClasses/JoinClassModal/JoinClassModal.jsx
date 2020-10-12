import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleJoinClassroomModal, joinClassroom } from '../../../../action/classroom';

import Modal from '../../../Modal/Modal';
import InputField from '../../../InputField/InputField';
import Button from '../../../Button/Button';

import './joinClassModal.scss';

// eslint-disable-next-line no-shadow
const JoinClassroomModal = ({ toggleJoinClassroomModal, joinClassroom, ...props }) => {
  const [classCode, setClassCode] = useState('');
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState('');

  return (
    <Modal
      header='Join Class'
      modalClass='join-class-modal'
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(() => true);
        joinClassroom({
          firstName,
          lastName,
          classroomId: classCode
        })
          .then(({ data }) => {
            console.log(data);
            setSubmitting(() => false);
            toggleJoinClassroomModal();
          })
          .catch((err) => {
            console.log(err.response);
            setSubmitting(() => false);
            if (err.response.status === 500) {
              setError('You have already joined this class');
            }
          });
      }}
      >
        <h2 className="join-class-modal__body__header">
          Enter Class Code
        </h2>
        <InputField
          state={classCode}
          onChange={(e) => { setClassCode(e.target.value); }}
          placeholder='e.g. X7dhj3'
          containerWidth="100%"
          style={{
            height: '50px'
          }}
          error={error}
        />
        <div
          className="join-class-modal__name-row"
          style={{
            marginTop: '40px'
          }}
        >
          <InputField
            state={firstName}
            onChange={(e) => { setFirstName(e.target.value); }}
            label="First name"
            placeholder="enter input text"
            containerWidth="100%"
          />
        </div>
        <div className="join-class-modal__name-row">
          <InputField
            state={lastName}
            onChange={(e) => { setLastName(e.target.value); }}
            label="Last name"
            placeholder="enter input text"
            containerWidth="100%"
          />
        </div>
        <div className="join-class-modal__buttons-container">
          <Button
            className='secondary'
            onClick={() => { toggleJoinClassroomModal(); }}
            style={{ marginRight: '16px' }}
          >
            Cancel
          </Button>
          <Button
            className='primary'
            disabled={!classCode.trim() || !firstName.trim() || !lastName.trim() || submitting}
            type="submit"
          >
            Join Class
          </Button>
        </div>
      </form>
    </Modal>
  );
};

JoinClassroomModal.propTypes = {
  toggleJoinClassroomModal: PropTypes.func.isRequired,
  submittingData: PropTypes.bool.isRequired,
  joinClassroom: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

JoinClassroomModal.defaultProps = {
  firstName: '',
  lastName: '',
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleJoinClassroomModal,
  joinClassroom,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JoinClassroomModal);
