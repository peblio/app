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
    type: ActionTypes.SET_CREATING_CLASSROOM,
    value: true
  });
  axios.post('/learning/classroomDetail', classroom)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.ADD_CLASSROOM,
        classroom: data
      });
      dispatch({
        type: ActionTypes.TOGGLE_CREATE_CLASSROOM_MODAL,
      });
      dispatch({
        type: ActionTypes.SET_CREATING_CLASSROOM,
        value: false
      });
    })
    .catch((e) => {
      if (e.response.status === 404) {
        history.push('/404');
      }
      dispatch({
        type: ActionTypes.SET_CREATING_CLASSROOM,
        value: false
      });
    });
};
