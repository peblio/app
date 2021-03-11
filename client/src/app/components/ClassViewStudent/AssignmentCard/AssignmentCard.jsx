import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import Button from '../../Button/Button';
import InputField from '../../InputField/InputField';

import {
  studentAttemptAssignment,
  fetchStudentAssignments,
  toggleTurnInAssignment,
  commentOnAssignment,
} from '../../../action/classroom';

import axios from '../../../utils/axios';

import LinkAlt from '../../../images/link-alt.svg';

import './assignmentCard.scss';

const AssignmentCard = (props) => {
  const [comment, setComment] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [page, setPage] = useState();

  const shouldRenderAssignmentAttemptUrl = (hasStarted, peblUrl) => {
    if (hasStarted && peblUrl) { return true; }
    return false;
  };

  const renderUrlWithAction = () => {
    if (shouldRenderAssignmentAttemptUrl(props.hasStarted, props.peblUrl)) {
      return (
        <React.Fragment>
          <a
            rel="noopener noreferrer"
            href={props.attemptPeblUrl}
            target="_blank"
          >
            {props.title}
          </a>
        </React.Fragment>
      );
    }
    if (!props.peblUrl && props.url) {
      return (
        <React.Fragment>
          <a
            rel="noopener noreferrer"
            href={props.url}
            target="_blank"
          >
            {props.title}
          </a>
        </React.Fragment>
      );
    }
    if (!props.hasStarted && props.peblUrl) {
      return (
        <React.Fragment>
          <button
            className="assignment-card-student__body__details__text-area__link"
            onClick={() => {
              props.studentAttemptAssignment({
                peblUrl: props.peblUrl,
                classroomId: props.classroomId,
                assignmentId: props.id
              }).then((myPeblUrl) => {
                props.fetchStudentAssignments(props.classroomId);
                if (myPeblUrl) {
                  const win = window.open(myPeblUrl, '_blank');
                  if (win != null) {
                    win.focus();
                  }
                }
              });
            }}
            target="_blank"
          >
            {props.title}
          </button>
        </React.Fragment>
      );
    }
    return `${props.title}`;
  };

  useEffect(() => {
    if (props.url) {
      fetch(props.url, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => res.text())
        .then((data) => {
          console.log(data);
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          console.log(doc);
        });
    }
    if (props.attemptPeblUrl) {
      const temp = props.attemptPeblUrl.split('/');
      axios.get(`/pages/${temp[temp.length - 1]}`)
        .then(({ data }) => {
          setPage(data[0]);
        });
    } else if (props.peblUrl) {
      const temp = props.peblUrl.split('/');
      axios.get(`/pages/${temp[temp.length - 1]}`)
        .then(({ data }) => {
          setPage(data[0]);
        });
    }
  }, [props.attemptPeblUrl, props.peblUrl]);

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
        {
          (props.peblUrl || props.url || props.attemptPeblUrl) && (
            <div
              className="assignment-card-student__body__image-area"
              style={{
                backgroundImage: page ? `url(${page.snapshotPath})` : '#e4e4e4',
              }}
            >
              {!page && <LinkAlt />}
            </div>
          )
        }
        <div className="assignment-card-student__body__details">
          <div className="assignment-card-student__body__details__text-area">
            <div className="assignment-card-student__body__details__text-area__title">
              {renderUrlWithAction()}
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
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                marginLeft: '16px'
              }}
              onClick={
                () => {
                  if (props.turnedIn) {
                    props.toggleTurnInAssignment({ assignmentId: props.id, status: false })
                      .then(() => {
                        props.fetchStudentAssignments(props.classroomId);
                      });
                  } else if (props.hasStarted) {
                    props.toggleTurnInAssignment({ assignmentId: props.id, status: true })
                      .then(() => {
                        props.fetchStudentAssignments(props.classroomId);
                      });
                  } else {
                    props.studentAttemptAssignment({
                      peblUrl: props.peblUrl,
                      classroomId: props.classroomId,
                      assignmentId: props.id
                    }).then((myPeblUrl) => {
                      props.fetchStudentAssignments(props.classroomId);
                      if (myPeblUrl) {
                        const win = window.open(myPeblUrl, '_blank');
                        if (win != null) {
                          win.focus();
                        }
                      }
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
        props.hasStarted && (
          <div className="assignment-card-student__comments">
            <div className="assignment-card-student__comments__line"></div>
            <div className={`assignment-card-student__comments__comment ${
              props.comments && props.comments.length !== 0
                ? ''
                : 'assignment-card-student__comments__comment--no-comments'
            }`}
            >
              COMMENTS
            </div>
            <div className="assignment-card-student__comments__view">
              {
                // eslint-disable-next-line no-shadow
                props.comments && props.comments.map((comment) => {
                  const curMember = props.members.filter(member => member.id === comment.fromMember);
                  let name;
                  if (curMember.length === 1) {
                    name = `${curMember[0].firstName} ${curMember[0].lastName}`;
                  }

                  return (
                    <div className="assignment-card-student__comments__container" key={comment._id}>
                      <div className="assignment-card-student__comments__container__name">
                        {name}
                        :
                      </div>
                      <div className="assignment-card-student__comments__container__comment">
                        {comment.text}
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <form
              className="assignment-card-student__comments__comment-box"
              onSubmit={(e) => {
                e.preventDefault();
                setCommenting(true);
                props.commentOnAssignment({
                  text: comment,
                  assignmentAttemptId: props.attemptId
                }).then(() => {
                  setCommenting(false);
                  props.fetchStudentAssignments(props.classroomId);
                  setComment('');
                }).catch((err) => {
                  setCommenting(true);
                });
              }}
            >
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
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                type="submit"
                disabled={!comment.trim() || commenting}
              >
                Send
              </Button>
            </form>
          </div>
        )
      }
      {
        props.areGradesPublished && props.marksScored && (
          <div className="assignment-card-student__grade">
            <span className="assignment-card-student__grade__label">
              GRADE :
            </span>
            <span className="assignment-card-student__grade__score">
              {props.marksScored}
              {' '}
              /
              {' '}
              {props.outOfMarks}
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
  fetchStudentAssignments: PropTypes.func.isRequired,
  toggleTurnInAssignment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  classroomId: PropTypes.string.isRequired,
  peblUrl: PropTypes.string,
  attemptPeblUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  areGradesPublished: PropTypes.bool.isRequired,
  commentOnAssignment: PropTypes.func.isRequired,
  marksScored: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  outOfMarks: PropTypes.number.isRequired,
  url: PropTypes.string,
  attemptId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  comments: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.bool]).isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

AssignmentCard.defaultProps = {
  turnedIn: false,
  hasStarted: false,
  dueDate: '',
  attemptPeblUrl: '',
  marksScored: null,
  url: '',
  attemptId: '',
  peblUrl: ''
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  studentAttemptAssignment,
  fetchStudentAssignments,
  toggleTurnInAssignment,
  commentOnAssignment
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AssignmentCard);
