import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toggleAddMemberModal,
  addMemberToClassroom,
  fetchCurrentClassroomDetails,
} from '../../../../action/classroom';

import Modal from '../../../Modal/Modal';
import InputField from '../../../InputField/InputField';
import Button from '../../../Button/Button';

import './addMemberModal.scss';

// eslint-disable-next-line no-shadow
const AddMemberModal = (props) => {
  const [identifier, setIdentifier] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <Modal
      header={`Add ${props.triggeredBy.charAt(0).toUpperCase()}${props.triggeredBy.slice(1)}`}
      modalClass='add-member-modal'
    >
      <h2 className="add-member-modal__body__header">
        Username or Email
      </h2>
      <InputField
        state={identifier}
        onChange={(e) => { setIdentifier(e.target.value); }}
        placeholder='e.g. jon.doe@gmail.com'
        containerWidth="100%"
        style={{
          height: '50px'
        }}
      />
      <div className="add-member-modal__name-row">
        <InputField
          state={firstName}
          onChange={(e) => { setFirstName(e.target.value); }}
          label="First name"
          placeholder="enter input text"
        />
      </div>
      <div className="add-member-modal__name-row">
        <InputField
          state={lastName}
          onChange={(e) => { setLastName(e.target.value); }}
          label="Last name"
          placeholder="enter input text"
        />
      </div>
      <div className="add-member-modal__buttons-container">
        <Button
          className='secondary'
          onClick={() => { props.toggleAddMemberModal(); }}
          style={{ marginRight: '16px' }}
        >
          Cancel
        </Button>
        <Button
          className='primary'
          disabled={!identifier.trim() ||
            !firstName.trim() ||
            !lastName.trim() ||
            submitting}
          onClick={() => {
            setSubmitting(true);
            props.addMemberToClassroom({
              firstName,
              lastName,
              identifier,
              role: props.triggeredBy
            }, {
              classroomId: props.classroomId
            }).then(() => {
              setSubmitting(false);
              props.fetchCurrentClassroomDetails(props.classroomId);
              props.toggleAddMemberModal();
            }).catch((err) => {
              console.log(err);
              setSubmitting(false);
            });
          }}
        >
          Add Member
        </Button>
      </div>
    </Modal>
  );
};

AddMemberModal.propTypes = {
  toggleAddMemberModal: PropTypes.func.isRequired,
  addMemberToClassroom: PropTypes.func.isRequired,
  fetchCurrentClassroomDetails: PropTypes.func.isRequired,
  triggeredBy: PropTypes.string.isRequired,
  classroomId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleAddMemberModal,
  addMemberToClassroom,
  fetchCurrentClassroomDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberModal);
