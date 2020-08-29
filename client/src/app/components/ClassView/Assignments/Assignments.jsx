import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// generic components
import { useState } from 'react';
import IconButton from '../../IconButton/IconButton';
import Dropdown from '../../Dropdown/Dropdown';
import LessonListCard from '../../LessonListCard/LessonListCard';
import ShareIcon from '../../../images/link.svg';

// page speecific components
import CreateTopicModal from './CreateTopicModal/CreateTopicModal';
import EditTopicModal from './EditTopicModal/EditTopicModal';
import CreateAssignmentModal from './CreateAssignmentModal/CreateAssignmentModal';

// actions
import {
  toggleCreateTopicModal,
  toggleCreateAssignmentModal,
  toggleEditTopicModal,
} from '../../../action/classroom';

import RenameIcon from '../../../images/rename.svg';
import TrashIcon from '../../../images/trash.svg';

import './assignments.scss';

// eslint-disable-next-line no-shadow
const Assignments = ({
  createTopicModal,
  editTopicModal,
  createAssignmentModal,
  // eslint-disable-next-line no-shadow
  toggleCreateTopicModal,
  // eslint-disable-next-line no-shadow
  toggleCreateAssignmentModal,
  // eslint-disable-next-line no-shadow
  toggleEditTopicModal,
}) => {
  // 0 for assignment | 1 for resource
  const [resourceType, setResourceType] = useState(0);
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
                name: 'Create Resource',
                value: 'resource',
                onClick: () => {
                  setResourceType(1);
                  toggleCreateAssignmentModal();
                }
              }
            ]}
          />
        </div>
        <div className="class-view__assignments__unit">
          <div className="class-view__assignments__unit__header-area">
            <h3 className="class-view__assignments__unit__header-area__header">Unit 1</h3>
            <IconButton
              icon={<RenameIcon />}
              style={{ marginLeft: 'auto' }}
              onClick={() => { toggleEditTopicModal(); }}
            />
            <IconButton icon={<TrashIcon />} />
          </div>
          <div className="class-view__assignments__unit__assignments-table">
            <div className="class-view__assignments__unit__assignments-table__header">
              <div className="">NAME</div>
              <div className="">TURNED IN</div>
              <div className="">DUE</div>
              <div className="">PERMISSION</div>
              <div className="">PUBLISHED</div>
            </div>
          </div>
          <LessonListCard color="yellow">Hello</LessonListCard>
        </div>
      </div>
      { createTopicModal && <CreateTopicModal /> }
      { createAssignmentModal && <CreateAssignmentModal resourceType={resourceType} /> }
      { editTopicModal && <EditTopicModal currentTitle="Title" /> }
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
};

const mapStateToProps = state => ({
  createTopicModal: state.classroom.createTopicModal,
  editTopicModal: state.classroom.editTopicModal,
  createAssignmentModal: state.classroom.createAssignmentModal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleCreateTopicModal,
  toggleCreateAssignmentModal,
  toggleEditTopicModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
