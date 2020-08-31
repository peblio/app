import * as ActionTypes from '../constants/reduxConstants';
import axios from '../utils/axios';
import history from '../utils/history';

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

export const toggleDataLoading = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_DATA_LOADING,
  });
};

export const fetchClassrooms = () => (dispatch) => {
  dispatch({
    type: ActionTypes.TOGGLE_DATA_LOADING,
  });
  axios.get('/learning/classroomDetail')
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.TOGGLE_DATA_LOADING,
      });
      dispatch({
        type: ActionTypes.FETCH_CLASSROOMS,
        classrooms: data
      });
    })
    .catch((e) => {
      if (e.response.status === 404) {
        history.push('/404');
      }
      dispatch({
        type: ActionTypes.TOGGLE_DATA_LOADING,
      });
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


export const createAssignment = assignmentData => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SUBMITTING_DATA,
    value: true
  });
  axios.post('/learning/classroomAssignment', assignmentData)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: ActionTypes.SET_SUBMITTING_DATA,
        value: false
      });
      dispatch({
        type: ActionTypes.TOGGLE_CREATE_ASSIGNMENT_MODAL,
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
