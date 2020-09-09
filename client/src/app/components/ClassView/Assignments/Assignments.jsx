import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// generic components
import IconButton from '../../IconButton/IconButton';
import Dropdown from '../../Dropdown/Dropdown';
import ShareIcon from '../../../images/link.svg';

// page speecific components
import AssignmentCard from './AssignmentCard/AssignmentCard';
import CreateTopicModal from './CreateTopicModal/CreateTopicModal';
import EditTopicModal from './EditTopicModal/EditTopicModal';
import CreateAssignmentModal from './CreateAssignmentModal/CreateAssignmentModal';
import TopicArea from './TopicArea/TopicArea';

// actions
import {
  toggleCreateTopicModal,
  toggleCreateAssignmentModal,
  toggleEditTopicModal,
  fetchAssignments,
  fetchTopics,
  changePublishStatusOfAssignment
} from '../../../action/classroom';

import RenameIcon from '../../../images/rename.svg';
import TrashIcon from '../../../images/trash.svg';

import './assignments.scss';

// eslint-disable-next-line no-shadow
const Assignments = ({
  classroomId,
  createTopicModal,
  editTopicModal,
  createAssignmentModal,
  assignments,
  topics,
  // eslint-disable-next-line no-shadow
  toggleCreateTopicModal,
  // eslint-disable-next-line no-shadow
  toggleCreateAssignmentModal,
  // eslint-disable-next-line no-shadow
  toggleEditTopicModal,
  // eslint-disable-next-line no-shadow
  fetchAssignments,
  // eslint-disable-next-line no-shadow
  changePublishStatusOfAssignment,
  // eslint-disable-next-line no-shadow
  fetchTopics,
}) => {
  // 0 for assignment | 1 for material
  const [resourceType, setResourceType] = useState(0);
  const [editingTopic, setEditingTopic] = useState(null);

  useEffect(() => {
    fetchAssignments(classroomId);
    fetchTopics(classroomId);
  }, []);

  const handleChangeAssignmentStatus = ({ assignmentId, isPublished }) => {
    console.log({
      assignmentId,
      isPublished
    });
    changePublishStatusOfAssignment({ assignmentId, isPublished })
      .then(() => {
        fetchAssignments(classroomId);
      });
  };

  return (
    <React.Fragment>
      <div className="class-view__assignments">
        <div className="class-view__assignments__action-area">
          <IconButton icon={<ShareIcon />} style={{ marginRight: '24px' }}> Publish course </IconButton>
          <IconButton icon={<ShareIcon />} style={{ marginRight: 'auto' }}> Preview student site </IconButton>
          <Dropdown
            className="btn"
            placeholder="New Resource"
            style={{
              width: '146px'
            }}
            options={[
              {
                name: 'Create Topic',
                value: 'topic',
                onClick: () => { toggleCreateTopicModal(); }
              }, {
                name: 'Create Assignment',
                value: 'assignment',
                onClick: () => {
                  setResourceType(0);
                  toggleCreateAssignmentModal();
                }
              }, {
                name: 'Create Material',
                value: 'material',
                onClick: () => {
                  setResourceType(1);
                  toggleCreateAssignmentModal();
                }
              }
            ]}
          />
        </div>
        {
          topics && topics.map(topic => (
            <TopicArea
              key={topic._id}
              id={topic._id}
              assignments={assignments}
              setEditingTopic={setEditingTopic}
              classroomId={classroomId}
              name={topic.name}
            />
          ))
        }
      </div>
      { createTopicModal && <CreateTopicModal /> }
      { createAssignmentModal && <CreateAssignmentModal resourceType={resourceType} /> }
      { editTopicModal && <EditTopicModal editingTopic={editingTopic} classroomId={classroomId} /> }
    </React.Fragment>
  );
};

Assignments.propTypes = {
  createTopicModal: PropTypes.bool.isRequired,
  editTopicModal: PropTypes.bool.isRequired,
  createAssignmentModal: PropTypes.bool.isRequired,
  toggleCreateTopicModal: PropTypes.func.isRequired,
  toggleCreateAssignmentModal: PropTypes.func.isRequired,
  toggleEditTopicModal: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classroomId: PropTypes.string.isRequired,
  fetchAssignments: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  })).isRequired,
  fetchTopics: PropTypes.func.isRequired,
  changePublishStatusOfAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  createTopicModal: state.classroom.createTopicModal,
  editTopicModal: state.classroom.editTopicModal,
  createAssignmentModal: state.classroom.createAssignmentModal,
  assignments: state.classroom.assignments,
  topics: state.classroom.topics
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleCreateTopicModal,
  toggleCreateAssignmentModal,
  toggleEditTopicModal,
  fetchAssignments,
  fetchTopics,
  changePublishStatusOfAssignment
}, dispatch);

const DragDropAssignmentsView = DragDropContext(HTML5Backend)(Assignments);
export default connect(mapStateToProps, mapDispatchToProps)(DragDropAssignmentsView);
