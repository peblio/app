import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';

import AssignmentCard from '../AssignmentCard/AssignmentCard';

import RenameIcon from '../../../../images/rename.svg';
import TrashIcon from '../../../../images/trash.svg';

import IconButton from '../../../IconButton/IconButton';
import InfoBubble from '../../../InfoBubble/InfoBubble';


// actions
import {
  fetchAssignments,
  toggleEditTopicModal,
  changePublishStatusOfAssignment,
  changeTopicOfAssignment,
  deleteTopic,
} from '../../../../action/classroom';

import './topicArea.scss';


const ItemTypes = {
  ASSIGNMENT_CARD: 'ASSIGNMENT_CARD'
};


const topicTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if (item.currentTopicId !== props.id) {
      props.changeTopicOfAssignment({
        assignmentId: item.assignmentId,
        newTopicId: props.id
      }).then(() => {
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

const TopicArea = ({
  name,
  id,
  assignments,
  classroomId,
  assignmentDrag,
  setEditingTopic,
  // eslint-disable-next-line no-shadow
  fetchAssignments,
  // eslint-disable-next-line no-shadow
  toggleEditTopicModal,
  // eslint-disable-next-line no-shadow
  changePublishStatusOfAssignment,
  // eslint-disable-next-line no-shadow
  changeTopicOfAssignment, // used in dnd function [DO NOT REMOVE]
  connectDropTarget,
  // eslint-disable-next-line no-shadow
  deleteTopic,
}) => {
  const handleChangeAssignmentStatus = ({ assignmentId, isPublished }) => {
    changePublishStatusOfAssignment({ assignmentId, isPublished })
      .then(() => {
        fetchAssignments(classroomId);
      });
  };

  return (
    <div>
      <div className="class-view__assignments__topic__header-area">
        <h3 className="class-view__assignments__topic__header-area__header">{name}</h3>
        <IconButton
          icon={<RenameIcon />}
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            setEditingTopic({
              title: name,
              id
            });
            toggleEditTopicModal();
          }}
        />
        <IconButton
          icon={<TrashIcon />}
          onClick={() => {
            deleteTopic({ topicId: id, assignments, classroomId });
          }}
        />
      </div>
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
                  will create a copy for each student. Any chages made to the original after the students opens the
                  assignment will not be viewed.
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
        connectDropTarget(
          <div
            className={`class-view__assignments__topic__drop-area ${assignmentDrag !== false && assignmentDrag !== id
              ? 'class-view__assignments__topic__drop-area--active' : ''
            }`}
          >
          </div>
        )
      }
      {
        assignments.map(assignment => (
          <AssignmentCard
            topicId={assignment.topicId}
            classroomId={classroomId}
            key={assignment.id}
            id={assignment.id}
            title={assignment.title}
            dueDate={assignment.dueDate}
            permission="view"
            type={assignment.type}
            isPublished={assignment.isPublished}
            peblUrl={assignment.peblUrl}
            url={assignment.url}
            handleChangeAssignmentStatus={handleChangeAssignmentStatus}
          />
        ))
      }
    </div>
  );
};

TopicArea.propTypes = {
  classroomId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  assignments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setEditingTopic: PropTypes.func.isRequired,
  toggleEditTopicModal: PropTypes.func.isRequired,
  changePublishStatusOfAssignment: PropTypes.func.isRequired,
  fetchAssignments: PropTypes.func.isRequired,
  changeTopicOfAssignment: PropTypes.func.isRequired,
  deleteTopic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  assignmentDrag: state.classroom.assignmentDrag
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleEditTopicModal,
  changePublishStatusOfAssignment,
  fetchAssignments,
  changeTopicOfAssignment,
  deleteTopic
}, dispatch);

const DroppableTargetArea = DropTarget([ItemTypes.ASSIGNMENT_CARD], topicTarget, collectDropTarget)(TopicArea);
export default connect(mapStateToProps, mapDispatchToProps)(DroppableTargetArea);
