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
  const [error, setError] = useState();

  return (
    <Modal
      header={`Add ${props.triggeredBy.charAt(0).toUpperCase()}${props.triggeredBy.slice(1)}`}
      modalClass='add-member-modal'
    >
      <form onSubmit={(e) => {
        e.preventDefault();
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
          if (err.response.status === 400) {
            setError('Please use username, this email is linked to multiple accounts');
          } else if (err.response.status === 404) {
            setError('User was not found');
          }
        });
      }}
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
          error={error}
        />
        <div
          className="add-member-modal__name-row"
          style={{
            marginTop: '40px'
          }}
        >
          <InputField
            state={firstName}
            onChange={(e) => { setFirstName(e.target.value); }}
            containerWidth="100%"
            label="First name"
            placeholder="enter input text"
          />
        </div>
        <div className="add-member-modal__name-row">
          <InputField
            state={lastName}
            onChange={(e) => { setLastName(e.target.value); }}
            containerWidth="100%"
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
            type="submit"
          >
            Add Member
          </Button>
        </div>
      </form>
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
