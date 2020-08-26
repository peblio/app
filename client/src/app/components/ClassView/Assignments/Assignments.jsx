import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import IconButton from '../../IconButton/IconButton';
import Dropdown from '../../Dropdown/Dropdown';
import LessonListCard from '../../LessonListCard/LessonListCard';
import ShareIcon from '../../../images/link.svg';
import CreateTopicModal from './CreateTopicModal/CreateTopicModal';

// actions
import { toggleCreateTopicModal } from '../../../action/classroom';

import RenameIcon from '../../../images/rename.svg';
import TrashIcon from '../../../images/trash.svg';

import './assignments.scss';

// eslint-disable-next-line no-shadow
const Assignments = ({ createTopicModal, toggleCreateTopicModal }) => (
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
              value: 'create',
              onClick: () => { toggleCreateTopicModal(); }
            }, {
              name: 'Join class',
              value: 'join',
              onClick: () => { console.log('Join'); }
            }
          ]}
        />
      </div>
      <div className="class-view__assignments__unit">
        <div className="class-view__assignments__unit__header-area">
          <h3 className="class-view__assignments__unit__header-area__header">Unit 1</h3>
          <IconButton icon={<RenameIcon />} style={{ marginLeft: 'auto' }} />
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
  </React.Fragment>
);

Assignments.propTypes = {
  createTopicModal: PropTypes.bool.isRequired,
  toggleCreateTopicModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  createTopicModal: state.classroom.createTopicModal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleCreateTopicModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
