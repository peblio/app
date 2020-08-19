import * as ActionTypes from '../constants/reduxConstants';

const initialState = {
  classrooms: [],
  creatingClassroom: false,
  createClassroomModal: false,
  joinClassroomModal: false
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
    case ActionTypes.SET_CREATING_CLASSROOM:
      return {
        ...state,
        creatingClassroom: action.value
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

    default:
      return state;
  }
};

export default classrooms;
