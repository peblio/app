import * as ActionTypes from '../constants/reduxConstants';
import axios from '../utils/axios';
import history from '../utils/history';

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

export const setSubmittinData = value => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SUBMITTING_DATA,
    value
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

export const joinClassroom = classCode => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SUBMITTING_DATA,
    value: true
  });
  axios.patch(`/learning/classroomDetail/${classCode}`)
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
  dispatch({
    type: ActionTypes.TOGGLE_DATA_LOADING,
  });
  axios.get(`/learning/classroomDetail/${id}`)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.TOGGLE_DATA_LOADING,
      });
      dispatch({
        type: ActionTypes.SET_CURRENT_CLASSROOM,
        data
      });
    })
    .catch((err) => {
      // [TODO]: Add dispatch to show toast notification
      console.log(err);
      dispatch({
        type: ActionTypes.TOGGLE_DATA_LOADING,
      });
    });
};

export const clearCurrentClassroom = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CLEAR_CURRENT_CLASSROOM,
  });
};

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
// Classroom end

// Topic start
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
  axios.get(`/learning/classroomTopic/${classroomId}`)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.SET_TOPICS,
        topics: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTopic = topicId => (dispatch) => {
  console.log('delete', topicId);
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
  axios.get(`/learning/classroomAllAssignments/${classroomId}`)
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

export const fetchCurrentAssignmentDetails = assignmentId => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_DATA_LOADING,
  });
  axios.get(`/learning/classroomAssignment/${assignmentId}`)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.SET_CURRENT_ASSIGNMENT,
        currentAssignment: data
      });
      dispatch({
        type: ActionTypes.TOGGLE_DATA_LOADING,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchAssignmentsByStudentsForTeacher = ({ studentName, classroomId }) => (dispatch) => {
  axios.get(`/learning/classroomAllAssignmentsByStudentForTeacher/${classroomId}?studentName=${studentName}`)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.SET_ASSIGNMENTS_PEOPLE,
        assignments: data
      });
    })
    .catch(err => console.log(err));
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
// Assignments end
