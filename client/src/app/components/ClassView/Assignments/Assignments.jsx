import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// generic components
import IconDropdownButton from '../../IconButtonDropdown/IconButtonDropdown';
import GenericLoader from '../../GenericLoader/LoadingMessage';
// import IconButton from '../../IconButton/IconButton';

// page speecific components
import CreateTopicModal from './CreateTopicModal/CreateTopicModal';
import EditTopicModal from './EditTopicModal/EditTopicModal';
import CreateAssignmentModal from './CreateAssignmentModal/CreateAssignmentModal';
import TopicArea from './TopicArea/TopicArea';
import NoTopicAssignments from './NoTopicAssignments/NoTopicAssignments';
import EditAssignmentConfirmationModal from './EditAssignmetnConfirmationModal/EditAssignmentConfirmationModal';
import EditAssignmentModal from './EditAssignmentModal/EditAssignmentModal';

// actions
import {
  toggleCreateTopicModal,
  toggleCreateAssignmentModal,
  toggleEditTopicModal,
  fetchAssignments,
  fetchTopics,
  changePublishStatusOfAssignment,
} from '../../../action/classroom';

// import ShareIcon from '../../../images/link.svg';
import PlusIcon from '../../../images/add.svg';

import './assignments.scss';

// eslint-disable-next-line no-shadow
const Assignments = ({
  classroomId,
  createTopicModal,
  editTopicModal,
  createAssignmentModal,
  assignments,
  editAssignmentConfirmationModal,
  editAssignmentModal,
  topics,
  // eslint-disable-next-line no-shadow
  toggleCreateTopicModal,
  // eslint-disable-next-line no-shadow
  toggleCreateAssignmentModal,
  // eslint-disable-next-line no-shadow
  fetchAssignments,
  // eslint-disable-next-line no-shadow
  fetchTopics,
}) => {
  // 0 for assignment | 1 for material
  const [resourceType, setResourceType] = useState('assignment');
  const [editingTopic, setEditingTopic] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(true);
    fetchAssignments(classroomId)
      .then(() => {
        setDataLoading(false);
      });
    fetchTopics(classroomId);
  }, []);

  return (
    <React.Fragment>
      {
        dataLoading ? <GenericLoader />
          : (
            <div className="class-view__assignments">
              <div className="class-view__assignments__action-area">
                <IconDropdownButton
                  optionsPosition='right'
                  icon={<PlusIcon />}
                  style={{
                    marginLeft: 'auto'
                  }}
                  options={[
                    {
                      name: 'Topic',
                      value: 'topic',
                      onClick: () => { toggleCreateTopicModal(); }
                    }, {
                      name: 'Assignment',
                      value: 'assignment',
                      onClick: () => {
                        setResourceType('assignment');
                        toggleCreateAssignmentModal();
                      }
                    }, {
                      name: 'Material',
                      value: 'material',
                      onClick: () => {
                        setResourceType('material');
                        toggleCreateAssignmentModal();
                      }
                    }
                  ]}
                />
              </div>
              <NoTopicAssignments
                assignments={assignments.filter(assignment => assignment.topicId === null)}
                classroomId={classroomId}
              />
              {
                topics && topics.map(topic => (
                  <TopicArea
                    key={topic._id}
                    id={topic._id}
                    assignments={assignments.filter(assignment => assignment.topicId === topic._id)}
                    setEditingTopic={setEditingTopic}
                    classroomId={classroomId}
                    name={topic.name}
                  />
                ))
              }
            </div>
          )
      }
      { editAssignmentConfirmationModal && <EditAssignmentConfirmationModal /> }
      { createTopicModal && <CreateTopicModal /> }
      { createAssignmentModal && <CreateAssignmentModal resourceType={resourceType} /> }
      { editTopicModal && <EditTopicModal editingTopic={editingTopic} classroomId={classroomId} /> }
      { editAssignmentModal && <EditAssignmentModal /> }
    </React.Fragment>
  );
};

Assignments.propTypes = {
  createTopicModal: PropTypes.bool.isRequired,
  editTopicModal: PropTypes.bool.isRequired,
  createAssignmentModal: PropTypes.bool.isRequired,
  toggleCreateTopicModal: PropTypes.func.isRequired,
  toggleCreateAssignmentModal: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classroomId: PropTypes.string.isRequired,
  fetchAssignments: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  })).isRequired,
  fetchTopics: PropTypes.func.isRequired,
  editAssignmentConfirmationModal: PropTypes.bool.isRequired,
  editAssignmentModal: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  createTopicModal: state.classroom.createTopicModal,
  editTopicModal: state.classroom.editTopicModal,
  createAssignmentModal: state.classroom.createAssignmentModal,
  editAssignmentConfirmationModal: state.classroom.editAssignmentConfirmationModal,
  editAssignmentModal: state.classroom.editAssignmentModal,
  assignments: state.classroom.assignments,
  topics: state.classroom.topics,
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
