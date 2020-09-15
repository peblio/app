import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DragSource } from 'react-dnd';

import { NavLink } from 'react-router-dom';

import ToggleButton from '../../../ToggleButton/ToggleButton';
import LessonListCard from '../../../LessonListCard/LessonListCard';
import IconButtonDropdown from '../../../IconButtonDropdown/IconButtonDropdown';

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
            {props.turnedIn}
          </div>
          <div className="">
            {props.dueDate ? moment(props.dueDate).format('MM/DD/YY') : '...'}
          </div>
          <div className="">
            {
              props.type === 'assignment'
                ? 'copies for each student'
                : 'students can view'
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
              options={[
                {
                  name: 'Edit',
                  onClick: () => { console.log('Edit'); }
                }, {
                  name: 'Rename',
                  onClick: () => { console.log('Rename'); }
                }, {
                  name: 'Delete',
                  onClick: () => { console.log('Delete'); }
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
  topicId: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  turnedIn: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChangeAssignmentStatus: PropTypes.func.isRequired,
  classroomId: PropTypes.string.isRequired,
};


const DraggableAssignmentCard = DragSource(ItemTypes.ASSIGNMENT_CARD, assignmentSource, collect)(AssignmentCard);

export default DraggableAssignmentCard;
