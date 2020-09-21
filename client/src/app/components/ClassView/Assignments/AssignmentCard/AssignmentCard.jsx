import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DragSource } from 'react-dnd';

import { NavLink } from 'react-router-dom';

import ToggleButton from '../../../ToggleButton/ToggleButton';
import LessonListCard from '../../../LessonListCard/LessonListCard';
import IconButtonDropdown from '../../../IconButtonDropdown/IconButtonDropdown';

import {
  toggleEditAssignmentConfirmationModal
} from '../../../../action/classroom.js';

import RenameIcon from '../../../../images/rename.svg';
import TrashIcon from '../../../../images/trash.svg';

import OptionsIcon from '../../../../images/options.svg';

import './assignmentCard.scss';

const ItemTypes = {
  ASSIGNMENT_CARD: 'ASSIGNMENT_CARD',
};

const assignmentSource = {
  canDrag() {
    return true;
  },
  beginDrag(props) {
    return { assignmentId: props.id, currentTopicId: props.topicId };
  }
};

function collect(_connect, monitor) {
  return {
    connectDragSource: _connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const AssignmentCard = (props) => {
  const { connectDragSource } = props;

  return connectDragSource(
    <div>
      <LessonListCard
        color={
        // eslint-disable-next-line no-nested-ternary
          props.isPublished
            ? props.type === 'assignment' ? 'yellow' : 'dark-gray'
            : 'light-gray'
        }
        style={{
          marginBottom: '9px',
          background: props.isPublished ? '#fff' : '#f7f8f8'
        }}
      >
        <div className="assignment-card">
          <div className="assignment-card__title">
            <NavLink to={`/classroom/${props.classroomId}/assignment/${props.id}`}>
              {props.title}
            </NavLink>
          </div>
          <div className="">
            {props.dueDate ? moment(props.dueDate).format('MM/DD/YY') : '...'}
          </div>
          <div className="">
            {
              props.type === 'assignment'
                ? 'Assignment'
                : 'Resource'
            }
          </div>
          <div className="">
            <ToggleButton
              state={props.isPublished}
              onClick={() => {
                props.handleChangeAssignmentStatus({ assignmentId: props.id, isPublished: !props.isPublished });
              }}
            />
          </div>
          <div className="assignment-card__options">
            <IconButtonDropdown
              icon={<OptionsIcon />}
              optionsPosition="right"
              optionsContainerWidth="132px"
              options={[
                {
                  name: 'Edit',
                  onClick: () => {
                    props.toggleEditAssignmentConfirmationModal({ assignmentId: props.id, value: true });
                  },
                  icon: <RenameIcon />
                }, {
                  name: 'Delete',
                  onClick: () => { console.log('Delete'); },
                  icon: <TrashIcon />
                }
              ]}
            />
          </div>
        </div>
      </LessonListCard>
    </div>
  );
};

AssignmentCard.propTypes = {
  isPublished: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  topicId: PropTypes.string,
  dueDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChangeAssignmentStatus: PropTypes.func.isRequired,
  classroomId: PropTypes.string.isRequired,
  toggleEditAssignmentConfirmationModal: PropTypes.func.isRequired,
};

AssignmentCard.defaultProps = {
  topicId: null,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleEditAssignmentConfirmationModal
}, dispatch);


const DraggableAssignmentCard = DragSource(ItemTypes.ASSIGNMENT_CARD, assignmentSource, collect)(AssignmentCard);

export default connect(null, mapDispatchToProps)(DraggableAssignmentCard);
