import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../Modal/Modal';
import Button from '../../../Button/Button';

import { toggleEditAssignmentConfirmationModal, toggleEditAssignmentModal } from '../../../../action/classroom';

import './editAssignmentConfirmationModal.scss';

const EditAssignmentConfirmationModal = props => (
  <Modal
    header='Edit Assignment'
    modalClass='edit-assignment-confirmation-modal'
  >
    <h2 className="edit-assignment-confirmation-modal__body__header">
      Are you sure you want to edit?
    </h2>
    <p>
      Any changes made to a published assignment pebl will not be viewed by students who already opened the assignment.
    </p>
    <div className="edit-assignment-confirmation-modal__buttons-container">
      <Button
        className='secondary'
        style={{ marginRight: '16px' }}
        onClick={() => { props.toggleEditAssignmentConfirmationModal({ assignmentId: null, value: false }); }}
      >
        Cancel
      </Button>
      <Button
        className='primary'
        onClick={() => {
          props.toggleEditAssignmentConfirmationModal({ assignmentId: props.assignmentId, value: false });
          props.toggleEditAssignmentModal();
        }}
      >
        Yes, edit
      </Button>
    </div>
  </Modal>
);

EditAssignmentConfirmationModal.propTypes = {
  assignmentId: PropTypes.string.isRequired,
  toggleEditAssignmentConfirmationModal: PropTypes.func.isRequired,
  toggleEditAssignmentModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  assignmentId: state.classroom.editingAssignmentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleEditAssignmentConfirmationModal,
  toggleEditAssignmentModal
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(EditAssignmentConfirmationModal);
