import shortid from 'shortid';
import * as ActionTypes from '../constants/reduxConstants';
import axios from '../utils/axios';
import history from '../utils/history';
import { SNAPSHOT_DEFAULT_IMG, DEFAULT_PAGE_TITLE } from '../constants/pageConstants';

// Modals start
export const toggleCreateClassroomModal = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_CREATE_CLASSROOM_MODAL,
  });
};

export const toggleJoinClassroomModal = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_JOIN_CLASSROOM_MODAL,
  });
};

export const toggleCreateTopicModal = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_CREATE_TOPIC_MODAL,
  });
};

export const toggleCreateAssignmentModal = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_CREATE_ASSIGNMENT_MODAL,
  });
};

export const toggleEditTopicModal = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_EDIT_TOPIC_MODAL,
  });
};

export const toggleEditAssignmentConfirmationModal = ({ assignmentId, value }) => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_EDIT_ASSIGNMENT_CONFIRMATION_MODAL,
    data: {
      assignmentId: assignmentId || null,
      value
    }
  });
};

export const toggleEditAssignmentModal = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_EDIT_ASSIGNMENT_MODAL
  });
};

export const setSubmittinData = value => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SUBMITTING_DATA,
    value
  });
};

export const toggleAddMemberModal = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_ADD_MEMBER_MODAL,
  });
};
// Modals end

export const toggleDataLoading = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_DATA_LOADING,
  });
};

// Classroom start
export const fetchClassrooms = () => (dispatch) => {
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.get('/learning/classroomDetail')
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.FETCH_CLASSROOMS,
          classrooms: data
        });
        resolve(data);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          history.push('/404');
        }
        reject(e);
      });
  });
  return reqPromise();
};

export const createClassroom = classroom => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SUBMITTING_DATA,
    value: true
  });
  axios.post('/learning/classroomDetail', classroom)
    .then(() => {
      dispatch({
        type: ActionTypes.TOGGLE_CREATE_CLASSROOM_MODAL,
      });
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
      axios.get('/learning/classroomDetail')
        .then(({ data }) => {
          dispatch({
            type: ActionTypes.FETCH_CLASSROOMS,
            classrooms: data
          });
        })
        .catch((e) => {
          if (e.response.status === 404) {
            history.push('/404');
          }
        });
    })
    .catch((e) => {
      if (e.response.status === 404) {
        history.push('/404');
      }
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
    });
};

export const joinClassroom = joinData => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SUBMITTING_DATA,
    value: true
  });
  axios.patch('/learning/classroomDetail/', joinData)
    .then(() => {
      console.log('Joined');
      dispatch({
        type: ActionTypes.TOGGLE_JOIN_CLASSROOM_MODAL,
      });
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
      axios.get('/learning/classroomDetail')
        .then(({ data }) => {
          dispatch({
            type: ActionTypes.FETCH_CLASSROOMS,
            classrooms: data
          });
        })
        .catch((e) => {
          if (e.response.status === 404) {
            history.push('/404');
          }
        });
    })
    .catch((err) => {
      // [TODO]: Add dispatch to show toast notification
      console.log(err);
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
    });
};

export const fetchCurrentClassroomDetails = id => (dispatch) => {
  const req = () => new Promise((resolve, reject) => {
    axios.get(`/learning/classroomDetail/${id}`)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.SET_CURRENT_CLASSROOM,
          data
        });
        resolve(true);
      })
      .catch((err) => {
        // [TODO]: Add dispatch to show toast notification
        console.log(err);
        reject(err);
      });
  });
  return req();
};

export const clearCurrentClassroom = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CLEAR_CURRENT_CLASSROOM,
  });
};

export const createPeblForAssignment = title => (dispatch) => {
  const id = shortid.generate();
  const data = {
    title: title || DEFAULT_PAGE_TITLE,
    snapshotPath: SNAPSHOT_DEFAULT_IMG,
    id
  };
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.post('/pages/save', data)
      .then(() => {
        resolve(id);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return reqPromise();
};

export const addMemberToClassroom =
  (data, { classroomId }) => () => axios.patch(`/learning/classroomDetail/addMember/${classroomId}`, data);
// Classroom end

// Topic start
export const createClassroomTopic = topicData => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SUBMITTING_DATA,
    value: true
  });
  axios.post('/learning/classroomTopic', topicData)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
      dispatch({
        type: ActionTypes.TOGGLE_CREATE_TOPIC_MODAL,
      });
      return axios.get(`/learning/classroomTopic/${data.classroomId}`);
    })
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.SET_TOPICS,
        topics: data
      });
    })
    .catch((err) => {
      // [TODO]: Add dispatch to show toast notification
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
      console.log(err);
    });
};

export const editClassroomTopic = ({ topicData, classroomId }) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SUBMITTING_DATA,
    value: true
  });
  axios.patch('/learning/classroomTopic', topicData)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
      dispatch({
        type: ActionTypes.TOGGLE_EDIT_TOPIC_MODAL,
      });
      axios.get(`/learning/classroomTopic/${classroomId}`)
        // eslint-disable-next-line no-shadow
        .then(({ data }) => {
          dispatch({
            type: ActionTypes.SET_TOPICS,
            topics: data
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      // [TODO]: Add dispatch to show toast notification
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
      console.log(err);
    });
};

export const fetchTopics = classroomId => (dispatch) => {
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.get(`/learning/classroomTopic/${classroomId}`)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.SET_TOPICS,
          topics: data
        });
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return reqPromise();
};

export const clearTopics = () => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_TOPICS,
    topics: []
  });
};

export const changeTopicOfAssignment = data => (dispatch) => {
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.patch('/learning/classroomAssignment/reassignTopic', data)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return reqPromise();
};

export const deleteTopic = ({ topicId, assignments }) => (dispatch) => {
  Promise.all(
    assignments.map(
      // delinking all the assignments from the topic
      assignment => axios.patch(
        '/learning/classroomAssignment/reassignTopic',
        {
          assignmentId: assignment.id
        }
      )
    )
  )
    // deleting after all the assignments are successfully delinked
    .then(() => axios.delete(`/learning/classroomTopic/${topicId}`))
    // refrest topics
    .then(() => axios.get(`/learning/classroomTopic/${assignments[0].classroomId}`))
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.SET_TOPICS,
        topics: data
      });
      // refresh assignments
      return axios.get(`/learning/classroomAllAssignments/${assignments[0].classroomId}`);
    })
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.SET_ASSIGNMENTS,
        assignments: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Topic end

// Assignments start
export const createAssignment = assignmentData => (dispatch) => {
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.post('/learning/classroomAssignment', assignmentData)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return reqPromise();
};

export const fetchAssignments = classroomId => (dispatch) => {
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.get(`/learning/classroomAllAssignments/${classroomId}`)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.SET_ASSIGNMENTS,
          assignments: data
        });
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return reqPromise();
};

export const fetchCurrentAssignmentDetails = assignmentId => (dispatch) => {
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.get(`/learning/classroomAssignment/${assignmentId}`)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.SET_CURRENT_ASSIGNMENT,
          currentAssignment: data
        });
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return reqPromise();
};

export const clearCurrentAssignmentDetails = () => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_CURRENT_ASSIGNMENT,
    currentAssignment: {}
  });
};

export const fetchStudentAssignments = classroomId => (dispatch) => {
  axios.get(`/learning/classroomAllAssignmentsForStudent/${classroomId}`)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.SET_STUDENT_ASSIGNMENTS,
        data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearStudentAssignments = () => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_STUDENT_ASSIGNMENTS,
    data: {}
  });
};

export const fetchAssignmentsByStudentsForTeacher = ({ memberId, classroomId }) => (dispatch) => {
  const req = () => new Promise((resolve, reject) => {
    axios.get(`/learning/classroomAllAssignmentsByStudentForTeacher/${classroomId}?memberId=${memberId}`)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.SET_ASSIGNMENTS_PEOPLE,
          assignments: data
        });
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return req();
};

export const clearAssignmentPeople = () => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_ASSIGNMENTS_PEOPLE,
    assignments: {}
  });
};

export const changePublishStatusOfAssignment = assignment => (dispatch) => {
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.patch('/learning/classroomAssignment', assignment)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return reqPromise();
};

export const studentAttemptAssignment = data => (dispatch) => {
  if (data.peblUrl) {
    const reqPromise = () => new Promise((resolve, reject) => {
      const temp = data.peblUrl.split('/');
      const mainPeblId = temp[temp.length - 1];
      const id = shortid.generate();

      axios.get(`/pages/${mainPeblId}`)
        .then((res) => {
          const pebl = res.data[0];
          const copiedPebl = {
            id,
            heading: pebl.heading,
            description: pebl.description,
            editors: pebl.editors,
            editorIndex: pebl.editorIndex,
            layout: pebl.layout,
            tags: pebl.tags,
            snapshotPath: SNAPSHOT_DEFAULT_IMG,
            title: `${pebl.title}-copy`,
            parentId: pebl.id,
          };
          return axios.post('/pages/save', copiedPebl);
        })
        .then(() => axios.post('/learning/classroomAssignmentAttempt', {
          myPeblUrl: `http://local.peblio.co:8080/pebl/${id}`,
          classroomId: data.classroomId,
          assignmentId: data.assignmentId
        })).then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
    return reqPromise();
  }
  const reqPromise = () => new Promise((resolve, reject) => {
    axios.post('/learning/classroomAssignmentAttempt', {
      classroomId: data.classroomId,
      assignmentId: data.assignmentId
    }).then(() => {
      resolve();
    })
      .catch((err) => {
        reject(err);
      });
  });
  return reqPromise();
};

export const toggleTurnInAssignment =
({ assignmentId, status }) => () => axios.patch(`/learning/classroomAssignmentAttempt/${assignmentId}`, {
  turnedIn: status
});

export const gradeAssignment = ({ assignmentAttemptId, marksScored }) => (dispatch) => {
  const req = () => new Promise((resolve, reject) => {
    axios.patch('/learning/classroomAssignmentAttempt/gradeAssignment', ({
      marksScored,
      assignmentAttemptId
    })).then(({ data }) => {
      resolve(data);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
  return req();
};

export const fetchAssignmentAttempts = classroomId => (dispatch) => {
  axios.get(`/learning/classroomAssignmentAllAttempts/${classroomId}`)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.SET_ASSIGNMENT_ATTEMPTS,
        data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearAssignmentAttempt = () => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_ASSIGNMENT_ATTEMPTS,
    data: {}
  });
};

export const commentOnAssignment = commentData => (dispatch) => {
  const req = () => new Promise((resolve, reject) => {
    axios.patch('/learning/classroomAssignmentAttempt/addComment', commentData)
      .then(({ data }) => {
        console.log(data);
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return req();
};

export const publishGrades = assignmentId => (dispatch) => {
  const req = () => new Promise((resolve, reject) => {
    axios.patch('/learning/classroomAssignment/publishGrades', { assignmentId })
      .then(({ data }) => {
        console.log(data);
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return req();
};

// Assignments end
