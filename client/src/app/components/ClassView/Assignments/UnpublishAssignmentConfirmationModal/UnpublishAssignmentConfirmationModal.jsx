import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../Modal/Modal';
import Button from '../../../Button/Button';

import {
  toggleUnpublishAssignmentConfirmationModal,
  toggleEditAssignmentModal,
  changePublishStatusOfAssignment,
  fetchAssignments
} from '../../../../action/classroom';

import './unpublishAssignmentConfirmationModal.scss';

const UnpublishAssignmentConfirmationModal = (props) => {
  const [unpublishing, setUnpublishing] = useState(false);

  const handleChangeAssignmentStatus = ({ assignmentId, isPublished }) => {
    setUnpublishing(true);
    props.changePublishStatusOfAssignment({ assignmentId, isPublished })
      .then(() => {
        props.fetchAssignments(props.classroomId);
        props.toggleUnpublishAssignmentConfirmationModal(false);
        setUnpublishing(false);
      }).catch((err) => {
        setUnpublishing(false);
        console.log(err);
      });
  };
  return (
    <Modal
      header='Unpublish Assignment'
      modalClass='unpublish-assignment-confirmation-modal'
    >
      <h2 className="unpublish-assignment-confirmation-modal__body__header">
        Are you sure you want to un-publish?
      </h2>
      <p>
        Students will no longer see this assignment on their class page.
      </p>
      <div className="unpublish-assignment-confirmation-modal__buttons-container">
        <Button
          className='secondary'
          style={{ marginRight: '16px' }}
          onClick={() => {
            props.toggleUnpublishAssignmentConfirmationModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className='primary'
          disabled={unpublishing}
          onClick={() => {
            handleChangeAssignmentStatus({ assignmentId: props.assignmentId, isPublished: false });
          }}
        >
          Yes, unpublish
        </Button>
      </div>
    </Modal>
  );
};

UnpublishAssignmentConfirmationModal.propTypes = {
  toggleUnpublishAssignmentConfirmationModal: PropTypes.func.isRequired,
  assignmentId: PropTypes.string.isRequired,
  changePublishStatusOfAssignment: PropTypes.func.isRequired,
  fetchAssignments: PropTypes.func.isRequired,
  classroomId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  assignmentId: state.classroom.unpublishingAssignmentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleUnpublishAssignmentConfirmationModal,
  toggleEditAssignmentModal,
  changePublishStatusOfAssignment,
  fetchAssignments
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(UnpublishAssignmentConfirmationModal);
