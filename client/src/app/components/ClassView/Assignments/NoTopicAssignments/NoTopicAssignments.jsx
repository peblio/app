import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';

import AssignmentCard from '../AssignmentCard/AssignmentCard';
import InfoBubble from '../../../InfoBubble/InfoBubble';

// actions
import {
  fetchAssignments,
  toggleEditTopicModal,
  changePublishStatusOfAssignment,
  changeTopicOfAssignment
} from '../../../../action/classroom';

import './noTopicAssignments.scss';

const ItemTypes = {
  ASSIGNMENT_CARD: 'ASSIGNMENT_CARD'
};


const topicTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if (item.currentTopicId !== props.id) {
      props.changeTopicOfAssignment({
        assignmentId: item.assignmentId,
      }).then((data) => {
        props.fetchAssignments(props.classroomId);
      })
        .catch(err => console.log(err));
    }
  }
};

function collectDropTarget(_connect, monitor) {
  return {
    connectDropTarget: _connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true })
  };
}

const NoTopicAssignments = ({
  assignments,
  classroomId,
  // eslint-disable-next-line no-shadow
  fetchAssignments,
  // eslint-disable-next-line no-shadow
  changePublishStatusOfAssignment,
  // eslint-disable-next-line no-shadow
  changeTopicOfAssignment, // used in dnd
  connectDropTarget,
}) => {
  const handleChangeAssignmentStatus = ({ assignmentId, isPublished }) => {
    changePublishStatusOfAssignment({ assignmentId, isPublished })
      .then(() => {
        fetchAssignments(classroomId);
      });
  };

  return connectDropTarget(
    <div className="class-view__assignments__topic">
      <div className="class-view__assignments__topic__assignments-table">
        <div className="class-view__assignments__topic__assignments-table__header">
          <div className="">NAME</div>
          <div className="">DUE</div>
          <div className="class-view__assignments__topic__assignments-table__header__type">
            TYPE
            <InfoBubble>
              <div className="">
                <div>
                  <span>Assignments</span>
                  {' '}
                  will create a copy for each student. Any chages made to the original after the students opens
                  the assignment will not be viewed.
                </div>
                <br />
                <div>
                  <span>Resources</span>
                  {' '}
                  will share the original link with your students. Copies will not be made and updates will be viewed.
                </div>
              </div>
            </InfoBubble>
          </div>
          <div className="">PUBLISHED</div>
        </div>
      </div>
      {
        assignments.length !== 0
          ? (assignments.map(assignment => (
            <AssignmentCard
              classroomId={classroomId}
              topicId={assignment.topicId}
              key={assignment.id}
              id={assignment.id}
              title={assignment.title}
              dueDate={assignment.dueDate}
              permission="view"
              type={assignment.type}
              isPublished={assignment.isPublished}
              handleChangeAssignmentStatus={handleChangeAssignmentStatus}
            />
          )))
          : (
            <p className="class-view__assignments__topic__assignments-table__no-assignments">
              The assignments that are not associated with topics will be shown here
            </p>
          )
      }
    </div>
  );
};

NoTopicAssignments.propTypes = {
  classroomId: PropTypes.string.isRequired,
  assignments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleEditTopicModal: PropTypes.func.isRequired,
  changePublishStatusOfAssignment: PropTypes.func.isRequired,
  fetchAssignments: PropTypes.func.isRequired,
  changeTopicOfAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleEditTopicModal,
  changePublishStatusOfAssignment,
  fetchAssignments,
  changeTopicOfAssignment
}, dispatch);

const DroppableTargetArea = DropTarget([ItemTypes.ASSIGNMENT_CARD], topicTarget, collectDropTarget)(NoTopicAssignments);
export default connect(mapStateToProps, mapDispatchToProps)(DroppableTargetArea);
