import * as ActionTypes from '../constants/reduxConstants';

const initialState = {
  classrooms: [],
  submittingData: false,
  createClassroomModal: false,
  joinClassroomModal: false,
  currentClassroom: '',
  dataLoading: false,
  createTopicModal: false,
  editTpoicModal: false,
};

const classrooms = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CLASSROOMS:
      return {
        ...state,
        classrooms: action.classrooms
      };
    case ActionTypes.ADD_CLASSROOM:
      return {
        ...state,
        classrooms: [
          ...state.classrooms,
          action.classroom
        ]
      };

    case ActionTypes.SET_SUBMITTING_DATA:
      return {
        ...state,
        submittingData: action.value
      };

    case ActionTypes.TOGGLE_CREATE_CLASSROOM_MODAL:
      return {
        ...state,
        createClassroomModal: !state.createClassroomModal
      };

    case ActionTypes.TOGGLE_JOIN_CLASSROOM_MODAL:
      return {
        ...state,
        joinClassroomModal: !state.joinClassroomModal
      };

    case ActionTypes.SET_CURRENT_CLASSROOM:
      return {
        ...state,
        currentClassroom: action.data
      };

    case ActionTypes.CLEAR_CURRENT_CLASSROOM:
      return {
        ...state,
        currentClassroom: ''
      };

    case ActionTypes.TOGGLE_DATA_LOADING:
      return {
        ...state,
        dataLoading: !state.dataLoading
      };

    case ActionTypes.TOGGLE_CREATE_TOPIC_MODAL:
      return {
        ...state,
        createTopicModal: !state.createTopicModal
      };

    case ActionTypes.TOGGLE_EDIT_TOPIC_MODAL:
      return {
        ...state,
        createTopicModal: !state.editTpoicModal
      };

    default:
      return state;
  }
};

export default classrooms;
