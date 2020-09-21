import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import InputField from '../../InputField/InputField';

import Button from '../../Button/Button';

import { studentAttemptAssignment } from '../../../action/classroom';

import './assignmentCard.scss';

const AssignmentCard = (props) => {
  const [comment, setComment] = useState('');

  return (
    <div className="assignment-card-student" id={props.id}>
      <div className={
        `assignment-card-student__header assignment-card-student__header--${
          props.type
        } ${
          props.turnedIn ? 'assignment-card-student__header--assignment--turned-in'
            : ''
        }`}
      >
        {
          // eslint-disable-next-line no-nested-ternary
          props.type === 'assignment' ? props.turnedIn ? 'TURNED IN' : 'ASSIGNMENT' : 'RESOURCE'
        }
        <span>
          {props.dueDate && moment(props.dueDate).format('MM/DD/YYYY')}
        </span>
      </div>
      <div className="assignment-card-student__body">
        <div className="assignment-card-student__body__image-area">
        </div>
        <div className="assignment-card-student__body__details">
          <div className="assignment-card-student__body__details__text-area">
            <div className="assignment-card-student__body__details__text-area__title">
              {props.title}
            </div>
            <div className="assignment-card-student__body__details__text-area__description">
              {props.description}
            </div>
          </div>
          {
            props.type === 'assignment' &&
          (
            <Button
              className={props.turnedIn ? 'secondary' : 'primary'}
              style={{
                height: '30px',
                padding: '6px 13px',
                fontSize: '14px',
                marginLeft: '28px'
              }}
              onClick={
                () => {
                  if (props.turnedIn) {
                    console.log('unsubmit');
                  } else if (props.hasStarted) {
                    console.log('Turn In');
                  } else {
                    props.studentAttemptAssignment({
                      peblUrl: props.peblUrl,
                      classroomId: props.classroomId,
                      assignmentId: props.id
                    });
                  }
                }
              }
            >
              {
                // eslint-disable-next-line no-nested-ternary
                props.turnedIn ? 'Unsubmit' : (props.hasStarted ? 'Turn In' : 'START')
              }
            </Button>
          )
          }
        </div>
      </div>
      {
        (props.hasStarted || props.type !== 'assignment') && (
          <div className="assignment-card-student__comments">
            <div className="assignment-card-student__comments__line"></div>
            <div className="assignment-card-student__comments__comment">COMMENTS</div>
            <div className="assignment-card-student__comments__comment-box">
              <InputField
                placeholder="type comment"
                containerWidth="100%"
                state={comment}
                onChange={(e) => { setComment(e.target.value); }}
                style={{
                  height: '35px',
                  fontSize: '14px'
                }}
              />
              <Button
                className="secondary"
                style={{
                  height: '35px',
                  padding: '10px 19px',
                  fontSize: '14px'
                }}
              >
                Send
              </Button>
            </div>
          </div>
        )
      }
      {
        props.type === 'assignment' && (
          <div className="assignment-card-student__grade">
            <span className="assignment-card-student__grade__label">
              GRADE :
            </span>
            <span className="assignment-card-student__grade__score">
              70/100
            </span>
          </div>
        )
      }
    </div>
  );
};

AssignmentCard.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dueDate: PropTypes.string,
  turnedIn: PropTypes.bool,
  hasStarted: PropTypes.bool,
  studentAttemptAssignment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  classroomId: PropTypes.string.isRequired,
  peblUrl: PropTypes.string.isRequired
};

AssignmentCard.defaultProps = {
  turnedIn: false,
  hasStarted: false,
  dueDate: '',
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  studentAttemptAssignment,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AssignmentCard);
