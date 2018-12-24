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
  isBrowsingPebl: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
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

    case ActionTypes.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default user;
