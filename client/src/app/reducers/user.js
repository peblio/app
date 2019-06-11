import * as ActionTypes from '../constants/reduxConstants.js';

const initialState = {
  name: '',
  blurb: 'Hi! I <3 CS',
  canView: true,
  canEdit: true,
  image: 'https://placekitten.com/300/300',
  type: '',
  requiresGuardianConsent: false,
  guardianConsentedAt: '',
  guardianEmail: null,
  isBrowsingPebl: false,
  studentBirthday: null,
  nextScreen: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_PROFILE: {
      return {
        ...state,
        name: action.data.name,
        type: action.data.type,
        image: action.data.image,
        blurb: action.data.blurb,
        isOwner: action.data.isOwner
      };
    }
    case ActionTypes.SET_USER: {
      return {
        ...state,
        name: action.data.name,
        type: action.data.type
      };
    }

    case ActionTypes.SET_USER_BROWSING_PEBL:
      return Object.assign({}, state, {
        isBrowsingPebl: true
      });

    case ActionTypes.SET_USER_NAME:
      return Object.assign({}, state, {
        name: action.name
      });

    case ActionTypes.SET_EDIT_ACCESS:
      return Object.assign({}, state, {
        canEdit: action.value
      });

    case ActionTypes.SET_USER_TYPE:
      return Object.assign({}, state, {
        type: action.value
      });

    case ActionTypes.SET_GUARDIAN_CONSENT:
      return Object.assign({}, state, {
        requiresGuardianConsent: action.value
      });

    case ActionTypes.SET_GUARDIAN_EMAIL:
      return Object.assign({}, state, {
        guardianEmail: action.value
      });

    case ActionTypes.SET_STUDENT_BIRTHDAY:
      return Object.assign({}, state, {
        studentBirthday: action.value
      });

    case ActionTypes.SET_USER_BLURB:
      return Object.assign({}, state, {
        blurb: action.value
      });

    case ActionTypes.SET_USER_IMAGE:
      return Object.assign({}, state, {
        image: action.value
      });

    case ActionTypes.SET_NEXT_SCREEN: {
      return Object.assign({}, state, {
        nextScreen: action.value
      });
    }

    case ActionTypes.CLEAR_SIGNUP_VALUES:
      return initialState;

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default user;
