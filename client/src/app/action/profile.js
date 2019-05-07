import * as ActionTypes from '../constants/reduxConstants.js';
import axios from '../utils/axios';
import history from '../utils/history';
import { namespaceActionCreators } from '../utils/namespace-redux';
import * as folderActions from './folders';

export function setIsOwner(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_IS_OWNER,
      value
    });
  };
}

export function fetchProfile(userName) {
  return dispatch => axios.get(`/users/${userName}/profile`)
    .then(({ data }) => dispatch({
      type: ActionTypes.SET_PROFILE,
      data
    }))
    .catch((e) => {
      if (e.response.status === 404) {
        history.push('/404');
      }
    });
}

export function setProfileBlurb(value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PROFILE_BLURB,
      value
    });
  };
}

export function updateProfileBlurb(value) {
  return dispatch => axios.put('/current_user/profile', {
    blurb: value
  }).then(() => dispatch({
    type: ActionTypes.SET_PROFILE_BLURB,
    value
  }));
}

export function updateProfileImage(value) {
  return dispatch => axios.put('/current_user/profile', {
    image: value,
  }).then(() => dispatch({
    type: ActionTypes.SET_PROFILE_IMAGE,
    value
  }));
}

const profileFolderActions = namespaceActionCreators(folderActions, 'PROFILE_FOLDERS');

export const {
  fetchAllPages,
  viewFolder,
  viewPage,
  jumpToFolderByShortId,
  clearSelectedFolders
} = profileFolderActions;
