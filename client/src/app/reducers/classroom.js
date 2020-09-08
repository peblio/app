import * as ActionTypes from '../constants/reduxConstants';

const initialState = {
  classrooms: [],
  submittingData: false,
  createClassroomModal: false,
  joinClassroomModal: false,
  currentClassroom: {},
  dataLoading: false,
  createTopicModal: false,
  createAssignmentModal: false,
  editTpoicModal: false,
  assignments: [],
  currentAssignment: {},
  topics: []
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
        currentClassroom: {}
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

    case ActionTypes.TOGGLE_CREATE_ASSIGNMENT_MODAL:
      return {
        ...state,
        createAssignmentModal: !state.createAssignmentModal
      };

    case ActionTypes.TOGGLE_EDIT_TOPIC_MODAL:
      return {
        ...state,
        editTopicModal: !state.editTopicModal
      };

    case ActionTypes.SET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.assignments
      };

    case ActionTypes.SET_CURRENT_ASSIGNMENT:
      return {
        ...state,
        currentAssignment: action.currentAssignment
      };

    case ActionTypes.SET_TOPICS:
      return {
        ...state,
        topics: action.topics
      };

    default:
      return state;
  }
};

export default classrooms;
